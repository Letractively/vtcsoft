<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ucHeader.ascx.cs" Inherits="UserControl_ucHeader" %>
<div id="header">    
    <div id="logo">
        <h1>
            <a href="/index.htm" title="Hệ thống quản trị WEBSOFT">                
                HỆ THỐNG QUẢN TRỊ WEBSOFT
            </a>
        </h1>
    </div>    
    <ul id="user">
        <li class="first"><a href="">Tài khoản cá nhân</a></li>
        <li><a href="">Đổi mật khẩu</a></li>
        <li>            
            <asp:LinkButton ID="btnLogout" runat="server" Text="Thoát" onclick="btnLogout_Click"></asp:LinkButton>
        </li>
        <li class="highlight last"><a href="">Trang chủ</a></li>
    </ul>    
    <div id="header-inner">
        <div id="home">
            <a href="" title="Home"></a>
        </div>        
        <div class="corner tl">
        </div>
        <div class="corner tr">
        </div>
    </div>
</div>
