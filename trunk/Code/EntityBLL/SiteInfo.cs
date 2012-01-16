//
// Author:      Hoan.Trinh@vtc.vn
// Create Date: 2010-06-2010
// Description: Khai báo các thuộc tính cơ bản của WEB, phục vụ cho xử lý jTemplate
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VTCO.Config;

namespace WebSoft.Entity
{
    public class SiteInfo : VTCO.Config.Pattern.Prototype<SiteInfo>
    {
        /// <summary>
        /// Đối tượng thể hiện BaseInfo
        /// </summary>
        public static SiteInfo Instance
        {
            get
            {
                return VTCO.Config.Pattern.Singleton<SiteInfo>.Instance;
            }
        }

        /// <summary>
        /// Đường dẫn gốc của WEB.
        /// Ex: http://ss.go.vn/
        /// </summary>
        public string WebRoot
        {
            get
            {
                return Global.Settings.WEB_ROOT;
            }
        }        
    }
}
