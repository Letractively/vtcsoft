<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="plugin_editor_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="/js/framework/jquery-1.4.1-vsdoc.js"></script>
    <script type="text/javascript" src="/js/framework/jquery-1.4.1.min.js"></script>
    <script src="/js/framework/swfobject.js" type="text/javascript"></script>
    <script src="/js/framework/swfupload.js" type="text/javascript"></script>
    <script src="/js/framework/fileprogress.js" type="text/javascript"></script>
    <script src="/js/upload.js" type="text/javascript"></script>
    <script src="/plugin/editor/tiny_mce/plugins/imagemanager/js/handlers.js" type="text/javascript"></script>
    <script type="text/javascript" src="/plugin/editor/tiny_mce/plugins/imagemanager/js/imageManager.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            Upload.load();
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <a href="/plugin/editor/Simple.aspx" target="_blank">1. Editor dùng cho comment</a><br />
    <a href="/plugin/editor/Full.aspx" target="_blank">2. Editor dùng cho WantAds</a><br />
    <div id="btnSelect"></div>
    </form>
</body>
</html>
