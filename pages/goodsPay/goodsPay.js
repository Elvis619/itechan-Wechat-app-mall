// pages/goodsPay/goodsPay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    totalPrice: ' '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      orderId: options['orderId'],
      totalPrice: options['totalPrice']
    })
  },
  //提交订单，立即支付
  payOrder(){
    let that = this;
    let orderId = that.data.orderId;
    
  }
})