/// <reference path="/js/framework/jquery-1.4.1-vsdoc.js" />
/// <reference path="/js/framework/jquery-1.4.1.min.js" />
/// <reference path="/js/framework/jquery.jCache.js" />
/// <reference path="/js/framework/jquery-jtemplates.js" />
/// <reference path="/plugin/alert/js/jquery.alerts.js" />
/// <reference path="/js/Message.js" />
/// <reference path="/js/popup/Loading.js" />
/// <reference path="/js/socialshop-common.js" />
/// <reference path="/plugin/datepicker/js/jquery.ui.datepicker.js" />
/// <reference path="/js/vtc-paging.js" />
/// <reference path="/js/socialshop-utils.js" />
/// <reference path="/js/vtc-HtmlEncoder.js" />
ImageManager = new function () {

    this.htmlTag = new function () {
        this.divImageMgr = '#divImageMgr';
        this.divPopup_ImageManager = '#divPopup_ImageManager';
        this.divlistImages = '#divlistImages';
        this.imgCurrent = '#imgCurrent';
        this.divItemImage = '#divItemImage';
        this.divFileName = '#divFileName';
        this.txtImageName = '#txtImageName';
        this.divUploadStatusBar = '#divUploadStatusBar';
        this.divUploadMessage = '#divUploadMessage';
        this.btnUpload = '#btnUpload';
        this.imageCurrent = '.imageCurrent';
        this.inputSearch = '#id_inputSearch';
    };

    this.uploadUrl = '';

    this.KeyCache = new function () {
        this.m_news = "Images_News";
    }
    this.Type = new function () {
        this.m_wantAds = 1;
        this.m_news = 2;
    }

    // Open form quản lý ảnh
    this.openImageManager = function () {
        $(this.htmlTag.divImageMgr).css("display", "");
        var top = (($(window).height() / 2) - ($(this.htmlTag.divPopup_ImageManager, this.htmlTag.divImageMgr).outerHeight() / 2));
        var left = (($(window).width() / 2) - ($(this.htmlTag.divPopup_ImageManager, this.htmlTag.divImageMgr).outerWidth() / 2));
        if (top < 0) top = 0;
        if (left < 0) left = 0;
        // IE6 fix
        if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

        $(this.htmlTag.divPopup_ImageManager).css({
            top: top + 'px',
            left: left + 'px',
            display: 'block'
        });

        try {
            $(this.htmlTag.divPopup_ImageManager, this.htmlTag.divImageMgr).draggable({ handle: $('.barpopup', this.htmlTag.divPopup_ImageManager) });
            $('.barpopup', this.htmlTag.divPopup_ImageManager).css({ cursor: 'move' });
        } catch (e) { /* requires jQuery UI draggables */ }

        this.getImages('');
    }

    // Lấy danh sách ảnh theo loại ảnh
    this.getImages = function (name) {
        $(this.htmlTag.divlistImages, this.htmlTag.divImageMgr).html(CONSTANT.TAG_IMAGE_LOADING);
        this.ShowPreviewImage('', '');
        var strKeyCache = this.KeyCache.m_news;
        if ($.jCache.hasItem(strKeyCache)) {
            var _data = $.jCache.getItem(strKeyCache);
            this.bindData(_data, name);
        }
        else {

            $.ajax({
                type: "GET",
                url: "/plugin/editor/handler/ImageManagerHandler.ashx",
                data: { action: "get" },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    ImageManager.bindData(data, name);
                    $.jCache.setItem(strKeyCache, data);
                }
            });
        }
    }


    this.bindData = function (data, name) {

        $(this.htmlTag.divlistImages, this.htmlTag.divImageMgr).setTemplateURL("/plugin/editor/tiny_mce/plugins/imagemanager/listImages.htm");
        $(this.htmlTag.divlistImages, this.htmlTag.divImageMgr).processTemplate(data);
        if (data.length == 0) return;
        var id = '';
        if (name == '') {
            id = data[0]["Id"];
        }
        else {
            for (var i = 0; i < data.length; i++) {
                if (name == data[i]['Name']) {
                    id = data[i]['Id'];
                    break;
                }
            }
        }
        if (id == '') return;

        $('.' + id).addClass("imageCurrent");
        var i = id.substring(id.lastIndexOf('_') + 1);
        var src = data[i - 1]['URL'];
        var name = data[i - 1]['Name'];
        this.ShowPreviewImage(src, name);

        $(this.htmlTag.inputSearch).quicksearch(this.htmlTag.divImageMgr + ' ' + this.htmlTag.divItemImage);

    }

    // Close form quản lý ảnh
    this.Close = function () {
        $(this.htmlTag.divImageMgr).css("display", "none");
    }

    // Chèn ảnh
    this.Insert = function () {
        var value = $(this.htmlTag.imgCurrent, this.htmlTag.divImageMgr).attr("src");
        $("._ifr").contents().find("._ImageURL").val(value);
        $("._ifr").contents().find("#prev").html('<img id="previewImg" src="' + value + '" border="0" onload="ImageDialog.updateImageData(this);" onerror="ImageDialog.resetImageData();" />');
        this.Close();
    }

    this.ShowPreviewImage = function (src, name) {
        $(this.htmlTag.imgCurrent, this.htmlTag.divImageMgr).attr("src", src);
        $(this.htmlTag.imgCurrent, this.htmlTag.divImageMgr).attr("alt", name);

    }

    this.Delete = function () {
        jConfirm("Bạn có chắc chắn xóa ảnh này không?", "Thông báo", function (s) {
            if (s) {
                var _name = $(ImageManager.htmlTag.imgCurrent, ImageManager.htmlTag.divImageMgr).attr("alt");

                if (_name == "") {
                    jAlert("Bạn chưa chọn ảnh để xóa", "Thông báo");
                    return;
                }

                $.ajax({
                    type: "GET",
                    url: "/plugin/editor/handler/ImageManagerHandler.ashx",
                    data: { name: _name, action: "del" },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        // Thành công
                        if (data == "1") {
                            // remove cache
                            ImageManager.removeCache();
                            var objCurrent = $(ImageManager.htmlTag.imageCurrent, ImageManager.htmlTag.divImageMgr);

                            if ($(objCurrent).next().length > 0) {
                                var htmTemp = $(objCurrent).next().html();
                                htmTemp = htmTemp.substring(htmTemp.indexOf('(') + 1, htmTemp.indexOf(')'));
                                var arr = htmTemp.split(',');
                                ImageManager.ShowPreviewImage(arr[0].replace(/'/g, ''), arr[1].replace(/'/g, ''));
                                $(objCurrent).next().addClass("imageCurrent");
                            }
                            else if ($(objCurrent).prev().length > 0) {
                                var htmTemp = $(objCurrent).prev().html();
                                htmTemp = htmTemp.substring(htmTemp.indexOf('(') + 1, htmTemp.indexOf(')'));
                                var arr = htmTemp.split(',');
                                ImageManager.ShowPreviewImage(arr[0].replace(/'/g, ''), arr[1].replace(/'/g, ''));
                                $(objCurrent).prev().addClass("imageCurrent");
                            }
                            $(objCurrent).remove();
                        }
                    }
                });



            }
        });
    }

    this.removeCache = function () {
        var strKeyCache = ImageManager.KeyCache.m_news;
        $.jCache.removeItem(strKeyCache);
    }

    $(this.htmlTag.divItemImage, this.htmlTag.divImageMgr).live("click", function () {
        $("#divlistImages > div").removeClass("imageCurrent");

        $(this).addClass("imageCurrent");
    });

    this.preLoad = function () {
        if (!this.support.loading) {
            jAlert(MESSAGE.UploadLogo.notPlayer, MESSAGE.title);
            return false;
        }
    };

    this.loadFailed = function () {
        jAlert(MESSAGE.UploadLogo.loadFailed, MESSAGE.title);
    };

    this.fileQueueError = function (file, errorCode, message) {
        try {
            switch (errorCode) {
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    jAlert(MESSAGE.UploadLogo.sizeLimit, MESSAGE.title);
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    jAlert(MESSAGE.UploadLogo.notExts, MESSAGE.title);
                    break;
                default:
                    jAlert(MESSAGE.UploadLogo.queueError, MESSAGE.title);
                    break;
            }
        } catch (ex) {
            this.debug(ex);
        }

    };

    this.clearQueue = function (obj) {
        var stats = obj.getStats();
        while (stats.files_queued > 0) {
            obj.cancelUpload();
            stats = obj.getStats();
        }
    };
    this.fileQueued = function (file) {
        // check Exts
        var strfileExts = '*.jpg;*.png;*.gif';
        if (strfileExts.indexOf(file.type.toLowerCase()) == '-1') {
            jAlert(MESSAGE.UploadLogo.notExts, MESSAGE.title);
            ImageManager.clearQueue(this);
            return;
        }

        // check file size
        var byteSize = Math.round(file.size / 1024 * 100) * .01;
        if (parseInt(byteSize) > 2048) {
            jAlert(MESSAGE.UploadLogo.sizeLimit, MESSAGE.title);
            ImageManager.clearQueue(this);
            return;
        }
        $(ImageManager.htmlTag.divFileName, ImageManager.htmlTag.divImageMgr).html(file.name);
        var fileName1 = file.name.substring(0, file.name.lastIndexOf('.'));
        $(ImageManager.htmlTag.txtImageName, ImageManager.htmlTag.divImageMgr).val(fileName1);
    };

    this.fileDialogComplete = function (numFilesSelected, numFilesQueued) {
        try {
            if (numFilesQueued > 1) {
                var stats = this.getStats();
                while (stats.files_queued > 0) {
                    this.cancelUpload();
                    stats = this.getStats();
                }
            }
            else {
                var stats = this.getStats();
                while (stats.files_queued > 1) {
                    this.cancelUpload();
                    stats = this.getStats();
                }
            }
        }
        catch (ex) {
            this.debug(ex);
        }
    };


    this.uploadProgress = function (file, bytesLoaded, bytesTotal) {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        var upload_message = Math.ceil(bytesLoaded / 1024) + 'kb/' + Math.ceil(bytesTotal / 1024) + 'kb';
        $(ImageManager.htmlTag.divUploadStatusBar, ImageManager.htmlTag.divImageMgr).css('width', percent + '%');
        $(ImageManager.htmlTag.divUploadMessage, ImageManager.htmlTag.divImageMgr).html(upload_message);
        if (bytesLoaded == bytesTotal) {
            $(ImageManager.htmlTag.divUploadMessage, ImageManager.htmlTag.divImageMgr).html('watting...');
        }
    };
    this.uploadSuccess = function (file, serverData) {
        if (serverData == '-1') {
            jAlert(MESSAGE.UploadLogo.notExts, MESSAGE.title);
            return;
        }
        else {
            var strResponse = serverData.split('|');
            if (strResponse[0] == '1') {
                // removeCache
                ImageManager.removeCache();

                // load data
                var name = strResponse[1];
                ImageManager.getImages(name);
                ImageManager.clearForm();
            }
        }
    };
    this.uploadComplete = function (file) {
        try {

            var progress = new FileProgress(file, this.customSettings.upload_target);
            progress.setComplete();
            progress.toggleCancel(false);
            //        /*  I want the next upload to continue automatically so I'll call startUpload here */
            //        if (this.getStats().files_queued > 0) {
            //            this.startUpload();
            //        } else {
            //            var progress = new FileProgress(file, this.customSettings.upload_target);
            //            progress.setComplete();
            //            progress.toggleCancel(false);



            //        }
        } catch (ex) {
            this.debug(ex);
        }
    };
    this.uploadError = function (file, errorCode, message) {
        var progress;
        try {
            switch (errorCode) {
                case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                    try {
                        progress = new FileProgress(file, this.customSettings.upload_target);
                        progress.setCancelled();
                        progress.setStatus("Cancelled");
                        progress.toggleCancel(false);
                    }
                    catch (ex1) {
                        this.debug(ex1);
                    }
                    break;
                case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                    try {
                        progress = new FileProgress(file, this.customSettings.upload_target);
                        progress.setCancelled();
                        progress.setStatus("Stopped");
                        progress.toggleCancel(true);
                    }
                    catch (ex2) {
                        this.debug(ex2);
                    }
                case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                    jAlert(MESSAGE.UploadLogo.uploadLimitExceeded, MESSAGE.title);
                    break;
                case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                    jAlert(MESSAGE.UploadLogo.httpError, MESSAGE.title);
                    break;
                case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                    jAlert(MESSAGE.UploadLogo.missingUploadUrl, MESSAGE.title);
                    break;
                case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                    jAlert(MESSAGE.UploadLogo.ioError, MESSAGE.title);
                    break;
                case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                    jAlert(MESSAGE.UploadLogo.securityError, MESSAGE.title);
                    break;
                case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                    jAlert(MESSAGE.UploadLogo.uploadFailed, MESSAGE.title);
                    break;
                default:
                    jAlert(MESSAGE.UploadLogo.error + message, MESSAGE.title);
                    break;
            }
        } catch (ex3) {
            this.debug(ex3);
        }

    };
    this.clearForm = function () {
        $(this.htmlTag.divFileName, this.htmlTag.divImageMgr).html('');
        $(this.htmlTag.txtImageName, this.htmlTag.divImageMgr).val('');
        $(this.htmlTag.divUploadStatusBar, this.htmlTag.divImageMgr).css('width', '0%');
        $(this.htmlTag.divUploadMessage, this.htmlTag.divImageMgr).html('');
    };
}

//Tìm tên ảnh
(function ($, window, document, undefined) {
    $.fn.quicksearch = function (target, opt) {

        var timeout, cache, rowcache, jq_results, val = '', e = this, options = $.extend({
            delay: 100,
            selector: null,
            stripeRows: null,
            loader: null,
            noResults: '',
            bind: 'keyup',
            onBefore: function () {
                return;
            },
            onAfter: function () {
                return;
            },
            show: function () {
                this.style.display = "";
            },
            hide: function () {
                this.style.display = "none";
            },
            prepareQuery: function (val) {
                return val.toLowerCase().split(' ');
            },
            testQuery: function (query, txt, _row) {
                for (var i = 0; i < query.length; i += 1) {
                    if (txt.indexOf(query[i]) === -1) {
                        return false;
                    }
                }
                return true;
            }
        }, opt);

        this.go = function () {

            var i = 0,
noresults = true,
query = options.prepareQuery(val),
val_empty = (val.replace(' ', '').length === 0);

            for (var i = 0, len = rowcache.length; i < len; i++) {
                if (val_empty || options.testQuery(query, cache[i], rowcache[i])) {
                    options.show.apply(rowcache[i]);
                    noresults = false;
                } else {
                    options.hide.apply(rowcache[i]);
                }
            }

            if (noresults) {
                this.results(false);
            } else {
                this.results(true);
                this.stripe();
            }

            this.loader(false);
            options.onAfter();

            return this;
        };

        this.stripe = function () {

            if (typeof options.stripeRows === "object" && options.stripeRows !== null) {
                var joined = options.stripeRows.join(' ');
                var stripeRows_length = options.stripeRows.length;

                jq_results.not(':hidden').each(function (i) {
                    $(this).removeClass(joined).addClass(options.stripeRows[i % stripeRows_length]);
                });
            }

            return this;
        };

        this.strip_html = function (input) {
            var output = input.replace(new RegExp('<[^<]+\>', 'g'), "");
            output = $.trim(output.toLowerCase());
            return output;
        };

        this.results = function (bool) {
            if (typeof options.noResults === "string" && options.noResults !== "") {
                if (bool) {
                    $(options.noResults).hide();
                } else {
                    $(options.noResults).show();
                }
            }
            return this;
        };

        this.loader = function (bool) {
            if (typeof options.loader === "string" && options.loader !== "") {
                (bool) ? $(options.loader).show() : $(options.loader).hide();
            }
            return this;
        };

        this.cache = function () {

            jq_results = $(target);

            if (typeof options.noResults === "string" && options.noResults !== "") {
                jq_results = jq_results.not(options.noResults);
            }

            var t = (typeof options.selector === "string") ? jq_results.find(options.selector) : $(target).not(options.noResults);
            cache = t.map(function () {
                return e.strip_html(this.innerHTML);
            });

            rowcache = jq_results.map(function () {
                return this;
            });

            return this.go();
        };

        this.trigger = function () {
            this.loader(true);
            options.onBefore();

            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                e.go();
            }, options.delay);

            return this;
        };

        this.cache();
        this.results(true);
        this.stripe();
        this.loader(false);

        return this.each(function () {
            $(this).bind(options.bind, function () {
                val = $(this).val();
                e.trigger();
            });
        });

    };

} (jQuery, this, document));


/*!
* jQuery Form Plugin
* version: 2.72 (28-APR-2011)
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: http://malsup.com/jquery/form/
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/
; (function ($) {

    /*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are intended to be exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
    $('#myForm').bind('submit', function(e) {
    e.preventDefault(); // <-- important
    $(this).ajaxSubmit({
    target: '#output'
    });
    });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
    $('#myForm').ajaxForm({
    target: '#output'
    });
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
    */

    /**
    * ajaxSubmit() provides a mechanism for immediately submitting
    * an HTML form using AJAX.
    */
    $.fn.ajaxSubmit = function (options) {
        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        if (typeof options == 'function') {
            options = { success: options };
        }

        var action = this.attr('action');
        var url = (typeof action === 'string') ? $.trim(action) : '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }
        url = url || window.location.href || '';

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: this[0].getAttribute('method') || 'GET', // IE7 massage (see issue 57)
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var n, v, a = this.formToArray(options.semantic);
        if (options.data) {
            options.extraData = options.data;
            for (n in options.data) {
                if (options.data[n] instanceof Array) {
                    for (var k in options.data[n]) {
                        a.push({ name: n, value: options.data[n][k] });
                    }
                }
                else {
                    v = options.data[n];
                    v = $.isFunction(v) ? v() : v; // if value is fn, invoke it
                    a.push({ name: n, value: v });
                }
            }
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a);

        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null;  // data is null for 'get'
        }
        else {
            options.data = q; // data is the query string for 'post'
        }

        var $form = this, callbacks = [];
        if (options.resetForm) {
            callbacks.push(function () { $form.resetForm(); });
        }
        if (options.clearForm) {
            callbacks.push(function () { $form.clearForm(); });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function () { };
            callbacks.push(function (data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        }
        else if (options.success) {
            callbacks.push(options.success);
        }

        options.success = function (data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || options;   // jQuery 1.4+ supports scope context 
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };

        // are there files to upload?
        var fileInputs = $('input:file', this).length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, fileUpload);
            }
            else {
                fileUpload();
            }
        }
        else {
            $.ajax(options);
        }

        // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;


        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUpload() {
            var form = $form[0];

            if ($(':input[name=submit],:input[id=submit]', form).length) {
                // if there is an input with a name or id of 'submit' then we won't be
                // able to invoke the submit fn on the form (at least not x-browser)
                alert('Error: Form elements must not have name or id of "submit".');
                return;
            }

            var s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            var id = 'jqFormIO' + (new Date().getTime()), fn = '_' + id;
            var $io = $('<iframe id="' + id + '" name="' + id + '" src="' + s.iframeSrc + '" />');
            var io = $io[0];

            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

            var xhr = { // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function () { },
                getResponseHeader: function () { },
                setRequestHeader: function () { },
                abort: function (status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;
                    $io.attr('src', s.iframeSrc); // abort op in progress
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, e, e);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                    s.complete && s.complete.call(s.context, xhr, e);
                }
            };

            var g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && !$.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                return;
            }
            if (xhr.aborted) {
                return;
            }

            var timedOut = 0, timeoutHandle;

            // add submitting element to data if we know it
            var sub = form.clk;
            if (sub) {
                var n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr('target'), a = $form.attr('action');

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (form.getAttribute('method') != 'POST') {
                    form.setAttribute('method', 'POST');
                }
                if (form.getAttribute('action') != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function () { timedOut = true; cb(true); }, s.timeout);
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            extraInputs.push(
							$('<input type="hidden" name="' + n + '" value="' + s.extraData[n] + '" />')
								.appendTo(form)[0]);
                        }
                    }

                    // add iframe to doc and submit the form
                    $io.appendTo('body');
                    io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
                    form.submit();
                }
                finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            }
            else {
                setTimeout(doSubmit, 10); // this lets dom updates render
            }

            var data, doc, domCheckCount = 50, callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }
                if (e === true && xhr) {
                    xhr.abort('timeout');
                    return;
                }

                var doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut)
                        return;
                }
                io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

                var ok = true;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    xhr.responseText = doc.body ? doc.body.innerHTML : doc.documentElement ? doc.documentElement.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (!xhr.responseText && xhr.responseXML && !s.dataType)
                        s.dataType = 'xml';
                    xhr.getResponseHeader = function (header) {
                        var headers = { 'content-type': s.dataType };
                        return headers[header];
                    };

                    var scr = /(json|script|text)/.test(s.dataType);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                        }
                        else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent;
                            }
                            else if (b) {
                                xhr.responseText = b.innerHTML;
                            }
                        }
                    }
                    else if (s.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    data = httpData(xhr, s.dataType, s);
                }
                catch (e) {
                    log('error caught:', e);
                    ok = false;
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, 'error', e);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    ok = false;
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (ok) {
                    s.success && s.success.call(s.context, data, 'success', xhr);
                    g && $.event.trigger("ajaxSuccess", [xhr, s]);
                }

                g && $.event.trigger("ajaxComplete", [xhr, s]);

                if (g && ! --$.active) {
                    $.event.trigger("ajaxStop");
                }

                s.complete && s.complete.call(s.context, xhr, ok ? 'success' : 'error');

                callbackProcessed = true;
                if (s.timeout)
                    clearTimeout(timeoutHandle);

                // clean up
                setTimeout(function () {
                    $io.removeData('form-plugin-onload');
                    $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function (s, doc) { // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                }
                else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            };
            var parseJSON = $.parseJSON || function (s) {
                return window['eval']('(' + s + ')');
            };

            var httpData = function (xhr, type, s) { // mostly lifted from jq1.4.4
                var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    $.error && $.error('parsererror');
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };
        }
    };

    /**
    * ajaxForm() provides a mechanism for fully automating form submission.
    *
    * The advantages of using this method instead of ajaxSubmit() are:
    *
    * 1: This method will include coordinates for <input type="image" /> elements (if the element
    *	is used to submit the form).
    * 2. This method will include the submit element's name/value data (for the element that was
    *	used to submit the form).
    * 3. This method binds the submit() method to the form for you.
    *
    * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
    * passes the options argument along after properly binding events for submit elements and
    * the form itself.
    */
    $.fn.ajaxForm = function (options) {
        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (this.length === 0) {
            var o = { s: this.selector, c: this.context };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function () {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        return this.ajaxFormUnbind().bind('submit.form-plugin', function (e) {
            if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
                e.preventDefault();
                $(this).ajaxSubmit(options);
            }
        }).bind('click.form-plugin', function (e) {
            var target = e.target;
            var $el = $(target);
            if (!($el.is(":submit,input:image"))) {
                // is this a child element of the submit el?  (ex: a span within a button)
                var t = $el.closest(':submit');
                if (t.length == 0) {
                    return;
                }
                target = t[0];
            }
            var form = this;
            form.clk = target;
            if (target.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                    var offset = $el.offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - target.offsetLeft;
                    form.clk_y = e.pageY - target.offsetTop;
                }
            }
            // clear form vars
            setTimeout(function () { form.clk = form.clk_x = form.clk_y = null; }, 100);
        });
    };

    // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function () {
        return this.unbind('submit.form-plugin click.form-plugin');
    };

    /**
    * formToArray() gathers form element data into an array of objects that can
    * be passed to any of the following ajax functions: $.get, $.post, or load.
    * Each object in the array has both a 'name' and 'value' property.  An example of
    * an array for a simple login form might be:
    *
    * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
    *
    * It is this array that is passed to pre-submit callback functions provided to the
    * ajaxSubmit() and ajaxForm() methods.
    */
    $.fn.formToArray = function (semantic) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (!el.disabled && form.clk == el) {
                    a.push({ name: n, value: $(el).val() });
                    a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({ name: n, value: v[j] });
                }
            }
            else if (v !== null && typeof v != 'undefined') {
                a.push({ name: n, value: v });
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk), input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({ name: n, value: $input.val() });
                a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
            }
        }
        return a;
    };

    /**
    * Serializes form data into a 'submittable' string. This method will return a string
    * in the format: name1=value1&amp;name2=value2
    */
    $.fn.formSerialize = function (semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };

    /**
    * Serializes all field elements in the jQuery object into a query string.
    * This method will return a string in the format: name1=value1&amp;name2=value2
    */
    $.fn.fieldSerialize = function (successful) {
        var a = [];
        this.each(function () {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({ name: n, value: v[i] });
                }
            }
            else if (v !== null && typeof v != 'undefined') {
                a.push({ name: this.name, value: v });
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };

    /**
    * Returns the value(s) of the element in the matched set.  For example, consider the following form:
    *
    *  <form><fieldset>
    *	  <input name="A" type="text" />
    *	  <input name="A" type="text" />
    *	  <input name="B" type="checkbox" value="B1" />
    *	  <input name="B" type="checkbox" value="B2"/>
    *	  <input name="C" type="radio" value="C1" />
    *	  <input name="C" type="radio" value="C2" />
    *  </fieldset></form>
    *
    *  var v = $(':text').fieldValue();
    *  // if no values are entered into the text inputs
    *  v == ['','']
    *  // if values entered into the text inputs are 'foo' and 'bar'
    *  v == ['foo','bar']
    *
    *  var v = $(':checkbox').fieldValue();
    *  // if neither checkbox is checked
    *  v === undefined
    *  // if both checkboxes are checked
    *  v == ['B1', 'B2']
    *
    *  var v = $(':radio').fieldValue();
    *  // if neither radio is checked
    *  v === undefined
    *  // if first radio is checked
    *  v == ['C1']
    *
    * The successful argument controls whether or not the field element must be 'successful'
    * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
    * The default value of the successful argument is true.  If this value is false the value(s)
    * for each element is returned.
    *
    * Note: This method *always* returns an array.  If no valid value can be determined the
    *	   array will be empty, otherwise it will contain one or more values.
    */
    $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            v.constructor == Array ? $.merge(val, v) : val.push(v);
        }
        return val;
    };

    /**
    * Returns the value of the field element.
    */
    $.fieldValue = function (el, successful) {
        var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [], ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) { // extra pain for IE...
                        v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };

    /**
    * Clears the form data.  Takes the following actions on the form's input fields:
    *  - input text fields will have their 'value' property set to the empty string
    *  - select elements will have their 'selectedIndex' property set to -1
    *  - checkbox and radio inputs will have their 'checked' property set to false
    *  - inputs of type submit, button, reset, and hidden will *not* be effected
    *  - button elements will *not* be effected
    */
    $.fn.clearForm = function () {
        return this.each(function () {
            $('input,select,textarea', this).clearFields();
        });
    };

    /**
    * Clears the selected form elements.
    */
    $.fn.clearFields = $.fn.clearInputs = function () {
        return this.each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (t == 'text' || t == 'password' || tag == 'textarea') {
                this.value = '';
            }
            else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            }
            else if (tag == 'select') {
                this.selectedIndex = -1;
            }
        });
    };

    /**
    * Resets the form data.  Causes all form elements to be reset to their original value.
    */
    $.fn.resetForm = function () {
        return this.each(function () {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    };

    /**
    * Enables or disables any matching elements.
    */
    $.fn.enable = function (b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function () {
            this.disabled = !b;
        });
    };

    /**
    * Checks/unchecks any matching checkboxes or radio buttons and
    * selects/deselects and matching option elements.
    */
    $.fn.selected = function (select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function () {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            }
            else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

    // helper fn for console logging
    // set $.fn.ajaxSubmit.debug to true to enable debug logging
    function log() {
        if ($.fn.ajaxSubmit.debug) {
            var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
            if (window.console && window.console.log) {
                window.console.log(msg);
            }
            else if (window.opera && window.opera.postError) {
                window.opera.postError(msg);
            }
        }
    };

})(jQuery);
