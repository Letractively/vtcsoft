using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VTCO.Config
{
    public class Constants
    {
        // Khai báo các Connection String key liên quan đến Solution

        #region ConnectionString Constant
        public const string CONNECTION_STRING_WEBSOFT = "CONNECTION_STRING_WEBSOFT";
        public const string CONNECTION_STRING_ADMIN_WEBSOFT = "CONNECTION_STRING_ADMIN_WEBSOFT";

        public const string CONNECTION_STRING_WEBSOFT_NEW = "WebSoft.ConnectString";
        #endregion

        #region COOKIE cho Admin
        public const string COOKIE_ADMIN_ID = "ADMIN_ID";
        public const string COOKIE_ADMIN_PASS = "ADMIN_PASS";
        public const string COOKIE_ADMIN_PAYGATE_NAME = "PAYGATE_NAME";        
        public const string COOKIE_ADMIN_FULL_NAME = "ADMIN_FULL_NAME";
        public const string COOKIE_ADMIN_PERMISSION = "ADMIN_PERMISSION";
        public const string COOKIE_ADMIN_IP_ADDRESS = "IP_ADDRESS";        
        
        #endregion

        #region COOKIE cho User WS
        public const string COOKIE_USER_ID = "USER_ID";//Mã người dùng        
        public const string COOKIE_USER_PAYGATE_NAME = "USER_PAYGATE_NAME";//Tên Paygate
        public const string COOKIE_USER_IP = "USER_IP";//Địa chỉ IP người dùng        
        #endregion        

        #region AppSetting
        public const string WEB_ROOT = "WEB_ROOT";//Địa chỉ Web
        public const string WEB_ROOT_AU = "WEB_ROOT_AU";//Địa chỉ Web Au
        public const string WEB_ROOT_TRUTIEN = "WEB_ROOT_TRUTIEN";//Địa chỉ Web TruTien
        public const string WEB_PATH_ROOT = "WEB_PATH_ROOT";//Đường dẫn Web
        public const string WEB_TITLE = "WEB_TITLE";//Tiêu đề Web
        public const string WEB_KEYWORD = "WEB_KEYWORD";//Từ khóa Web
        public const string WEB_DESCRIPTION = "WEB_DESCRIPTION";//Mô tả Web

        public const string COOKIE_DOMAIN = "COOKIE_DOMAIN";
        public const string COOKIE_EXPIRES = "COOKIE_EXPIRES";
        public const string IS_HACK_LOGIN = "IS_HACK_LOGIN";                        
        public const string LOG_PATH = "LOG_PATH";                        

        #endregion        
    }

    public class LogActionConstants
    {
        /// <summary>
        /// Login
        /// </summary>
        public const char Login = 'L';
        /// <summary>
        /// Thêm mới
        /// </summary>
        public const char Add = 'A';
        /// <summary>
        /// Sửa
        /// </summary>
        public const char Modify = 'M';
        /// <summary>
        /// Xóa
        /// </summary>
        public const char Delete = 'D';
        /// <summary>
        /// Cập nhật trạng thái
        /// </summary>
        public const char ChangeStatus = 'C';
    }
}
