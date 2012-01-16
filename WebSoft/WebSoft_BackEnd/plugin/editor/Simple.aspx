<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Simple.aspx.cs" Inherits="plugin_editor_Simple" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="/css/popup.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="/js/framework/jquery-1.4.1.min.js"></script>
    <script type="text/javascript" src="/plugin/editor/tiny_mce/tiny_mce.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            tinyMCE.init({
                // General options
                mode: "exact",
                elements: "<%= txtComment.ClientID %>",
                theme: "advanced",
                plugins: "emotions,inlinepopups",
                theme_advanced_toolbar_location: "top",
                remove_script_host: false,
                relative_urls: false,

                theme_advanced_buttons1: "bold,italic,underline,|,emotions",
                theme_advanced_buttons2: "",
                theme_advanced_buttons3: "",
                theme_advanced_toolbar_location: "top",
                theme_advanced_toolbar_align: "left",
                theme_advanced_statusbar_location: "",
                theme_advanced_resizing: false,
                width: "518px",
                height: "100px",
                // Example content CSS (should be your site CSS)
                content_css: "/css/content.css",

                setup: function (ed) {
                    ed.onKeyUp.add(function (ed, e) {
                        var maxlength = 300;
                        var txt = tinyMCE.activeEditor.getContent().replace('<p>', '').replace('</p>', '');
                        if (txt.length > maxlength) {
                            txt = txt.substring(0, maxlength);
                            tinyMCE.activeEditor.setContent(txt);
                            $('#<%=txtComment.ClientID %>').focus();
                        }
                        maxlength = maxlength - txt.length;
                        $("#commentCount").html('<b>' + maxlength + '</b>');
                    });
                }
            });

            //tinyMCE.activeEditor.setContent('hehe');
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div><b>Editor dùng cho form Comment</b></div>
    <div class="fr counterText">
        Còn lại <span class="charsLeft" id="commentCount"><b>300</b></span> ký tự</div>
    <div>
        <textarea id="txtComment" runat="server" rows="15" cols="80" width="518px" height="100px">
	    </textarea>
    </div>
    <div>
        <asp:Label ID="lbComment" runat="server"></asp:Label>
    </div>
    <div>
        <asp:Button ID="btnComment" runat="server" Text="Comment" 
            onclick="btnComment_Click" />
    </div>
    </form>
</body>
</html>
