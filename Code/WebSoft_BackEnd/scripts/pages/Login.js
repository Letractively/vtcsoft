/// <reference path="../Framework/jquery-1.4.1.min.js" />
/// <reference path="../Framework/jquery-jtemplates.js" />
/// <reference path="../Framework/jquery-1.4.1-vsdoc.js" />

Pages_Login = new function () {
    this.htmlTag = new function () {
        this.login = "#login";
        this.txtUsername = "#txtUsername";
        this.txtPassword = "#txtPassword";
        this.butLogin = "#butLogin";
        this.divMessagError = "#divMessagError";
    };

    this.variable = new function () {
        this.m_userName = '';
        this.m_password = '';
    };

    this.PageLoad = function () {

    };
}