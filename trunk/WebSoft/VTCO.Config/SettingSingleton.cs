//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2008.11.08
// Description: Lấy thông tin từ File Web.Config
//
using System.Linq;
using System.Configuration;
using System.Collections.Specialized;

namespace VTCO.Config
{
    public sealed class SettingSingleton
    {

        #region Process Method
        /// <summary>
        /// Lấy giá trị của Key trong AppSetting
        /// </summary>
        /// <param name="_Key">Key</param>
        /// <returns>Return Null nếu không có key</returns>
        public string GetAppKeyValue(string _Key)
        {
            NameValueCollection appsettings = ConfigurationManager.AppSettings;
            if (appsettings == null) return null;
            if (appsettings.AllKeys.Contains(_Key))
            {
                return appsettings[_Key];
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Lấy xâu kết nối trong file Web.Config
        /// </summary>
        /// <param name="_Key">key</param>
        /// <returns>Return null nếu không có key</returns>
        public string GetConnectionStringKeyValue(string _Key)
        {
            try
            {
                return ConfigurationManager.ConnectionStrings[_Key].ConnectionString;
            }
            catch { }
            return null;
        }
        #endregion Process Method

        #region Attribute Connection String
        public string ConnectionStringWebSoft
        {
            get
            {
                //RijndaelEnhanced obj = new RijndaelEnhanced("AUShop", "@1B2c3D4e5F6g7H8");
                //return obj.Decrypt(GetConnectionStringKeyValue(Constants.CONNECTION_STRING_WEBSOFT));
                return GetConnectionStringKeyValue(Constants.CONNECTION_STRING_WEBSOFT);
            }
        }
       
        public string ConnectionStringAdminWebSoft
        {
            get
            {
                //RijndaelEnhanced obj = new RijndaelEnhanced("AdminShop", "@1B2c3D4e5F6g7H8");
                //return obj.Decrypt(GetConnectionStringKeyValue(Constants.CONNECTION_STRING_ADMIN_WEBSOFT));
                return GetConnectionStringKeyValue(Constants.CONNECTION_STRING_ADMIN_WEBSOFT);
            }
        }

        public string ConnectionStringWebSoftNew
        {
            get
            {
                return GetConnectionStringKeyValue(Constants.CONNECTION_STRING_WEBSOFT_NEW);
            }
        }
        #endregion

        #region AppSetting
        /// <summary>
        /// Địa chỉ Web
        /// </summary>
        public string WEB_ROOT
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_ROOT);
            }
        }
       
        /// <summary>
        /// Đường dẫn Web
        /// </summary>
        public string WEB_PATH_ROOT
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_PATH_ROOT);
            }
        }

        /// <summary>
        /// Tiêu đề Web
        /// </summary>
        public string WEB_TITLE
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_TITLE);
            }
        }

        /// <summary>
        /// Từ khóa Web
        /// </summary>
        public string WEB_KEYWORD
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_KEYWORD);
            }
        }

        /// <summary>
        /// Mô tả Web
        /// </summary>
        public string WEB_DESCRIPTION
        {
            get
            {
                return GetAppKeyValue(Constants.WEB_DESCRIPTION);
            }
        }

        public string COOKIE_DOMAIN
        {
            get
            {
                return GetAppKeyValue(Constants.COOKIE_DOMAIN);
            }
        }

        /// <summary>
        /// Thời gian hết hạn Cookie
        /// </summary>
        public string COOKIE_EXPIRES
        {
            get
            {
                return GetAppKeyValue(Constants.COOKIE_EXPIRES);
            }
        }

        /// <summary>
        /// Set cứng đăng nhập tài khoản
        /// </summary>
        public bool IS_HACK_LOGIN
        {
            get
            {
                if (GetAppKeyValue(Constants.IS_HACK_LOGIN) == "1")
                {
                    return true;
                }
                return false;
                
            }
        }
      
        /// <summary>
        /// Đường dẫn log hệ thống
        /// </summary>
        public string LOG_PATH
        {
            get {return GetAppKeyValue(Constants.LOG_PATH); }
        }
                              

        /// <summary>
        /// Pass admin hệ thống
        /// </summary>
        public string ADMIN_PASS
        {
            get
            {
                RijndaelEnhanced obj = new RijndaelEnhanced("ADMINPASS", "@1B2c3D4e5F6g7H8");
                return obj.Decrypt(GetAppKeyValue(Constants.COOKIE_ADMIN_PASS));
            }
        }
        #endregion                    
    }
}
