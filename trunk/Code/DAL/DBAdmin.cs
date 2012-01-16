using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    class DBAdmin
    {
        /// <summary>
        /// Hàm tạo đối tượng thể hiện của AdminDataContext
        /// </summary>
        /// <returns></returns>
        public DataContext.AdminDataContext CreateInstance()
        {
            return new DataContext.AdminDataContext(VTCO.Config.Global.Settings.ConnectionStringAdminWebSoft);
        }           
    }
}
