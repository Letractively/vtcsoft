using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VTCO.Config.Pattern;
using WebSoft.DBO;

namespace WebSoft.DAL
{
    public class FunctionDAL : BaseDAL
    {

        #region Properties
        /// <summary>
        /// Thể hiện của đối tượng
        /// </summary>
        public static FunctionDAL Instance
        {
            get
            {
                return Singleton<FunctionDAL>.Instance;
            }
        }
        #endregion 

        /// <summary>
        /// Lấy danh sách quyền truy cập của Admin
        /// </summary>
        /// <param name="adminId"></param>
        /// <returns></returns>
        public List<uspAdminGetListFunctionAccess_Result> GetListFunctionAllowAdminAccess(int adminId)
        {
            return Db.uspAdminGetListFunctionAccess(adminId).ToList();
        }

    }
}
