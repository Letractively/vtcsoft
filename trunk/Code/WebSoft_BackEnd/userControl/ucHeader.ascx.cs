using System;
using VTCO.Utils;

public partial class UserControl_ucHeader : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogout_Click(object sender, EventArgs e)
    {
        AdminUtils.Logout();       
        Response.Redirect("/login/");
    }
}