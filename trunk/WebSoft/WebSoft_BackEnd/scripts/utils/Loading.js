/// <reference path="/js/framework/jquery-1.4.1.min.js" />
/// <reference path="/js/CONSTANT.js" />
/// <reference path="/js/Message.js" />
//-----------------------------------------------------------
// Author:      hoan.trinh
// Create Date: 2010-07-14
// Description: Popup Loading
//-----------------------------------------------------------

LoadingPopup = new function () {
    this.m_idLoadingPopup = "__divLoadingPopup";
    // Hiển thị popup
    this.show = function () {
        // Check hiện popup
        if ($("#" + this.m_idLoadingPopup).length == 0) {
            $("body").append("<div id='" + this.m_idLoadingPopup + "'></div>");
            var _sHtml = '<div id="divPopupBg" class="divPopup_bg" style="z-index: 1002"></div>';
            _sHtml += '<div id="divPopup_Loading" class="divPopup_wrapperMain" style="z-index: 1003;width:310px;"><div id="divWapper" class="divPopup_border" style="width: 300px;"><div align="left" class="divPopup_wrapper" style="height: 160px;">';

            _sHtml += '<div class="barpopup" style="display: block; height: 33px;"><div class="titlepopup" style="float: left;">';
            _sHtml += MESSAGE.loadingText + '</div></div>';

            _sHtml += '<div style="display: block; text-align: center; padding: 15px; height: 35px;" class="content_popup_editor">';
            _sHtml += CONSTANT.TAG_IMAGE_LOADING + '</div>';
            _sHtml += '<div id="botpopup" class="botpopup"></div>';
            _sHtml += '</div></div></div>';
            $("#" + this.m_idLoadingPopup).html(_sHtml);

            var top = (($(window).height() / 2) - ($("#divPopup_Loading").outerHeight() / 2));
            var left = (($(window).width() / 2) - ($("#divPopup_Loading").outerWidth() / 2));
            if (top < 0) top = 0;
            if (left < 0) left = 0;
            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#divPopup_Loading").css({
                top: top + 'px',
                left: left + 'px'
            });

            try {
                $("#divPopup_Loading").draggable({ handle: $("#divPopup_Loading .barpopup") });
                $("#divPopup_Loading .barpopup").css({ cursor: 'move' });
            } catch (e) { /* requires jQuery UI draggables */ }

        }
    };

    // Đóng cửa sổ
    this.close = function () {
        if ($("#" + this.m_idLoadingPopup).length != 0) {
            $("#" + this.m_idLoadingPopup).remove();
        }
    };
};

Loading = new function () {
    this.m_idLoading = "__divLoading";
    this.m_idLoadingProcess = 'divLoadingProcess';
    this.show = function (m_selparentId) {
        var offset = $(m_selparentId).offset();
        var top = offset.top + ($(m_selparentId).outerHeight() / 3);
        var left = offset.left + ($(m_selparentId).outerWidth() / 2);
        if (top == 0 || left == 0) return;
        if ($("#" + this.m_idLoading, m_selparentId).length == 0) {
            $(m_selparentId).append('<img class="hotsymboltp" id=' + this.m_idLoading + '  alt="Loading..." src="/images/loading_bar.gif" />');


            if (top < 0) top = 0;
            if (left < 0) left = 0;
            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#" + this.m_idLoading).css({
                top: top + 'px',
                left: left + 'px'
            });
        }
    };

    this.showPopup = function (m_selparentId, m_left, m_top) {
        if ($("#" + this.m_idLoading, m_selparentId).length == 0) {
            $(m_selparentId).append('<img class="hotsymboltp" id=' + this.m_idLoading + '  alt="Loading..." src="/images/loading_bar.gif" />');

            var offset = $(m_selparentId).offset();
            var top = offset.top + ($(m_selparentId).outerHeight() / 3) - m_top;
            var left = offset.left + ($(m_selparentId).outerWidth() / 2) - m_left;
            if (top < 0) top = 0;
            if (left < 0) left = 0;
            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#" + this.m_idLoading).css({
                top: top + 'px',
                left: left + 'px'
            });
        }
    };
    this.close = function (m_selparentId) {
        if ($("#" + this.m_idLoading, m_selparentId).length != 0) {
            $("#" + this.m_idLoading, m_selparentId).remove();
        }
    };

    this.showProcess = function () {
        if ($("#" + this.m_idLoadingProcess).length == 0) {
            $("body").append("<div id='" + this.m_idLoadingProcess + "'></div>");
            var _html = '<div class="overlay"><div class="loader">Đang xử lý...</div></div>';
            $("#" + this.m_idLoadingProcess).html(_html);
        }
        else {
            $("#" + this.m_idLoadingProcess).show();
        }
    };

    this.closeProcess = function () {
        if ($("#" + this.m_idLoadingProcess).length != 0) {
            $("#" + this.m_idLoadingProcess).hide();
        }
    };


};

