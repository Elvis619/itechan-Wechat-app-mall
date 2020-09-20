// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDetailList:[],
    id:''
  },
  cartAdd:function(){
    let that = this;
    let showDetailList = that.data.showDetailList;
    let carList = wx.getStorageSync('cart')
    carList = carList?carList:[];
    //遍历购物车判断是否有该书籍
    let originCartItem;
    for(let i = 0;i < carList.length;i++){
      let cartItem = carList[i];
      if(cartItem['id'] == showDetailList['id']){
        originCartItem = cartItem;
        break;
      }
    }
    if(originCartItem){
      //原来有
      originCartItem['count']++;
    }else{
      //原来没有
      originCartItem = showDetailList;
      originCartItem['count'] = 1
      carList.push(originCartItem);
    }
    wx.setStorageSync('cart', carList);
    wx.showToast({
      title: '添加购物车成功',
    })
  },
  addCart(){
    let that = this;
    //存储数据到本地的同步方法
    var id = [];
    id.push({
      productId:that.data.productId,
      count: 1
    })
     wx.setStorageSync('id',id)
    var productId = that.data.productId;
    var isCart = that.data.isCart;
    // var idList = wx.getStorageSync('id')||[]
    if(!that.data.isCart){
     var iscart = that.data.isCart
      console.log(that.data.isCart)
      that.setData({
        isCart: true
      })
      console.log(that.data.iscart)
      let cartList = wx.getStorageSync('carList')||[];
      cartList.push({
        id:productId,
        count: 1
      })
      wx.setStorageSync("cartList",cartList);
    }
    wx.showModal({
      title: '成功提示',
      content: '成功添加到购物车',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
     wx.request({
      url: 'http://localhost:8888/images/findById/'+options.id,
      success: (res) => {
        let showDetailList =[];
        showDetailList.push({
          id:res.data.id,
          name: options.name,
          price: options.price,
          imgSrc: res.data.imgSrc,
          gid: res.data.gid,
          video: res.data.video,
          detailImg01: res.data.detailImg01,
          detailImg02: res.data.detailImg02,
          detailImg03: res.data.detailImg03
        })
        // showDetailList.push({
        //   productId: options.id,
        //     name: options.name,
        //     price: options.price,
        //     isCart:false,
        //     detailList: res.data [0]
        // })
        this.setData({
            showDetailList: showDetailList[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})