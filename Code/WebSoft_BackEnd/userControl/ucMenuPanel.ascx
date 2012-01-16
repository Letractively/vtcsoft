<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ucMenuPanel.ascx.cs" Inherits="UserControl_ucMenuPanel" %>
<%=StrMainMenu%>
<%--    <div id="menu">
    <%for (int i = 0; i < objFunctionInfo.TotalRecord; i++)
      {%>
        <h6 id="h-menu-products" class="selected">
            <a href="#products"><span><%=objFunctionInfo.Items[i].Info.Name%></span></a>
      </h6>      
      <%foreach (var item in objFunctionInfo.Items[i].Items)
        { %>
        <ul id="menu-products" class="opened">
            <li class="selected"><a href="<%=item.URL %>"><%=item.Name %></a></li>                          
        </ul>
    <%}}%>              
    </div>  --%>  
