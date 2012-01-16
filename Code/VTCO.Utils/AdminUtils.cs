using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VTCO.Config;
using System.Web;
using VTCO.Library;

namespace VTCO.Utils
{
    public class AdminUtils
    {

        /// <summary>
        /// Lấy AdminID 
        /// </summary>
        public static int AdminID
        {
            get
            {
                try
                {
                    return Convert.ToInt32(VTCO.Utils.CookieHelper.GetCookie(Constants.COOKIE_ADMIN_ID));
                }
                catch { }
                return -1;
            }
            set
            {
                VTCO.Utils.CookieHelper.SetCookie(Constants.COOKIE_ADMIN_ID, value.ToString());
            }
        }        

        /// <summary>
        /// Lấy tên đầy đủ của Admin
        /// </summary>
        public static string FullName
        {
            get
            {
                return VTCO.Utils.CookieHelper.GetCookie(Constants.COOKIE_ADMIN_FULL_NAME);
            }
            set
            {
                VTCO.Utils.CookieHelper.SetCookie(Constants.COOKIE_ADMIN_FULL_NAME, value);
            }
        }

        /// <summary>
        /// Lấy xâu quyền của Admin
        /// </summary>
        public static string Permission
        {
            get
            {
                return VTCO.Utils.CookieHelper.GetCookie(Constants.COOKIE_ADMIN_PERMISSION);
            }
            set
            {
                VTCO.Utils.CookieHelper.SetCookie(Constants.COOKIE_ADMIN_PERMISSION, value);
            }
        }

        /// <summary>
        /// Lấy IPAdress
        /// </summary>
        public static string IpAddress
        {
            get
            {
                return VTCO.Utils.CookieHelper.GetCookie(Constants.COOKIE_ADMIN_IP_ADDRESS);
            }
            set
            {
                VTCO.Utils.CookieHelper.SetCookie(Constants.COOKIE_ADMIN_IP_ADDRESS, value);
            }
        }
        
        /// <summary>
        /// Dùng để hack cho việc đăng nhập
        /// </summary>
        public static void HackLogin()
        {
            AdminID = 1;            
            FullName = "Phạm Văn Sơn";
            Permission = string.Empty;
        }

        /// <summary>
        /// Kiểm tra login chưa
        /// </summary>
        public static bool IsLogin
        {
            get
            {
                return !((VTCO.Utils.CookieHelper.GetCookie(Constants.COOKIE_ADMIN_ID) == string.Empty)
                    || (VTCO.Utils.CookieHelper.GetCookie(Constants.COOKIE_ADMIN_PAYGATE_NAME) == string.Empty));
            }
        }

        /// <summary>
        /// Set Cookie
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="permission"></param>
        public static void Login(int adminID, string userName)
        {
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_ID, adminID.ToString());
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_PAYGATE_NAME, userName.ToString());
        }

        /// <summary>
        /// Clear Cookie
        /// </summary>
        public static void Logout()
        {
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_ID, string.Empty);
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_PAYGATE_NAME, string.Empty);            
        }        
    }
}
