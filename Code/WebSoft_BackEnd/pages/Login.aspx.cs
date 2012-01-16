using System;
using VTCO.Utils;
using VTCO.Config;
using WebSoft.BLL;
public partial class Pages_Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
    protected void butLogin_Click(object sender, EventArgs e)
    {
        string userName = txtUserName.Text.Trim();
        string password = txtPassword.Text.Trim();
        //string password = VTCO.Utils.Encryption.GetMD5(txtPassword.Text.Trim());
        if(AdminBLL.Instance.AminCheckLogin(userName,password))
        {
            Response.Redirect("/index.htm");
        }
        else{
            divMessagError.Visible = true;            
        }        
    }
}