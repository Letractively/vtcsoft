<%@ WebHandler Language="C#" Class="HandlerAdmin" %>

using System;
using System.Web;
using WebSoft.DBO;
using WebSoft.BLL;
public class HandlerAdmin : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string type = context.Request.QueryString["t"] ?? string.Empty;
        switch (type)
        {
            case "getListAdmin":
                GetListAdmin(context);
                break;
            default:
                break;
        }
    }

    public void GetListAdmin(HttpContext context)
    {
        var adminList = AdminBLL.Instance.GetAdminList();
        string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(adminList);
        context.Response.ContentType = "application/json";
        context.Response.Write(jsonString);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}