using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebSoft.DBO;
using VTCO.Config;
using VTCO.Config.Pattern;
using VTCO.Utils;

namespace WebSoft.DAL
{
    public class AdminDAL : BaseDAL
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static AdminDAL Instance
        {
            get
            {
                return Singleton<AdminDAL>.Instance;
            }
        }
        #endregion 

        /// <summary>
        /// Kiểm tra đăng nhập 
        /// </summary>
        public bool IsExistAdmin(string userName, string password)
        {
            string passwordMd5 = Encryption.GetMD5(password);
            return Db.Admins.Any(c => (c.UserName == userName) && (c.Password == passwordMd5));
        }
        /// <summary>
        /// Kiểm tra đăng nhập
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public int GetAdminByID(string userName, string password)
        {
            //string passwordMd5 = Encryption.GetMD5(password);
            var objAdmin = Db.Admins.FirstOrDefault(c => c.UserName == userName && c.Password == password && c.Status == 1);
            if (objAdmin != null)
            {
                return objAdmin.AdminID;
            }
            return -1;
        }

        /// <summary>
        /// Lấy danh sách Admin
        /// </summary>
        /// <returns></returns>
        public List<uspAdminGetAll_Result> GetAdminList()
        {
            return Db.uspAdminGetAll().ToList();
        }   
    }
}
