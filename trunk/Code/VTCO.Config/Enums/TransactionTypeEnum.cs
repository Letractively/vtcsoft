using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VTCO.Config.Enums
{
    public enum TransactionTypeEnum
    {
        /// <summary>
        /// Đặt mua
        /// </summary>
        BuyItem = 1,
        /// <summary>
        /// Tặng quà
        /// </summary>
        GiftItem = 2,
        /// <summary>
        /// Trả Item vào Game
        /// </summary>
        AddItemToGame = 3,
        /// <summary>
        ///  Đã trả Item vào tủ đồ của người mua
        /// </summary>
        AddItemToItemOwner = 4,
        /// <summary>
        /// Đã chuyển Item vào tủ đồ của người được tặng
        /// </summary>
        AddItemToGift = 5,
        /// <summary>
        /// Hết giờ - hủy giao dịch
        /// </summary>
        CancelTransaction = 6
    }
}
