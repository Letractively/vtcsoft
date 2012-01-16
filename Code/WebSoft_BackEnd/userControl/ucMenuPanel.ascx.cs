using System;
using VTCO.Config.Enums;
using WebSoft.DBO;
using WebSoft.BLL;
using System.Linq;
using System.Collections.Generic;
using VTCO.Library;

public partial class UserControl_ucMenuPanel : System.Web.UI.UserControl
{        
    //public ClassExtend<int,ClassExtend<uspFunctionGetAllByTreeResult,uspFunctionGetAllByTreeResult>> objFunctionInfo;
    public string StrMainMenu = string.Empty;
    private int m_level = 0;
    private uspAdminGetListFunctionAccess_Result m_urlLevel1 = null;
    private uspAdminGetListFunctionAccess_Result m_urlLevel2 = null;
    private uspAdminGetListFunctionAccess_Result m_urlLevel3 = null;
    public MainMenuEnum MainMenuCurrent
    {
        get
        {
            return (MainMenuEnum)(ViewState["MainMenuCurrent"] ?? MainMenuEnum.Home);
        }
        set
        {
            ViewState["MainMenuCurrent"] = value;
        }


    }

    protected void Page_Load(object sender, EventArgs e)
    {
    //    CtrAdmin ctrAdmin = new CtrAdmin();
    //    objFunctionInfo = ctrAdmin.GetListFunctionByAdmin();

        var currentUrl = Request.Url.AbsolutePath;
        var listFunctions = FunctionBLL.Instance.GetListFunctionAllowAdminAccess(VTCO.Utils.AdminUtils.AdminID);
        var currentFunction = listFunctions.FirstOrDefault(c => c.URL.Equals(currentUrl, StringComparison.OrdinalIgnoreCase));

        if (currentFunction != null)
        {
            var function1 = listFunctions.FirstOrDefault(c => c.FunctionID.Equals(currentFunction.ParrentID));
            if (function1 == null)
            {
                m_urlLevel1 = currentFunction;
            }
            else
            {
                var function2 = listFunctions.FirstOrDefault(c => c.FunctionID.Equals(function1.ParrentID));
                if (function2 == null)
                {
                    m_urlLevel1 = function1;
                    m_urlLevel2 = currentFunction;
                }
                else
                {
                    m_urlLevel1 = function2;
                    m_urlLevel2 = function1;
                    m_urlLevel3 = currentFunction;
                }
            }
        }

        int? id = null;
        StrMainMenu = GetMenuString(id, listFunctions, 1);

        var func1 = listFunctions.FirstOrDefault(c => c.URL.Equals("", StringComparison.OrdinalIgnoreCase));
    }

    private string GetMenuString(int? parentId, IEnumerable<uspAdminGetListFunctionAccess_Result> listMenu, int level)
    {
        m_level++;
        if (m_level > 3)
        {
            m_level--;
            return string.Empty;
        }
        var str = "";
        var lstTemp = listMenu.Where(c => c.ParrentID.Equals(parentId))
            .OrderBy(o => o.Order);

        var functionParent = listMenu.FirstOrDefault(c => c.FunctionID.Equals(parentId));

        if (lstTemp.Count() == 0)
        {
            m_level--;
            return str;
        }

        switch (level)
        {
            case 1:

                str += "<div id='menu'>";
                break;
            case 2:
                if ((m_urlLevel1 != null) && (functionParent.FunctionID == m_urlLevel1.FunctionID))
                {
                    str += string.Format("<ul class='opened' id='menu-{0}'>", Lib.GetUrlText(functionParent.Name));
                }
                else
                {
                    str += string.Format("<ul class='closed' id='menu-{0}'>",Lib.GetUrlText(functionParent.Name));
                }


                break;
            case 3:
                str += "<ul class='collapsed'>";
                break;
        }

        foreach (var item in lstTemp)
        {
            switch (level)
            {
                case 1:
                    str += string.Format("<h6 class='{0}' id='h-menu-{1}'><a href='{2}'><span>{3}</span></a></h6>",
                                         (m_urlLevel1 != null) && (item.FunctionID == m_urlLevel1.FunctionID) ? "selected" : "",
                                         Lib.GetUrlText(item.Name),
                                         string.IsNullOrEmpty(item.URL) ? "#" + Lib.GetUrlText(item.Name) : item.URL,
                                         item.Name);
                    str += GetMenuString(item.FunctionID, listMenu, level + 1);
                    break;
                case 2:

                    if (listMenu.Count(c => c.ParrentID.Equals(item.FunctionID)) == 0)
                    {
                        if ((m_urlLevel2 != null) && (item.FunctionID == m_urlLevel2.FunctionID))
                        {
                            str += "<li class='selected'>";
                        }
                        else
                        {
                            str += "<li>";
                        }
                        str += string.Format("<a href='{0}'>{1}</a>",
                                        item.URL,
                                        item.Name);

                    }
                    else
                    {
                        str += "<li class='collapsible'>";
                        str += string.Format("<a class='{0}' href='{1}'>{2}</a>",
                                             (m_urlLevel2 != null) && (item.FunctionID == m_urlLevel2.FunctionID) ? "collapsible minus" : "collapsible plus",
                                             string.IsNullOrEmpty(item.URL) ? "#" : item.URL,
                                             item.Name);
                        str += GetMenuString(item.FunctionID, listMenu, level + 1);
                    }
                    str += "</li>";
                    break;
                case 3:
                    str += string.Format("<li class='{0}'><a href='{1}'>{2}</a></li>",
                                         "selected2",
                                         item.URL,
                                         item.Name);
                    break;
            }

        }

        switch (level)
        {
            case 1:
                str += "</div>";
                break;
            case 2:
                str += "</ul>";
                break;
            case 3:
                str += "</ul>";
                break;
        }

        m_level--;
        return str;
    }
}