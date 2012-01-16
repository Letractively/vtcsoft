<%@ WebHandler Language="C#" Class="HandlerImageManager" %>
//
// Author: duong.le
// Creare Date: 2010-07-01
// Description: Xử lý các nghiệp vụ quản lý ảnh trong plugin ImageManager
//
using System.Web;
using System.IO;
using VTCO.Config;
using VTCO.Utils;
using System.Linq;
using System.Collections.Generic;
public class HandlerImageManager : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {

        //if (!VTCO.Utils.UserUtils.IsLogin) return;
        //if (VTCO.Utils.UserUtils.LoginType != LoginTypeEnum.ShopOwner) return;

        string strAction = context.Request.QueryString["action"] ?? string.Empty;

        // Lấy danh sách ảnh
        if (strAction == "get")
        {
            var imageList = GetImages();

            // Convert đối tượng sang chuỗi json
            string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(imageList);

            // Đẩy ra context
            context.Response.ContentType = "application/json";
            context.Response.Write(jsonString);
        }

        // Xóa ảnh
        else if (strAction == "del")
        {
            string strName = context.Request.QueryString["name"] ?? string.Empty;

            int result = DelImage(strName);

            context.Response.ContentType = "application/json";
            context.Response.Write(result);

        }
        else if (strAction == "upload")
        {
            HttpPostedFile postFile = context.Request.Files["Filedata"];
            string name = context.Request.Params["txtImageName"] ?? string.Empty;            
            //int result = Upload(postFile,name);
            int result = 0;
            context.Response.ContentType = "text/plain";
            if (result == 1)
            {
                string strExt = postFile.FileName.Substring(postFile.FileName.LastIndexOf(".")).ToLower();
                context.Response.Write(result + "|" + name + strExt);
            }
            else
            {
                context.Response.Write(result);
            }
        }
    }


    /// <summary>
    /// Upload ảnh
    /// </summary>
    /// <param name="postFile"></param>
    /// <param name="strName"></param>
    /// <returns>1: Thành công, -1: Sai định dạnh cho phép, -2: Sai loại ảnh cho phép</returns>
    //private static int Upload(HttpPostedFile postFile, string strName)
    //{
    //    var strExt = postFile.FileName.Substring(postFile.FileName.LastIndexOf(".")).ToLower();
    //    const string strExts = ".jpg|.png|.gif";
    //    if (strExts.IndexOf(strExt) == -1)
    //    {
    //        return -1;
    //    }
    //    var strKeyCache = string.Empty;
    //    string path = Global.Settings.ResourcesPhotoContent;
    //    //strKeyCache = VTCO.Config.Enums.PrefixCacheEnum.News.ToString() + "_" + UserUtils.ShopName;
            

    //    if (Directory.Exists(path))
    //    {
    //        Directory.CreateDirectory(path);
    //    }
            
    //    string fileName = path + strName + strExt;
    //    int i = 1;
    //    while (File.Exists(fileName))
    //    {
    //        fileName = path + strName +(i++)+ strExt;
    //    }
    //    postFile.SaveAs(fileName);
    //    // HACK: RemoveCahe
    //    //if (VTCO.Utils.Caching.ExistCache(strKeyCache))
    //    //{
    //    //    VTCO.Utils.Caching.CacheRemove(strKeyCache);
    //    //}
    //    return 1;
    //}


    /// <summary>
    /// Xóa ảnh
    /// </summary>
    /// <param name="strName"></param>
    /// <returns>1: Thành công, -1: Không tồn tại File, -2: Không tồn tại loại ảnh</returns>
    private int DelImage(string strName)
    {
        string strKeyCache = string.Empty;

        //var path = Global.Settings.ResourcesPhotoContent;
        var path = "";        

        path = path + strName;
        if (File.Exists(path))
        {
            File.Delete(path);            
            return 1;
        }
        else
        {
            return -1;
        }
    }

    /// <summary>
    /// Lấy danh sách ảnh
    /// </summary>
    /// <returns></returns>
    private List<WebSoft.Entity.Image> GetImages()
    {
        var listImage = new List<WebSoft.Entity.Image>();

        var strKeyCache = string.Empty;
        string strURL = string.Empty;

        //string path = Global.Settings.ResourcesPhotoContent;        
        //strURL = Global.Settings.PathContent; 
        string path = "";
        strURL = "";

        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        var filePaths = Directory.GetFiles(path, "*.*", SearchOption.TopDirectoryOnly)
        .Where(s => s.EndsWith(".gif") || s.EndsWith(".jpg") || s.EndsWith(".png"));
        var i = 1;
        foreach (var filePath in filePaths)
        {
            var fileInfo = new FileInfo(filePath);
            var objImage = new WebSoft.Entity.Image();
            objImage.Name = fileInfo.Name;
            objImage.Size = (fileInfo.Length / 1024.0).ToString("0.0");
            objImage.URL = strURL + objImage.Name;
            objImage.Id = "img_" + i;
            listImage.Add(objImage);
            i++;
        }

        return listImage;
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}