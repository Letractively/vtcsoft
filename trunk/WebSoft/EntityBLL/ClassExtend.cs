//
// Author:      hoan.trinh
// Description: Class mở rộng cho các class khác
// Create Date: 2010-06-18
//

using System.Collections.Generic;
namespace WebSoft.Entity
{
    public class ClassExtend<TInfo, TList> : VTCO.Config.Pattern.Prototype<ClassExtend<TInfo, TList>>
    {
        private int m_totalRecord;
        /// <summary>
        /// Tổng số bản ghi
        /// </summary>
        public int TotalRecord
        {
            get { return m_totalRecord; }
            set { m_totalRecord = value; }
        }

        private TInfo m_info;
        /// <summary>
        /// Thông tin
        /// </summary>
        public TInfo Info
        {
            get { return m_info; }
            set { m_info = value; }
        }

        private List<TList> m_items;
        /// <summary>
        /// Danh sách các Item
        /// </summary>
        public List<TList> Items
        {
            get { return m_items; }
            set { m_items = value; }
        }

        /// <summary>
        /// Hàm khởi tạo không tham số
        /// </summary>
        public ClassExtend()
        {
            m_totalRecord = 0;
            m_items = new List<TList>();
        }

        /// <summary>
        /// Hàm khởi tạo với các tham số của ClassExtend
        /// </summary>
        /// <param name="info">thông tin của đối tượng</param>
        /// <param name="items">danh sách các item của đối tượng</param>
        /// <param name="totalRecord">tổng số bản ghi của danh sách</param>
        public ClassExtend(TInfo info, List<TList> items, int totalRecord)
        {
            m_info = info;
            m_totalRecord = totalRecord;
            m_items = items;
        }

    }
}

