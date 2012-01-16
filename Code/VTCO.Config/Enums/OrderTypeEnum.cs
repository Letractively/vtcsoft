using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VTCO.Config.Enums
{
    public enum OrderTypeEnum
    {
        /// <summary>
        /// Đặt mua
        /// </summary>
        BuyItem = 1,
        /// <summary>
        /// Đã trả Item vào game
        /// </summary>
        AddItemToGame =2,
        /// <summary>
        ///  Đã trả Item vào tủ đồ của người mua
        /// </summary>
        AddItemToItemOwner = 3,
        /// <summary>
        /// Đã chuyển Item vào tủ đồ của người được tặng
        /// </summary>
        AddItemToGift = 4,
        /// <summary>
        /// Hoàn tiền - hủy giao dịch
        /// </summary>
        CancelTransaction = 5,
        /// <summary>
        /// Lỗi Add Item vào Game 
        /// </summary>
        ErrorAddItem = -1
    }
}
