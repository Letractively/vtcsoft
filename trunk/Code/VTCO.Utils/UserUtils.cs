//
// Description: Tiện ích tương tác với các tham số cơ bản của User
//

using VTCO.Config;
using System.Web;
using System;

namespace VTCO.Utils
{
    public class UserUtils
    {
        /// <summary>
        /// Kiểm tra login chưa
        /// </summary>
        public static bool IsLogin
        {
            get
            {
                return !((User_ID == -1)                    
                    || (User_Paygate_Name == string.Empty));
            }
        }

        #region User
        /// <summary>
        /// Mã người dùng
        /// </summary>
        public static int User_ID
        {
            get
            {
                try
                {
                    return Convert.ToInt32(CookieHelper.GetCookie(Constants.COOKIE_USER_ID));
                }
                catch { }
                return -1;
            }
            set
            {
                CookieHelper.SetCookie(Constants.COOKIE_USER_ID, value.ToString());
            }
        }       

        /// <summary>
        /// Tên Paygate
        /// </summary>
        public static string User_Paygate_Name
        {
            get
            {
                return CookieHelper.GetCookie(Constants.COOKIE_USER_PAYGATE_NAME);
            }
            set
            {
                CookieHelper.SetCookie(Constants.COOKIE_USER_PAYGATE_NAME, value);
            }
        }

        /// <summary>
        /// Địa chỉ IP
        /// </summary>
        public static string User_IP
        {
            get
            {
                return CookieHelper.GetCookie(Constants.COOKIE_USER_IP);
            }
            set
            {
                CookieHelper.SetCookie(Constants.COOKIE_USER_IP, value);
            }
        }        
        #endregion

        /// <summary>
        /// Dùng để hack cho việc đăng nhập
        /// </summary>
        public static void HackLogin()
        {
            User_ID = 1;            
            User_Paygate_Name = "admin";
            User_IP = "127.0.0.1";
        }

        public static void Logout()
        {
            User_ID = -1;
            User_Paygate_Name = string.Empty;
            User_IP = string.Empty;            
        }
    }
}
