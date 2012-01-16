<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Full.aspx.cs" Inherits="plugin_editor_Full" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="/css/popup.css" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="/js/framework/jquery-1.6.min.js"></script>
    <script type="text/javascript" src="/js/framework/jquery-jtemplates.js"></script>
    <script src="/js/framework/jquery.jCache.js" type="text/javascript"></script>
    <script src="/js/framework/jquery.alerts.js" type="text/javascript"></script>
    <script type="text/javascript" src="/js/common/CONSTANT.js"></script>
    <script type="text/javascript" src="/js/common/Message.js"></script>
    <script src="/plugin/upload/js/jquery.form.js" type="text/javascript"></script>
    <script src="/js/framework/jquery.ui.core.js" type="text/javascript"></script>
    <script src="/js/framework/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="/js/framework/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="/js/framework/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="/js/common/Loading.js" type="text/javascript"></script>
    <script type="text/javascript" src="/plugin/editor/tiny_mce/plugins/imagemanager/js/imageManager.js"></script>
    <script type="text/javascript" src="/plugin/editor/tiny_mce/tiny_mce.js"></script>        
    <script src="/js/common/trian-common.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            tinyMCE.init({
                // General options
                mode: "exact",
                elements: "<%= txtComment.ClientID %>",
                theme: "advanced",
                plugins: "pagebreak,table,advhr,advimage,advlink,inlinepopups,preview,searchreplace,contextmenu,paste,fullscreen,noneditable,visualchars",
                language: "vi",
                remove_script_host: false,
                relative_urls: false,

                // Theme options
                theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,fontselect,fontsizeselect",
                theme_advanced_buttons2: "cut,copy,paste,pastetext,|,search,replace,|,bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,image,cleanup,|,preview,|,forecolor,backcolor",
                theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,advhr,|,fullscreen,|,code",
                theme_advanced_buttons4: "",
                theme_advanced_toolbar_location: "top",
                theme_advanced_toolbar_align: "left",
                theme_advanced_statusbar_location: "",
                theme_advanced_resizing: false,
                init_instance_callback: function () {
                    tinyMCE.execInstanceCommand("<%= txtComment.ClientID %>", "mceFocus");
                }
            });

            $('#btnSetContent').live('click', function () {
                tinymce.get('<%= txtComment.ClientID %>').setContent('hehe');
             });

        });
        function openImageManager() {
            ImageManager.openImageManager();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <b>Editor dùng cho form WantAds</b></div>
    <div>
        <textarea id="txtComment" runat="server" rows="15" cols="80" width="518px" height="100px"></textarea>
        <hr />dsdsdsa sadsa dsa dá sad<br />
        dsadadss
    </div>
    <input type="button" id="btnSetContent" value="Set Content" />
    </form>
</body>
</html>
