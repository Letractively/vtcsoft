using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VTCO.Config
{
    public class PermissionBackendConstants
    {
       
        /// <summary>
        /// Chỉ xem
        /// </summary>
        public const int READ_ONLY = 8;
        /// <summary>
        /// Thêm mới
        /// </summary>
        public const int ADD = 4;
        /// <summary>
        /// Sửa
        /// </summary>
        public const int EDIT = 2;
        /// <summary>
        /// Xóa
        /// </summary>
        public const int DELETE = 1;
    }
}
