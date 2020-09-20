// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[]
  },
  login:function(options){
    wx.request({
      url: 'http://localhost:8888/user/login',
      data:{
        username:options.detail.value.username,
        password:options.detail.value.password
      },
      success:function(res){
        if(res.data == 'success'){
          wx.request({
            url: 'http://localhost:8888/user/findByUserName/'+options.detail.value.username,
            success: (res) =>{
             wx.setStorageSync('uid', res.data.id)
             wx.setStorageSync('username',options.detail.value.username )
            }
          })
          wx.showToast({
            title: '登录成功',
          })
          wx.switchTab({
            url: '../home/home',
          })
        }else{
          wx.showToast({
            title: '登录失败',
          })
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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