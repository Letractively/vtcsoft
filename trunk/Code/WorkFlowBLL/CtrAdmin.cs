using System.Linq;
using DataContext;
using VTCO.Config;
using VTCO.Utils;
using DAL;
using System.Collections.Generic;
using EntityBLL;

namespace WorkFlowBLL
{
    public class CtrAdmin
    {
        /// <summary>
        /// Check Login Admin
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool AdminCheckLogin(string userName, string password)
        {
            int? ret = 0;
            WebSoft.AdminInstance.uspAdminCheckLogin(userName, password, ref ret);
            return ret == 1 ? true : false;
        }

        /// <summary>
        /// Set Cookie
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="permission"></param>
        public void Login(string userName, string permission)
        {
            uspAdminGetInfoByAdminNameResult objAdminInfo = WebSoft.AdminInstance.uspAdminGetInfoByAdminName(userName).FirstOrDefault();
            if (objAdminInfo != null)
            {
                CookieHelper.SetCookie(Constants.COOKIE_ADMIN_ID, objAdminInfo.AdminID.ToString());
                CookieHelper.SetCookie(Constants.COOKIE_ADMIN_PAYGATE_NAME, objAdminInfo.UserName.ToString());
                CookieHelper.SetCookie(Constants.COOKIE_ADMIN_FULL_NAME, objAdminInfo.FullName.ToString());
                CookieHelper.SetCookie(Constants.COOKIE_ADMIN_PERMISSION, permission);
            }
        }

        /// <summary>
        /// Clear Cookie
        /// </summary>
        public void Logout()
        {
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_ID, string.Empty);
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_PAYGATE_NAME, string.Empty);
            CookieHelper.SetCookie(Constants.COOKIE_ADMIN_FULL_NAME, string.Empty);            
        }

        /// <summary>
        /// Lấy thông tin Admin theo AdminID
        /// </summary>
        /// <param name="adminID"></param>
        /// <returns></returns>
        public uspAdminGetInfoByAdminIDResult GetInfoAdminByID(int adminID)
        {
            return WebSoft.AdminInstance.uspAdminGetInfoByAdminID(adminID).FirstOrDefault();
        }

        /// <summary>
        /// Lấy thông tin Admin theo UserName
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        public uspAdminGetInfoByAdminNameResult GetInfoAdminByName(string userName)
        {
            return WebSoft.AdminInstance.uspAdminGetInfoByAdminName(userName).FirstOrDefault();
        }   

        public ClassExtend<int, uspFunctionGetAllByTreeResult> GetFunctionChild(int functionID)
        {
            ClassExtend<int, uspFunctionGetAllByTreeResult> objChild = new ClassExtend<int, uspFunctionGetAllByTreeResult>();            
            objChild.Items = WebSoft.AdminInstance.uspFunctionGetAllByTree(functionID, VTCO.Utils.AdminUtils.AdminID).ToList();            
            objChild.TotalRecord = objChild.Items.Count;
            objChild.Info = 0;
            return objChild;
        }

        public ClassExtend<int,ClassExtend<uspFunctionGetAllByTreeResult, uspFunctionGetAllByTreeResult>> GetListFunctionByAdmin()
        {
            ClassExtend<int,ClassExtend<uspFunctionGetAllByTreeResult, uspFunctionGetAllByTreeResult>> objReturn = new ClassExtend<int,ClassExtend<uspFunctionGetAllByTreeResult,uspFunctionGetAllByTreeResult>>();
            ClassExtend<uspFunctionGetAllByTreeResult, uspFunctionGetAllByTreeResult> lstFuncChild;
            var lstFunction = GetFunctionChild(-1);
            foreach(var item in lstFunction.Items)
            {
                lstFuncChild = new ClassExtend<uspFunctionGetAllByTreeResult, uspFunctionGetAllByTreeResult>();
                lstFuncChild.Info = item;
                var lstChild = GetFunctionChild(item.FunctionID).Items;
                lstFuncChild.Items = lstChild;
                lstFuncChild.TotalRecord = lstChild.Count;
                objReturn.Items.Add(lstFuncChild);
            }
            objReturn.TotalRecord = lstFunction.TotalRecord;
            return objReturn;
        }        
    }
}
