<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.IO;
using System.Web;

public class UploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
    }
    //    var type = context.Request.QueryString["t"] ?? string.Empty;
    //    switch (type)
    //    {
    //        case "UploadIconFunction":
    //            UploadIconFunction(context);
    //            break;
    //        case "UploadImagesNews":
    //            UploadImagesNews(context);
    //            break;
    //        case "UploadAlbumImage":
    //            UploadAlbumImage(context);
    //            break;            
    //        case "UploadImagesHistoryDay":
    //            UploadImagesHistoryDay(context);
    //            break;
    //        case "UploadImagesCemetery":
    //            UploadImagesCemetery(context);
    //            break;
    //        case "UploadImagesIntroduction":
    //            UploadImagesIntroduction(context);
    //            break;
    //        case "UploadImagesMartyr":
    //            UploadImagesMartyr(context);
    //            break;
    //        case "UploadImagesTomb":
    //            UploadImagesTomb(context);
    //            break;
    //    }
    //}
    //private void UploadIconFunction(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuIcon"];
    //    var Name = context.Request.Params["fuIcon"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage =  VTCO.Config.Global.Settings.ResourcePhotoIcon;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch (Exception ex)
    //    {

    //        strReturn = ex.Message;
    //    }
    //    strReturn += imageName;
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(strReturn);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh tin tức
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadImagesNews(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuImage"];
    //    var Name = context.Request.Params["fuImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoNews;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if(strReturn!="-1")
    //    strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathNews };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh của alubum ảnh nghĩa trang
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadAlbumImage(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuImage"];
    //    var Name = context.Request.Params["fuImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoAlbumImage;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if (strReturn != "-1")
    //        strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathAlbumImage };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh ngày này năm ấy
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadImagesHistoryDay(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuImage"];
    //    var Name = context.Request.Params["fuImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoHistoryDay;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if (strReturn != "-1")
    //        strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathHistoryDay };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh nghĩa trang
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadImagesCemetery(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuCemeteryImage"];
    //    var Name = context.Request.Params["fuCemeteryImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoCemetery;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if (strReturn != "-1")
    //        strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathCemetery };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh địa phương
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadImagesIntroduction(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuIntroductionImage"];
    //    var Name = context.Request.Params["fuIntroductionImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoIntroduction;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if (strReturn != "-1")
    //        strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathIntroduction };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh liệt sĩ
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadImagesMartyr(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuMartyrImage"];
    //    var Name = context.Request.Params["fuMartyrImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoMartyr;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if (strReturn != "-1")
    //        strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathMartyr };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}
    ///// <summary>
    ///// Ảnh ngôi mộ
    ///// </summary>
    ///// <param name="context"></param>
    //private void UploadImagesTomb(HttpContext context)
    //{
    //    var posted = context.Request.Files["fuTombImage"];
    //    var Name = context.Request.Params["fuTombImage"];
    //    if (posted == null) return;
    //    if (posted.FileName == "") return;
    //    var pathStoredImage = VTCO.Config.Global.Settings.ResourcesPhotoTomb;
    //    var imageName = Guid.NewGuid() + Path.GetFileName(posted.FileName);
    //    var filePath = pathStoredImage + imageName;
    //    var strReturn = string.Empty;
    //    try
    //    {
    //        posted.SaveAs(filePath);
    //    }
    //    catch
    //    {
    //        strReturn = "-1";
    //    }
    //    if (strReturn != "-1")
    //        strReturn += imageName;
    //    var objImage = new { Names = strReturn, SourceImage = VTCO.Config.Global.Settings.PathTomb };
    //    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(objImage);
    //    context.Response.ContentType = "text/html";
    //    context.Response.Write(jsonString);
    //}    

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}