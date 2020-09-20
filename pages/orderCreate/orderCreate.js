// pages/orderCreate/orderCreate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0,
    address:{
      id: '',
      uid: '',
      name: '',
      phone: '',
      address: ''
    },
    orders:{
      totalPrice: '',
      addressId: '',
      uid: '',
      ordersDetailList: []
    },
    couldClick: true 
  },
  //确认下单
  createOrder(){
    let that = this;
    //如果提交过一次，刚开始couldClick是true点完后变false，取反是true，
    if(!that.data.couldClick){
      wx.showToast({
        title: '请勿重复提交订单',
      })
      return;
    }
    if(!that.data.address.id){
      wx.showToast({
        title: '请选择收货地址',
      })
      return;
    }

    //提交到后台的订单信息
    let orderInfo = {
      totalPrice: that.data.totalPrice,
      addressId: that.data.address.id,
      uid: wx.getStorageSync('uid')

    }
    //订单详细
    let ordersDetailList = [];
    let cartList = that.data.cartList;
    for(let i = 0;i < cartList.length;i++){
      let item  = cartList[i];
      ordersDetailList.push({ 
        goodsId: item['gid'],
        count: item['count'],
        price: item['price'],
        name: item['name'],
        imgSrc: item['imgSrc']
      })
    }
    console.log(ordersDetailList)
    that.setData({
      couldClick: false,
      orders:{
        totalPrice: that.data.totalPrice,
        addressId: that.data.address.id,
        uid: wx.getStorageSync('uid'),
        ordersDetailList: ordersDetailList
      }
    })
    //后台请求，请求网络
    wx.request({
      url: 'http://localhost:8888/order/orderAdd',
      data: this.data.orders,
      method:'POST',
      success: (res) =>{
       
        if(res){
          wx.setStorageSync('cart', []);
          wx.redirectTo({
            // url: '../goodsPay/goodsPay?orderId='+res.data.id+'&totalPrice='+res.data.totalPrice,
            url:'../goodsPay/goodsPay?totalPrice='+that.data.totalPrice
          })
        }else{
          that.setData({
              couldClick: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.calculate();
  },
  //选择收货地址
  showAddressList(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //计算价格
  calculate(){
    let that = this;
    let totalPrice = 0;
    let cartList = wx.getStorageSync('cart');
    cartList = cartList?cartList:[];
    let validateCartList = [];
    for(let i = 0;i <cartList.length;i++){
      let item = cartList[i];
      console.log(item)
      if(item){
        console.log(item)
        item['totalPrice'] = item['count'] * item['price'];
        totalPrice = item['totalPrice'] + totalPrice;
        validateCartList.push(item);
        // console.log(validateCartList)
      }
    }
    that.setData({
      totalPrice: totalPrice,
      cartList: validateCartList
    })
  },
  //确认下单
  // createOrder(){
  //   let that = this;
  //   //如果提交过一次，刚开始couldClick是true点完后变false，取反是true，
  //   if(!that.data.couldClick){
  //     wx.showToast({
  //       title: '请勿重复提交订单',
  //     })
  //     return;
  //   }
  //   if(!that.data.address.id){
  //     wx.showToast({
  //       title: '请选择收货地址',
  //     })
  //     return;
  //   }
  //   that.setData({
  //     couldClick: false
  //   })
  //   //提交到后台的订单信息
  //   let orderInfo = {
  //     totalPrice: that.data.totalPrice,
  //     addressId: that.data.address.id
  //   }
  //   //订单详细
  //   let orderDetails = [];
  //   let cartList = that.data.cartList;
  //   for(let i = 0;i < cartList.length;i++){
  //     let item  = cartList[i];
  //     orderDetails.push({ 
  //       goodsId: item['gid'],
  //       count: item['count'],
  //       price: item['price']
  //     })
  //   }
  //   //后台请求，请求网络
  //   wx.request({
  //     url: 'http://localhost:8888/order/orderAdd',
  //     data: {
  //       orderInfo: JSON.stringify(orderInfo),
  //       orderDetails: JSON.stringify(orderDetails)
  //     },
  //     method:'POST',
  //     success: (res) =>{
  //       if(res){
  //         wx.setStorageSync('cart', []);
  //         wx.redirectTo({
  //           url: '../goodsPay/goodsPay?orderId='+res.data.id+'&totalPrice='+res.data.totalPrice,
  //         })
  //       }else{
  //         that.setData({
  //             couldClick: true
  //         })
  //       }
  //     }
  //   })
  // }
})