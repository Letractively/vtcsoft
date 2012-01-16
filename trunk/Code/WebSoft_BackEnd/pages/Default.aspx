<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/Admin.master" AutoEventWireup="true"
    CodeFile="Default.aspx.cs" Inherits="Pages_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="right">
        <!-- table -->
        <div class="box">
            <!-- box / title -->
            <div class="title">
                <h5>
                    Products</h5>
                <div class="search">                    
                    <div class="input">
                        <input id="search" name="search" type="text" />
                    </div>                     
                </div>
            </div>
            <!-- end box / title -->
            <div class="table">                
                <table>
                    <thead>
                        <tr>
                            <th class="left">
                                Title
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Added
                            </th>
                            <th>
                                Category
                            </th>
                            <th class="selected last">
                                <input class="checkall" type="checkbox">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="title">
                                24" LED Monitor
                            </td>
                            <td class="price">
                                $110.00
                            </td>
                            <td id="dp1320293052662" class="date">
                                April 25th, 2010 at 4:15 PM
                            </td>
                            <td class="category">
                                Monitors
                            </td>
                            <td class="selected last">
                                <input type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                27" LCD Flat Panel
                            </td>
                            <td class="price">
                                $150.00
                            </td>
                            <td id="dp1320293052663" class="date">
                                April 25th, 2010 at 4:15 PM
                            </td>
                            <td class="category">
                                Monitors
                            </td>
                            <td class="selected last">
                                <input type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                6GB 240-Pin DDR3 SDRAM DDR3 1600
                            </td>
                            <td class="price">
                                $80.00
                            </td>
                            <td id="dp1320293052664" class="date">
                                April 25th, 2010 at 4:15 PM
                            </td>
                            <td class="category">
                                Memory
                            </td>
                            <td class="selected last">
                                <input type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                500GB 7200 RPM 16MB Cache SATA 3.0Gb/s 3.5
                            </td>
                            <td class="price">
                                $92.00
                            </td>
                            <td id="dp1320293052665" class="date">
                                April 25th, 2010 at 4:15 PM
                            </td>
                            <td class="category">
                                Hard Drives
                            </td>
                            <td class="selected last">
                                <input type="checkbox">
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                2GB 240-Pin DDR3 SDRAM DDR3 1600
                            </td>
                            <td class="price">
                                $52.00
                            </td>
                            <td id="dp1320293052666" class="date">
                                April 25th, 2010 at 4:15 PM
                            </td>
                            <td class="category">
                                Memory
                            </td>
                            <td class="selected last">
                                <input type="checkbox">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- pagination -->
                <div class="pagination pagination-left">
                    <div class="results">
                        <span>showing results 1-10 of 207</span>
                    </div>
                    <ul class="pager">
                        <li class="disabled">« prev</li>
                        <li class="current">1</li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href="">4</a></li>
                        <li><a href="">5</a></li>
                        <li class="separator">...</li>
                        <li><a href="">20</a></li>
                        <li><a href="">21</a></li>
                        <li><a href="">next »</a></li>
                    </ul>
                </div>
                <!-- end pagination -->
                <!-- table action -->
                <div class="action">
                    <select style="display: none;" name="action">
                        <option selected="selected" value="" class="locked">Set status to Deleted</option>
                        <option value="" class="unlocked">Set status to Published</option>
                        <option value="" class="folder-open">Move to Category</option>
                    </select>                    
                </div>                                
            </div>
        </div>
    </div>
</asp:Content>
