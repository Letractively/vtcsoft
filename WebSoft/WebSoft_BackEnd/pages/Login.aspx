<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Pages_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title><%=VTCO.Config.Global.Settings.WEB_TITLE %></title>
    <link href="/Styles/reset.css" rel="stylesheet" type="text/css" />
    <link href="/Styles/admin.css" rel="stylesheet" type="text/css" />    
    <script src="/Scripts/Framework/jquery-1.4.1.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#<%=butLogin.ClientID %>").hover(function () {
                $(this).attr("class", "ui-button ui-widget ui-state-hover ui-corner-all");
            }, function () {
                $(this).attr("class", "ui-button ui-widget ui-state-default ui-corner-all");
            });
            $("#<%=divMessagError.ClientID %>").live('click', function () {
                $(this).hide();
            });


            function checkLogin() {
                if ($("#<%=txtUserName.ClientID %>").length == 0) {
                    alert('Bạn chưa nhập tên tài khoản! ');
                    return;
                }
                if ($("#<%=txtPassword.ClientID %>").length == 0) {
                    alert('Bạn chưa nhập mật khẩu! ');
                    return;
                }
            };
        });        
    </script>
</head>
<body>
    <form runat="server">
        <div id="login">
        <div class="title">
            <h5>
                Đăng nhập hệ thống</h5>
            <div class="corner tl">
            </div>
            <div class="corner tr">
            </div>
        </div>
        <div class="messages">
            <div id="divMessagError" class="message message-error" runat="server" visible="false">
                <div class="image">
                    <img src="/images/error.png" alt="Error" height="32" />
                </div>
                <div class="text">
                    <h6>
                        Lỗi đăng nhập</h6>
                    <span>Không đúng tên hoặc mật khẩu.</span>
                </div>
                <div class="dismiss">
                    <a href="javascript:;"></a>
                </div>
            </div>
        </div>
        <div class="inner">
            <div class="form">
                <div class="fields">
                    <div class="field">
                        <div class="label">
                            <label for="username">Tên đăng nhập:</label>
                        </div>
                        <div class="input">
                            <asp:TextBox ID="txtUserName" runat="server" size="40" value="" CssClass="focus"></asp:TextBox>                            
                        </div>
                    </div>
                    <div class="field">
                        <div class="label">
                            <label for="password">Mật khẩu:</label>
                        </div>
                        <div class="input">
                            <asp:TextBox ID="txtPassword" runat="server" size="40" value="" CssClass="focus" TextMode="Password"></asp:TextBox>                            
                        </div>
                    </div>
                    <div class="buttons">
                        <asp:Button ID="butLogin"  runat="server" CssClass="ui-button ui-widget ui-state-default ui-corner-all" Text="Đăng nhập" onclick="butLogin_Click" />                           
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
