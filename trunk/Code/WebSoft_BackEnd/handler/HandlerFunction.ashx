<%@ WebHandler Language="C#" Class="HandlerFunction" %>

using System;
using System.Web;

public class HandlerFunction : IHttpHandler {
        
    public void ProcessRequest (HttpContext context) {
        string type = context.Request.QueryString["t"]?? string.Empty;
        switch (type)
        {
            case "GetListFunction":
                GetListFunction(context);
                break;            
        }        
    }

    public void GetListFunction(HttpContext context)
    {
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}