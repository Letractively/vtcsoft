using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebSoft.Entity
{
    public class Image : VTCO.Config.Pattern.Prototype<Image>
    {
        private string m_Name;
        /// <summary>
        /// Tên ảnh
        /// </summary>
        public string Name
        {
            get { return m_Name; }
            set { m_Name = value; }
        }

        private string m_Size;
        /// <summary>
        /// Dung lượng
        /// </summary>
        public string Size
        {
            get { return m_Size; }
            set { m_Size = value; }
        }

        private string m_URL;
        /// <summary>
        /// Đường dẫn ảnh
        /// </summary>
        public string URL
        {
            get { return m_URL; }
            set { m_URL = value; }
        }

        private string m_Id;
        /// <summary>
        /// Id của ảnh
        /// </summary>
        public string Id
        {
            get { return m_Id; }
            set { m_Id = value; }
        }

    }
}


//
// Author:      duong.le
// Description: Khai báo các thuộc tính của đối tượng ảnh, phục vụ cho việc lấy danh sách ảnh từ một thư mục
// Create Date: 2010-07-05
//

