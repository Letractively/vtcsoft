<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="plugin_datepicker_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<style>
    body
    {
        font-family:Tahoma, sans-serif;
	    font-size:11px;
    }
</style>    
    
    <link href="/plugin/datepicker/css/jquery.ui.core.css" rel="stylesheet" type="text/css" />
    <link href="/plugin/datepicker/css/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
    <link href="/plugin/datepicker/css/jquery.ui.datepicker.css" rel="stylesheet" type="text/css" />
    <script src="/js/framework/jquery-1.4.1.min.js" type="text/javascript"></script>
    <script src="/js/framework/jquery.ui.core.js" type="text/javascript"></script>
    <script src="/plugin/datepicker/js/jquery.ui.datepicker.js" type="text/javascript"></script>

    <title></title>
    <script type="text/javascript">
        $(function () {
            $("#datepicker").datepicker({
                changeMonth: true,
                changeYear: true
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    Date: <input type="text" id="datepicker">
    </div>
    </form>
</body>
</html>
