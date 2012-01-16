/// <reference path="../Framework/jquery-1.4.1.min.js" />
/// <reference path="../Framework/jquery-jtemplates.js" />
/// <reference path="../Framework/jquery-1.4.1-vsdoc.js" />

Pages_Account = new function () {
    this.htmlTag = new function () {
        this.divAdminList = "#divAdminList";
    };

    this.variable = new function () {

    };

    this.PageLoad = function () {
        this.bindData();
    };

    this.bindData = function () {
        //Loading.showProcess();
        $.ajax({
            type: "GET",
            url: "/Handler/HandlerAdmin.ashx",
            data: { t: "getListAdmin" },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                Pages_Account.processData(data);
                //Loading.closeProcess();
            }
        });
    };

    this.processData = function (data) {
        $(Pages_Account.htmlTag.divAdminList).setTemplateURL("/Templates/Pages/Account.htm");
        $(Pages_Account.htmlTag.divAdminList).processTemplate(data);
        var m_stt = 0;
        $('#divSTT', Pages_Account.htmlTag.divAdminList).each(function () {
            m_stt++;
            $(this).text(m_stt);
        });
    };

    $("#aAddAdmin").live('click', function () {
        Popup_Account.showPopup(0);
    });
}