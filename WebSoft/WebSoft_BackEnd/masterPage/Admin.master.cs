using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using VTCO.Config.Enums;
using VTCO.Utils;

public partial class MasterPage_Admin : System.Web.UI.MasterPage
{
    protected void Page_Init(object sender, EventArgs e)
    {
        if (!VTCO.Utils.AdminUtils.IsLogin)
        {
            Response.Redirect("/login/");
        }
    }
    public MainMenuEnum MainMenuCurrent
    {
        set
        {
            ucMenuPanel.MainMenuCurrent = value;
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogout_Click(object sender, EventArgs e)
    {
        AdminUtils.Logout();
        Response.Redirect("/login/");
    }
}
