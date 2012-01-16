using WebSoft.DBO;
using VTCO.Config.Pattern;

namespace WebSoft.DAL
{
    abstract public class BaseDAL
    {
        /// <summary>
        /// _db kết nối tới cơ sở dữ liệu
        /// </summary>
        public WebSoftEntities Db
        {
            get { return Singleton<WebSoftEntities>.GetInstance(VTCO.Config.Global.Settings.ConnectionStringWebSoftNew); }
        }

        /// <summary>
        /// Lưu lại
        /// </summary>
        public int CommitChange()
        {
            return Db.SaveChanges();
        }
    }
}
