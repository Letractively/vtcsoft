/*
Author: hoan.trinh
Create Date: 2010-03-29
Description: các scrip thông dụng thường sử dụng
*/
/// <reference path="/js/framework/jquery-1.4.1-vsdoc.js" />
/// <reference path="/js/framework/jquery-1.4.1.min.js" />
/// <reference path="Message.js" />
/// <reference path="../framework/jquery.alerts.js" />

COMMON = new function () {
    // Hàm convert chuỗi json Datetime sang Date
    // value: chuỗi jSon datetime
    this.jSonToDate = function (value) {
        if ((typeof (value) == 'undefined') || (value == null)) {
            return value;
        }
        value = value.replace('/Date(', '');
        value = value.replace(')/', '');
        var expDate = new Date(parseInt(value));
        return expDate;
    };
    // Hàm convert chuỗi json Datetime sang chuối ngày tháng
    // value: chuỗi jSon datetime
    // option:
    //      0: dd/MM/yyyy hh:mm:ss
    //      1: dd/MM/yyyy
    //      2: hh:mm:ss dd/MM/yyyy
    //      3: hh dd/MM/yyyy
    //      4: hh:mm (AM/PM) - dd/MM/yyyy
    this.jSonDateToString = function (value, option) {
        if ((typeof (value) == 'undefined') || (value == null)) {
            return value;
        }
        if ((typeof (option) == 'undefined') || (option == null)) {
            option = 0;
        }
        var expDate = COMMON.jSonToDate(value);
        var _day = expDate.getDate();
        var _month = expDate.getMonth() + 1;
        var _year = expDate.getFullYear();
        var _hour = expDate.getHours();
        var _minute = expDate.getMinutes();
        var _second = expDate.getSeconds();
        var _ap = "AM";
        if (_hour > 11) _ap = "PM";
        if (_day < 10) _day = "0" + _day;
        if (_month < 10) _month = "0" + _month;
        if (_hour < 10) _hour = "0" + _hour;
        if (_minute < 10) _minute = "0" + _minute;
        if (_second < 10) _second = "0" + _second;
        switch (option) {
            case 0:
                return _day + '/' + _month + '/' + _year + ' ' + _hour + ':' + _minute + ':' + _second;
                break;
            case 1:
                return _day + '/' + _month + '/' + _year;
                break;
            case 2:
                return _hour + ':' + _minute + ':' + _second + ' ' + _day + '/' + _month + '/' + _year;
                break;
            case 3:
                return _hour + 'h - ' + _day + '/' + _month + '/' + _year;
                break;
            case 4:
                return _hour + ':' + _minute + ' ' + _ap + ' - ' + _day + '/' + _month + '/' + _year;
                break;
            default:
                return expDate.toString();
                break;
        }
    };

    // Hàm lấy xâu con của 1 xâu + phần mở rộng
    // VD: COMMON.subString('hoan.trinh',4,'...') --> return: 'hoan...'
    this.subString = function (value, length, extend) {
        if ((typeof (value) == 'undefined') || (value == null)) {
            return '';
        }
        if (value.length <= length) {
            return value;
        }
        return value.substr(0, length) + extend;

    };
    this.subStringMeans = function (value, length, extend) {
        //alert("độ dài:"+value.length +" - cắt:"+length+" - thành:"+extend);
        if ((typeof (value) == 'undefined') || (value == null)) {
            return '';
        }
        if (value.length <= length) {
            return value;
        }
        var _tValue = value.substr(0, length);
        if (value[length] == '')
            _tValue = value.substr(0, length + 1);
        else
            _tValue = _tValue.substr(0, _tValue.lastIndexOf(" "));
        return _tValue + extend;

    }
    // Hàm lấy url từ chuỗi Unicode
    // mục đích: phục vụ cho SEO
    this.getUrlText = function (plainText) {
        var _URL_CHARS_UNICODE = "AÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴBCDĐEÉÈẸẺẼÊẾỀỆỂỄFGHIÍÌỊỈĨJKLMNOÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠPQRSTUÚÙỤỦŨƯỨỪỰỬỮVWXYÝỲỴỶỸZaáàạảãâấầậẩẫăắằặẳẵbcdđeéèẹẻẽêếềệểễfghiíìịỉĩjklmnoóòọỏõôốồộổỗơớờợởỡpqrstuúùụủũưứừựửữvwxyýỳỵỷỹz0123456789_";
        var _URL_CHARS_ANSI = "AAAAAAAAAAAAAAAAAABCDDEEEEEEEEEEEEFGHIIIIIIJKLMNOOOOOOOOOOOOOOOOOOPQRSTUUUUUUUUUUUUVWXYYYYYYZaaaaaaaaaaaaaaaaaabcddeeeeeeeeeeeefghiiiiiijklmnoooooooooooooooooopqrstuuuuuuuuuuuuvwxyyyyyyz0123456789_";
        var _URL_CHARS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        var _strTemp = "";
        var _iLength = plainText.length;

        var _iIndex = 0;

        // Loại bỏ các ký tự có dấu
        for (var i = 0; i < _iLength; i++) {
            iIndex = _URL_CHARS_UNICODE.indexOf(plainText.charAt(i));
            if (iIndex == -1)
                _strTemp += plainText.charAt(i);
            else
                _strTemp += _URL_CHARS_ANSI.charAt(iIndex);
        }
        var _strReturn = "";

        // Loại bỏ các ký tự lạ
        for (var i = 0; i < _iLength; i++) {
            if (_URL_CHARS_BASE.indexOf(_strTemp.charAt(i)) == -1) {
                _strReturn += '-';
            }
            else {
                _strReturn += _strTemp.charAt(i);
            }
        }

        while (_strReturn.indexOf("--") != -1) {
            _strReturn = _strReturn.replace('--', '-');
        }

        if ((_strReturn.length > 0) && (_strReturn.charAt(0) == '-')) {
            _strReturn = _strReturn.substr(1);
        }

        if ((_strReturn.length > 0) && (_strReturn.charAt(_strReturn.length - 1) == '-')) {
            _strReturn = _strReturn.substr(0, _strReturn.length - 1);
        }
        if (_strReturn.length > 60) {
            _iIndex = _strReturn.indexOf('-', 59);
            if (_iIndex != -1) {
                _strReturn = _strReturn.substring(0, _iIndex);
            }
        }
        return _strReturn.toLowerCase();
    };

    // Hàm load file css
    this.loadcssfile = function (filename) {
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    };

    // Hàm load file js
    this.loadScriptFile = function (filename) {
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    };

    // Chỉ cho nhập vào các kí tự từ 0 => 9, backspace, del,tab, dấu chấm
    this.validateDigitQuantity = function (evt) {
        var keyCode = evt.keyCode ? evt.keyCode : evt.which;
        var arrCode = new Array(48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 46, 36, 9, 32);
        if ($.browser.msie) {
            for (var i = 0; i < arrCode.length; i++) {
                if (arrCode[i] == keyCode) {
                    return true;
                    break;
                }
            }
            return false;
        }
        else {
            if (arrCode.indexOf(keyCode) > -1) return true;
            return false;
        }

    };

    // Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1,234,123
    this.formatMoney = function (argValue) {
        var _comma = (1 / 2 + '').charAt(1);
        var _digit = '.';
        if (_comma == '.') {
            _digit = ',';
        }

        var _sSign = "";
        if (argValue < 0) {
            _sSign = "-";
            argValue = -argValue;
        }

        var _sTemp = "" + argValue;
        var _index = _sTemp.indexOf(_comma);
        var _digitExt = "";
        if (_index != -1) {
            _digitExt = _sTemp.substring(_index + 1);
            _sTemp = _sTemp.substring(0, _index);
        }

        var _sReturn = "";
        while (_sTemp.length > 3) {
            _sReturn = _digit + _sTemp.substring(_sTemp.length - 3) + _sReturn;
            _sTemp = _sTemp.substring(0, _sTemp.length - 3);
        }
        _sReturn = _sSign + _sTemp + _sReturn;
        if (_digitExt.length > 0) {
            _sReturn += _comma + _digitExt;
        }
        return _sReturn;
    };

    this.formatCurrent = function (num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + '.' +
                num.substring(num.length - (4 * i + 3));
        var currency = (((sign) ? '' : '-') + num);
        return currency;
    };

    this.CaculatorTime = function (totalSeconds) {
        if (totalSeconds <= 0)
            return "00 : 00 : 00";
        hour = parseInt(totalSeconds / 3600);
        minute = parseInt((totalSeconds - hour * 3600) / 60);
        second = totalSeconds - hour * 3600 - minute * 60;
        if (hour < 10)
            _hour = "0" + hour.toString();
        else _hour = hour.toString();
        if (minute < 10)
            _minute = "0" + minute.toString();
        else _minute = minute.toString();
        if (second < 10)
            _second = "0" + second.toString();
        else _second = second.toString();
        return _hour + " : " + _minute + " : " + _second;
    };

    this.setStyleRow = function (m_selParent) {
        var m_stt = 0;
        $('#divItem', m_selParent).each(function () {
            m_stt++;
            if ((m_stt % 2) == 0) {
                $(this).addClass('list_view_s_even');
            }
            else {
                $(this).addClass('list_view_s');
            }
        });
    };

    this.setStyleRowComunity = function (m_selParent) {
        var m_stt = 0;
        $('#divItem', m_selParent).each(function () {
            m_stt++;
            if ((m_stt % 2) == 0) {
                $(this).addClass('list_view_s_even');
            }
            else {
                $(this).addClass('list_view_s');
            }
        });
    };

    this.switch_display = function (_control1, _control2, _bool) {
        if (_bool) {
            $(_control1).show('slow');
            $(_control2).hide('slow');
        }
        else {
            $(_control1).hide('slow');
            $(_control2).show('slow');
        }
    };

    this.switch_display_1 = function (obj) {
        if (obj.style.display == 'none') {
            obj.style.display = '';
        }
        else {
            obj.style.display = 'none';
        }
    };

    this.switch_display_2 = function (_control1, _control2, _bool, _speed) {
        if (_bool) {
            $(_control1).slideUp(_speed, function () {
                $(_control2).slideDown(_speed);
            });
        }
        else {
            $(_control2).slideUp(_speed, function () {
                $(_control1).slideDown(_speed);
            });
        }
    };

    this.getAvatarPath = function (id, w, h) {
        var accId = id;
        var acc1 = Math.floor(accId / 1000000);
        var acc2 = Math.floor(accId / 1000);
        return "http://farm01.go.vn/avatar/store/account/" + acc1 + "/" + acc2 + "/" + accId + "/" + accId + ".png." + w + "." + h + ".cache";
    };

    this.get_gravatar = function (email, size) {
        // MD5 (Message-Digest Algorithm) by WebToolkit
        // http://www.webtoolkit.info/javascript-md5.html
        var MD5 = function (s) { function L(k, d) { return (k << d) | (k >>> (32 - d)) } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r(d, F, k) { return (d & F) | ((~d) & k) } function q(d, F, k) { return (d & k) | (F & (~k)) } function p(d, F, k) { return (d ^ F ^ k) } function n(d, F, k) { return (F ^ (d | (~k))) } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J(k) { k = k.replace(/\r\n/g, "\n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() };
        var size = size || 80;
        return 'http://www.gravatar.com/avatar/' + MD5(email) + '.jpg?s=' + size;
    };

    this.removeHTMLTags = function (htmlString) {
        if (htmlString) {
            var mydiv = document.createElement("div");
            mydiv.innerHTML = htmlString;

            if (document.all) // IE Stuff
            {
                return mydiv.innerText;
            }
            else // Mozilla does not work with innerText
            {
                return mydiv.textContent;
            }
        }
    };

    //Loại bỏ các thẻ HTML
    this.stripHTML = function (oldString) {
        var newString = "";
        var inTag = false;
        for (var i = 0; i < oldString.length; i++) {
            if (oldString.charAt(i) == '<') inTag = true;
            if (oldString.charAt(i) == '>') {
                if (oldString.charAt(i + 1) == "<") {
                    //dont do anything
                }
                else {
                    inTag = false;
                    i++;
                }
            }
            if (!inTag) newString += oldString.charAt(i);
        }
        return newString;
    };

    //Loại bỏ các ký tự đặc biệt
    this.replaceSpecialCharsToHtml = function (text) {
        if (text == null) {
            text = "";
        }
        text = text.replace(/\n|\n$/g, "<br/>").replace(/\t|\t$/g, "&nbsp;&nbsp;");
        return text;
    };

    this.replaceHtmlToSpecialChars = function (text) {
        if (text == null) {
            text = "";
        }
        text = text.replace('/<br\s*\/*>|<br\s*\/*>$/g', "\n").replace(/&nbsp;|&nbsp;$/g, "");
        return text;
    };

    //Display/ Hidden a Tag
    this.showTag = function (id) {
        $("#" + id).css("display", "");
    };

    this.hiddenTag = function (id) {
        $("#" + id).css("display", "none");
    };

    this.isShowTag = function (id) {
        var display = trim($("#" + id).css("display"));
        return (display == "block" || display == "");
    };

    this.isHiddenTag = function (id) {
        var display = trim($("#" + id).css("display"));
        return (display == "none");
    };
    this.convertStatus = function (status) {
        if (status == 1)
            return "Hoạt động";
        if (status == 0)
            return "Đã khóa";
    };
    this.convertTypeNews = function (_type) {
        var type = "";
        if ((_type & 1) == 1)
            type += "Tiêu điểm, ";
        if ((_type & 2) == 2)
            type += "Con số sự kiện, ";
        if ((_type & 4) == 4)
            type += "Theo dòng lịch sử,";
        if (type.lastIndexOf(',') > 0) {
            type = type.substring(0, type.lastIndexOf(','));
        }
        return type;
    };
    this.convertAction = function (action) {
        if (action == 1)
            return "Đăng nhập";
        if (action == 2)
            return "Thêm mới";
        if (action == 3)
            return "Sửa thông tin";
        if (action == 4)
            return "Xóa thông tin";
    };
    this.convertTypeMartyr = function (type) {
        if (type == 1)
            return "Liệt sĩ";
        if (type == 2)
            return "Liệt sĩ vô danh";
        if (type == 3)
            return "Tử sĩ";
        if (type == 4)
            return "Anh Hùng";
        if (type == 5)
            return "Cán bộ cao cấp";
    };
    this.convertLinkShow = function (publicContent, province) {
        if (province != null)
            return province;
        if (publicContent == 0)
            return "[Trang chủ]";
        if (publicContent == 1)
            return "[Liên kết chung]";
    };
    this.convertHistoryShow = function (publicContent, province) {
        if (province != null)
            return province;
        if (publicContent == 0)
            return "[Tin trang chủ]";
        if (publicContent == 1)
            return "[Tin chung]";
    };
    this.convertAlbumShow = function (publicContent, province) {
        if (province != null)
            return province;
        if (publicContent == 0)
            return "[Trang chủ]";
        if (publicContent == 1)
            return "[Tất cả các trang]";
    };
    this.errorAjax = function (request, error) {
        if (request.status == 0) {
            alert('You are offline!!\n Please Check Your Network.');
        } else if (request.status == 404) {
            alert('Requested URL not found.');
        } else if (request.status == 500) {
            alert('Internel Server Error.');
        } else if (error == 'parsererror') {
            $(window.location).attr('href', '/pages/Login.aspx');
        } else if (error == 'timeout') {
            alert('Request Time out.');
        } else {
            alert('Unknow Error.\n' + request.responseText);
        }
    };
    // Kiểm tra xem đã hết thời gian của session hay chưa?
    this.isLogin = function (data) {
        if (eval(data) == 0) {
            $(window.location).attr('href', '/pages/login.aspx');
        }
        else
            return true;
    };

    this.actionSuccess = function (data) {
        if (eval(data) == 0) {
            $(window.location).attr('href', '/pages/login.aspx');
            return false;
        }
        else {
            if (eval(data) == -1) {
                jAlert(Message.hasError, null);
                return false;
            }
            else
                return true;
        }
    };

    this.convertDate = function (expDate) {
        var m_day = expDate.getDate();
        var m_month = expDate.getMonth() + 1;

        if (m_day < 10) m_day = '0' + m_day;
        if (m_month < 10) m_month = '0' + m_month;

        return m_day + '/' + m_month + '/' + expDate.getFullYear();
    };
    this.convertFormatDate = function (date) {
        // Convert date from dd/mm/yyyy to mm/dd/yyyy;
        var year = date.substring(date.lastIndexOf('/') + 1);
        date = date.substring(0, date.lastIndexOf('/'));
        var month = date.substring(date.lastIndexOf('/') + 1);
        date = date.substring(0, date.lastIndexOf('/'));
        var day = date.substring(date.lastIndexOf('/'));
        var datetime = month + "/" + day + "/" + year;
        return datetime;
    };
    this.validateDate = function (date) {
        var reDate = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;
        return reDate.test(date);
    }
    this.setTemplatePopup = function (divPopup) {
        try {
            var top = (($(window).height() / 2) - ($("#" + divPopup).outerHeight() / 2));
            var left = (($(window).width() / 2) - ($("#" + divPopup).outerWidth() / 2));
            if (top < 0) top = 0;
            if (left < 0) left = 0;
            // IE6 fix
            if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

            $("#" + divPopup).css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#" + divPopup).draggable({ handle: $("#" + divPopup + " .barpopup") });
            $("#" + divPopup + " .barpopup").css({ cursor: 'move' });
            $(".popupclosebutton").hover(function () {

                $(this).addClass('closebutton_hover');
            },
                    function () {

                        $(this).removeClass('closebutton_hover');

                    });
            $(".buttonok").hover(function () {
                $(this).addClass('buttonokhover');
            },
                    function () {

                        $(this).removeClass('buttonokhover');

                    });
        } catch (e) { /* requires jQuery UI draggables */ }
    };
};

// thêm hàm indexOf cho IE
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        start = (start == null) ? 0 : start;
        for (var i = start; i < this.length; i++)
            if (this[i] == obj) {
                return i;
            }
        return -1;
    }
};