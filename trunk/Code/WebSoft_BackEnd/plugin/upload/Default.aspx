<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="plugin_upload_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="/js/framework/jquery-1.6.min.js" type="text/javascript"></script>
    <script src="/plugin/upload/js/jquery.form.js" type="text/javascript"></script>
    <script type="text/javascript" src="/plugin/editor/tiny_mce/tiny_mce.js"></script>
    <link href="/css/popup.css" rel="stylesheet" type="text/css" />
    <script src="/js/common/Loading.js" type="text/javascript"></script>
    <title></title>
    <script type="text/javascript">
        // wait for the DOM to be loaded
        $(document).ready(function () {
            tinyMCE.init({
                // General options
                mode: "exact",
                elements: "txtDescription",
                theme: "advanced",
                plugins: "pagebreak,table,advhr,advlink,inlinepopups,preview,searchreplace,contextmenu,paste,fullscreen,noneditable,visualchars",
                language: "vi",
                remove_script_host: false,
                relative_urls: false,

                // Theme options
                theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,fontselect,fontsizeselect",
                theme_advanced_buttons2: "cut,copy,paste,pastetext,|,search,replace,|,bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,cleanup,|,preview,|,forecolor,backcolor",
                theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,advhr,|,fullscreen",
                theme_advanced_buttons4: "",
                theme_advanced_toolbar_location: "top",
                theme_advanced_toolbar_align: "left",
                theme_advanced_statusbar_location: "",
                theme_advanced_resizing: false
            });
            $('#btnUpload').live('click', function () {
                
                $("#form1").ajaxForm({
                    url: '/plugin/upload/handler/Upload.ashx?t=UploadImage',
                    type: 'post',
                    dataType: 'json',
                    beforeSubmit: function () {
                        _name = $('#txtImageName').val();
                       Loading.showProcess();
                    },
                    success: function (result) {
                        Loading.closeProcess();
                        alert(result);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        Loading.closeProcess();
                    },
                    clearForm: true,
                    resetForm: true
                });
                tinyMCE.activeEditor.setContent('he he');
                if ($('#txtImageName').val() == '') {
                    alert('Tên ảnh không được rỗng');
                    return;
                }
                $('#form1').submit();
            });
            
        }); 
    </script>
</head>
<body>
    <form id="form1">
        <input type="file" name="uploadFile" id="uploadFile" />
        <input type="text" id="txtImageName" name="txtImageName" />
        <input id="btnUpload" type="button" value="Upload" />
        
    </form>
    <input type="text" id="txtDescription" style="width: 605px; height: 300px;" />  
</body>
</html>
