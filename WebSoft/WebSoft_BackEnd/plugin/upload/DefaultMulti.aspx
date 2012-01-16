<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DefaultMulti.aspx.cs" Inherits="plugin_upload_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="/js/framework/jquery-1.6.min.js" type="text/javascript"></script>
    <script src="/plugin/upload/js/jquery.form.js" type="text/javascript"></script>
    <script src="/plugin/upload/js/multiImageUpload.js" type="text/javascript"></script>
    <script type="text/javascript" src="/plugin/editor/tiny_mce/tiny_mce.js"></script>
    <link href="/css/popup.css" rel="stylesheet" type="text/css" />
    <script src="/js/popup/Loading.js" type="text/javascript"></script>
    <title></title>
    <style type="text/css">
        .divFile
        {
            clear: both;
            padding: 10px;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            $('#btnUpload').live('click', function () {

                $("#form1").ajaxForm({
                    url: '/plugin/upload/handler/Upload.ashx?t=UploadImageMulti',
                    type: 'post',
                    dataType: 'json',
                    beforeSubmit: function () {
                        Loading.showProcess();
                    },
                    success: function (result) {
                        Loading.closeProcess();
                        document.getElementById("listFileUpload").innerHTML = "<div><input id=\"my_file_element\" type=\"file\" /></div>";
                        multi_selector = new MultiSelector(3);                        
                        multi_selector.addElement(document.getElementById('my_file_element'));
                        alert(result);

                    },
                    error: function (xhr, textStatus, errorThrown) {
                        Loading.closeProcess();
                    },
                    clearForm: true,
                    resetForm: true
                });
                $('#form1').submit();

            });
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <!-- This is the form -->
    <!-- The file element -- NOTE: it has an ID -->
    <div id="listFileUpload">
        <div>
            <input id="my_file_element" type="file" />
        </div>
    </div>
    <input type="button" value=" Upload " id="btnUpload" />
    <script type="text/javascript">
	        //<!-- Số file tối đa -->
	        var multi_selector = new MultiSelector(3);
	        //<!-- Pass in the file element -->
	        multi_selector.addElement( document.getElementById( 'my_file_element' ) );
    </script>
    </form>
</body>
</html>
