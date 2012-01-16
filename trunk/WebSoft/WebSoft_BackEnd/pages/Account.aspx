<%@ Page Title="Tài khoản" Language="C#" MasterPageFile="~/MasterPage/Admin.master"
    AutoEventWireup="true" CodeFile="Account.aspx.cs" Inherits="Pages_Account" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/scripts/pages/Account.js" type="text/javascript"></script>
    <script src="/scripts/popup/PopAccount.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            Pages_Account.PageLoad();
        });
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolderMainAction" runat="Server">
    <ul id="quick">
        <li><a title="Thêm mới" href="javascript:;" id="aAddAdmin" style="_width:120px"><span class="icon">
            <img alt="Thêm mới" src="/Images/icons/create-icon.png" /></span> <span>Thêm mới</span></a>
        </li>
    </ul>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="right">
        <div class="box">            
            <div class="title">
                <h5>
                    Danh sách tài khoản
                </h5>
            </div>                        
            <div class="table" id="divAdminList">
            </div>            
        </div>
    </div>
</asp:Content>
