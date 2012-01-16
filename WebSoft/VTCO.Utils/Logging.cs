//
// Author:      hoan.trinh
// Create Date: 2010-06-05
// Description: Class dùng cho việc ghi lại log cho site
//

using System.Collections.Generic;
using Microsoft.Practices.EnterpriseLibrary.Logging;

namespace VTCO.Utils
{
    /// <summary>
    /// Ghi file log phục vụ cho việc bug & fix bug
    /// </summary>
    public class Logging
    {
        /// <summary>
        /// Ghi log vào category được chỉ ra
        /// </summary>
        /// <param name="message">Message cần write</param>
        /// <param name="category">Category được chỉ ra</param>
        public static void Write(VTCO.Config.Enums.LoggingEnum category, object message)
        {
            Logger.Write(message, category.ToString());
        }

        /// <summary>
        /// Ghi exception log vào được chỉ ra với các input là các tham số trong args
        /// </summary>
        /// <param name="message">message cần write</param>
        /// <param name="args">Các input đầu vào</param>
        public static void Write(object message, params object[] args)
        {
            if ((args == null) || (args.Length == 0))
            {
                Logger.Write(message, VTCO.Config.Enums.LoggingEnum.TruTienExceptionLog.ToString());
                return;
            }

            Dictionary<string, object> _dic = new Dictionary<string, object>();
            for (int i = 0; i < args.Length; i++)
            {
                _dic.Add(i.ToString(), args[i]);
            }

            Logger.Write(message, VTCO.Config.Enums.LoggingEnum.TruTienExceptionLog.ToString(), _dic);
        }
    }
}
