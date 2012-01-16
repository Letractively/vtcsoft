<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="plugin_fancybox_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="/js/framework/jquery-1.5.min.js" type="text/javascript"></script>
    <script src="/plugin/fancybox/js/jquery.mousewheel-3.0.2.pack.js" type="text/javascript"></script>
    <script src="/plugin/fancybox/js/jquery.fancybox-1.3.1.js" type="text/javascript"></script>
    <link href="/plugin/fancybox/css/jquery.fancybox-1.3.1.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
        $(document).ready(function () {
            $("a#example1").fancybox({
                'transitionIn': 'elastic',
                'transitionOut': 'elastic',
                'titlePosition': 'over'
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <a id="example1" title="cái ảnh này được đấy" href="http://goShop.goonline.vn/photoservices/product/vtconline/29/3a121b14-26d4-47c2-9243-f49e3d0340be.jpg.126.96.cache"><img height="100" width="100" alt="example1" src="http://goShop.goonline.vn/photoservices/product/vtconline/29/3a121b14-26d4-47c2-9243-f49e3d0340be.jpg.126.96.cache" /></a>
    </form>
</body>
</html>