Popup_Account = new function () {
    // m_adminId=0: thêm mới; >0:Cập nhật

    this.htmlTag = new function () {
        this.txtUserName = "#txtUserName";
        this.txtPassword = "#txtPassword";
        this.txtFullName = "#txtFullName";
        this.txtEmail = "#txtEmail";
        this.txtPhone = "#txtPhone";
        this.rdActive = "#rdActive";
        this.rdDeactive = "#rdDeactive";
        this.lbCreateDate = "#lbCreateDate";
        this.txtDescription = "#txtDescription";
        this.popup_cancel = "#popup_cancel";
        this.popup_save = "#popup_save";
    };

    this.variable = new function () {
        this.m_adminID = 0;
        this.m_divParent = "divUpdateAdmin";
        this.m_divChild = "divPopup_UpdateAdmin";
    };

    this.showPopup = function (adminID) {
        Popup_Account.variable.m_adminID = adminID;
        if ($("#" + Popup_Account.variable.m_divParent).length == 0) {
            $("body").append("<div id='" + Popup_Account.variable.m_divParent + "'></div>");
            $("#" + Popup_Account.variable.m_divParent).setTemplateURL("/templates/popup/PopAccount.htm");
            $("#" + Popup_Account.variable.m_divParent).processTemplate(null);
            COMMON.setTemplatePopup(Popup_Account.variable.m_divChild);
        }
    };

    this.close = function () {
        if ($("#" + Popup_Account.variable.m_divParent).length != 0) {
            $("#" + Popup_Account.variable.m_divParent).remove();
        }
    };

    $(".popupclosebutton").live('click', function () {
        Popup_Account.close();
    });
    $("#popup_cancel").live('click', function () {
        Popup_Account.close();
    });
};
