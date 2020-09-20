// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    productList:[],
    price: 0.00
  },
  getProductList(){
    wx.request({
      url: 'http://localhost:8888/images/findAll',
      success: (res) => {
        console.log(res);
        this.setData({
          productList: res.data
        })
      }
    })
  },
  getProduct(){
    var cartList = wx.getStorageSync('cart')
        this.setData({
         cartList: cartList
        })

  },
  //合并付款事件
  change(e){
    console.log(e)
    var sumPrice = 0;
    var p = this.data.cartList;
    var sid = e.currentTarget.id;
    var num = e.detail.value;
    //判断当前的元素是否被选中
    if(num  != ''){
      for(var i = 0;i < p.length;i++){
        if(p[i].id == sid){
            sumPrice = this.data.price + p[i].price*p[i].count
        }
      }
    }
    else{
      for(var i = 0;i < p.length;i++){
        if(p[i].id == sid){ 
            sumPrice = this.data.price - p[i].price*p[i].count 
        }
      }
    }
    this.setData({
      price: sumPrice
    })
  },
  //数量操作： 减
  minus(e){
    let that = this;
    console.log(e)
    let pos = e.currentTarget.dataset.index;
    let cartList = that.data.cartList;
    let item = cartList[pos];
    let sumPrice = that.data.price
    if(item['count'] > 1){
      item['count']--;
      if(sumPrice >0){
      sumPrice = sumPrice - item['price']
      }
    }
    wx.setStorageSync('cart', cartList)
    that.getProduct();
    that.setData({
      price: sumPrice
    })
  },
    //数量操作： 加
  add(e){
      let that = this;
      console.log(e)
      let pos = e.currentTarget.dataset.index;
      let t1 = wx.getStorageSync('cha')[pos]
      console.log(t1)
      let cartList = that.data.cartList;
      let item = cartList[pos];
      let sumPrice = that.data.price
      console.log(sumPrice)
      item['count']++;
     
      sumPrice = sumPrice - (-item.price)
      console.log(item.count)
      wx.setStorageSync('cart', cartList)
      that.getProduct();
      that.setData({
        price: sumPrice
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getProduct();
  },

  //选择框的点击事件
  selectChange(e){
    let that = this;
    let pos = e.currentTarget.dataset.index;
    let cartList = that.data.cartList
    let item = cartList[pos];
    item['checked'] = !item['checked'];
    wx.setStorageSync('cart', cartList)
  },
  showCreateOrderPage(){
    if(this.data.cartList != ''){
    wx.navigateTo({
      url: '../orderCreate/orderCreate',
    })
  }else{
    wx.showToast({
      title: '购物车为空',
    })
  }
  }
})