/// <reference path="/js/framework/jquery-1.4.1.min.js" />
/// <reference path="/plugin/alert/js/jquery.alerts.js" />
/// <reference path="/js/Message.js" />

//Author: trung.pham


function InputFocus(textdefault, control) {
    text = control.value;
    if (text == textdefault) control.value = "";
}
function InputBlur(textdefault, control) {
    text = control.value;
    if (text == "") control.value = textdefault;    
}
function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;
    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;
}

Untils = new function () {
    this.inputFocus = function (textdefault, control) {
        text = control.value;
        if (text == textdefault) {
            control.value = "";
            control.focus();
        }
    };

    this.isNumberKey = function (evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    };
    
    this.inputBlur = function (textdefault, control) {
        text = control.value;
        if (text == "") control.value = textdefault;
    };

    this.isEmpty = function (val) {
        if (val) {
            return ((val === null) || val.length == 0 || /^\s+$/.test(val));
        } else {
            return true;
        }
    };

    this.isReal = function (sText) {
        var ValidChars = "0123456789.";
        for (i = 0; i < sText.length; i++) {
            Char = sText.charAt(i);
            if (ValidChars.indexOf(sText.charAt(i)) == -1) {
                return false;
            }
        }
        return true;
    };

    this.isInteger = function (s) {
        var i;
        for (i = 0; i < s.length; i++) {
            // Check that current character is number.
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        // All characters are numbers.
        return true;
    };

    this.DaysArray = function (n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31;
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30; }
            if (i == 2) { this[i] = 29; }
        }
        return this
    };

    this.daysInFebruary = function (year) {
        // February has 29 days in any year evenly divisible by four,
        // EXCEPT for centurial years which are not also divisible by 400.
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    };

    this.stripCharsInBag = function (s, bag) {
        var i;
        var returnString = "";
        // Search through string's characters one by one.
        // If character is not in bag, append to returnString.
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    };

    // Kiểm tra một xâu có phải là kiểu ngày tháng có định dạng là dd/MM/yyyy hay không
    //Return: 1: Ok
    // -1: The date format should be : dd/mm/yyyy
    // -2: Please enter a valid month
    // -3: Please enter a valid day
    // -4: Please enter a valid 4 digit year between  1900 and 2100       
    // -5: Please enter a valid date
    this.isDate = function (dtStr) {
        var dtCh = "/";
        var minYear = 1900;
        var maxYear = 2100;
        var daysInMonth = this.DaysArray(12);
        var pos1 = dtStr.indexOf(dtCh);
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1);
        var strDay = dtStr.substring(0, pos1);
        var strMonth = dtStr.substring(pos1 + 1, pos2);
        var strYear = dtStr.substring(pos2 + 1);
        strYr = strYear
        if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1);
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1);
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1);
        }
        var month = parseInt(strMonth);
        var day = parseInt(strDay);
        var year = parseInt(strYr);
        if (pos1 == -1 || pos2 == -1) {
            return -1;
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            return -2;
        }
        if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > this.daysInFebruary(year)) || day > daysInMonth[month]) {
            return -3;
        }
        if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
            return -4;
        }
        if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || this.isInteger(this.stripCharsInBag(dtStr, dtCh)) == false) {
            return -5;
        }
        return 1;
    };

    // So sánh 2 ngày tháng có định dạng dd/MM/yyyy
    this.DateCompare = function (date1Str, date2Str) {
        var dtCh = "/";
        var pos1 = date1Str.indexOf(dtCh);
        var pos2 = date1Str.indexOf(dtCh, pos1 + 1);
        var strDay = date1Str.substring(0, pos1);
        var strMonth = date1Str.substring(pos1 + 1, pos2);
        var strYear = date1Str.substring(pos2 + 1);
        var date1 = new Date(strYear, strMonth, strDay);
        pos1 = date2Str.indexOf(dtCh);
        pos2 = date2Str.indexOf(dtCh, pos1 + 1);
        strDay = date2Str.substring(0, pos1);
        strMonth = date2Str.substring(pos1 + 1, pos2);
        strYear = date2Str.substring(pos2 + 1);
        var date2 = new Date(strYear, strMonth, strDay);
        if (date1 > date2) {
            return false;
        }
        else {
            return true;
        }
    };

    this.isValidEmail = function (str) {
        var re = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (str == 0) return true;
        var rx = new RegExp(re);
        var matches = rx.exec(str);
        return (matches != null && str == matches[0]);
    };

    this.isPhone = function (p) {
        var re = /^[0-9\-\(\)\ ]+$/;
        var rx = new RegExp(re);
        var matches = rx.exec(p);
        return (matches != null && p == matches[0]);
    };
};
