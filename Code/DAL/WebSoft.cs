using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataContext;
using VTCO.Config;

namespace DAL
{
    public class WebSoft
    {
        /// <summary>        
        /// Thể hiện của lớp AdminDataContext        
        /// </summary>
        public static DataContext.AdminDataContext AdminInstance
        {
            get
            {                
                return VTCO.Config.Pattern.Singleton<DBAdmin>.Instance.CreateInstance();
            }
        }
    }
}
