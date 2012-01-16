using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using VTCO.Config;

namespace VTCO.Utils
{
    public class CookieHelper
    {
        private static RijndaelEnhanced m_rijndaelKey = new RijndaelEnhanced("@1B2c3D5E5F6g7H7");
        public static string GetCookie(string name)
        {
            string CookieValue = string.Empty;
            if (System.Web.HttpContext.Current.Request.Cookies[name] != null)
            {
                try
                {
                    CookieValue = m_rijndaelKey.Decrypt(System.Web.HttpContext.Current.Request.Cookies[name].Value.ToString());
                }
                catch { }
            }
            return CookieValue;
        }

        public static void SetCookie(string name, string value)
        {
            string strValueEn = m_rijndaelKey.Encrypt(value);
            if (System.Web.HttpContext.Current.Request.Cookies[name] == null)
            {
                System.Web.HttpContext.Current.Request.Cookies.Set(new HttpCookie(name, ""));
            }

            System.Web.HttpContext.Current.Request.Cookies[name].Value = strValueEn;



            if (System.Web.HttpContext.Current.Response.Cookies[name] == null)
            {
                System.Web.HttpContext.Current.Response.Cookies.Set(new HttpCookie(name, ""));
            }
            System.Web.HttpContext.Current.Response.Cookies[name].Value = strValueEn;

            if (!VTCO.Config.Global.Settings.COOKIE_DOMAIN.Equals(""))
            {
                System.Web.HttpContext.Current.Response.Cookies[name].Path = "/";
                System.Web.HttpContext.Current.Response.Cookies[name].Domain = VTCO.Config.Global.Settings.COOKIE_DOMAIN;
            }
            var iCookieExpires = 60 * 1; // mặc định
            try
            {
                iCookieExpires = Convert.ToInt32(VTCO.Config.Global.Settings.COOKIE_EXPIRES);
            }
            catch { }

            System.Web.HttpContext.Current.Response.Cookies[name].Expires = DateTime.Now.AddMinutes(iCookieExpires);
            System.Web.HttpContext.Current.Response.Cookies[name].HttpOnly = true;
        }

    }
}
