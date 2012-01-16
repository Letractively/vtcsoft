using System.Collections.Generic;
using VTCO.Config.Pattern;
using WebSoft.DAL;
using WebSoft.DBO;
using System.Data.Linq;

namespace WebSoft.BLL
{
    public class FunctionBLL
    {
        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static FunctionBLL Instance
        {
            get
            {
                return Singleton<FunctionBLL>.Instance;
            }
        }
        #endregion


        public List<uspAdminGetListFunctionAccess_Result> GetListFunctionAllowAdminAccess(int adminId)
        {
            return FunctionDAL.Instance.GetListFunctionAllowAdminAccess(adminId);
        }        
    }
}
