// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    showSwiperList:[],
    horizontalList:[],
    showHorizontalList:[],
    verticalList:[],
    showVerticalList:[]
  },
  getSwiperList:function(){
    wx.request({
      url: 'http://localhost:8888/images/swiper',
      success: (res) => {
        this.setData({
          swiperList: res.data
        })
        var showSwiperList = []
        for(let i = 0; i < this.data.swiperList.length;i++){
          showSwiperList.push({
              detail: this.data.swiperList[i],
              isCart:false
          })
        }
        this.setData({
          showSwiperList: showSwiperList
        })
      }
    })
  },
  getHorizontalList:function(){
    wx.request({
      url: 'http://localhost:8888/images/horizontal',
      success: (res) => {
        this.setData({
          horizontalList: res.data
        })
        var showHorizontalList = []
        for(let i = 0; i < this.data.horizontalList.length;i++){
          showHorizontalList.push({
              detail: this.data.horizontalList[i],
              isCart:false
          })
        }
        this.setData({
          showHorizontalList: showHorizontalList
        })
      }
    })
  },
  getVerticalList:function(){
    wx.request({
      url: 'http://localhost:8888/images/vertical',
      success: (res) => {
        this.setData({
          verticalList: res.data
        })
        var showVerticalList = []
        for(let i = 0; i < this.data.verticalList.length;i++){
          showVerticalList.push({
              detail: this.data.verticalList[i],
              isCart:false
          })
        }
        this.setData({
          showVerticalList:showVerticalList
        })
        wx.setStorageSync('verticalList', this.data.showVerticalList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:8888/images/swiper',
    //   success: (res) => {
    //     console.log(res);
    //     this.setData({
    //       swiperList: res.data
    //     })
    //   }
    // })
    this.getSwiperList();
    this.getHorizontalList();
    this.getVerticalList();
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