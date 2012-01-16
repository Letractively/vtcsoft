using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebSoft.DAL;
using WebSoft.DBO;
using VTCO.Utils;
using VTCO.Config.Pattern;

namespace WebSoft.BLL
{
    public class AdminBLL
    {

        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static AdminBLL Instance
        {
            get
            {
                return Singleton<AdminBLL>.Instance;
            }
        }
        #endregion 
        /// <summary>
        /// Kiểm tra đăng nhập backend
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool AminCheckLogin(string userName, string password)
        {
            var adminID = AdminDAL.Instance.GetAdminByID(userName, password);
            if (adminID > 0)
            {
                AdminUtils.Login(adminID, userName);
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Lấy danh sách Admin
        /// </summary>
        /// <returns></returns>
        public List<uspAdminGetAll_Result> GetAdminList()
        {
            return AdminDAL.Instance.GetAdminList();
        }
    }
}
