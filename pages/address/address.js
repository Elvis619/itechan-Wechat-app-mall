// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    userAddress:[]
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
    this.getAddressList();
  },
  getAddressList:function(){
    let id = wx.getStorageSync('uid')
    wx.request({
      url: 'http://localhost:8888/user/userAddress/'+id,
      success:(res) => {
        this.setData({
          addressList: res.data
        })
      }
    })
  },
  //点击项目返回选择后的收货地址
  onItemClick:function(e){
      let item = this.data.addressList[e.currentTarget.dataset.index];
      let pages = getCurrentPages();//获取当前页面js里面的pages里的所有信息
      let lastPages = pages[pages.length - 2]; //lastPages是获取上一个页面的js里面的pages的所有信息。-2是上一个页面，-3是上上个页面
      lastPages.setData({
        address: item
      });
      //跳转回上一页
      wx.navigateBack({
        delta: 1
      })
  },
  showAddressAddView(){
    let uid = wx.getStorageSync('uid')
    wx.navigateTo({
      url: '../../pages/addressOperate/addressOperate?uid='+uid,
      // url: '../../pages/addressOperate/addressOperate?uid='+this.data.addressList[0].uid,
    })
  },
  //长按项目，删除当前所选的地址
  onItemLongClick(e){
    let that = this;
    let item = this.data.addressList[e.currentTarget.dataset.index];
    wx.showModal({
      title: '删除确认',
      content: '确定删除吗？',
      confirmText: '删除',
      success: function(res){
        if(res.confirm){
           wx.request({
             url: 'http://localhost:8888/user/addressUpdateState/'+item['id'],
             success:(res) =>{
               that.setData({
                 addressList:res.data
               })
             }
           })
        }
      }
    })
  },
  //修改
  editItem(e){
    let item = this.data.addressList[e.currentTarget.dataset.index];
    //跳转到修改页面
    wx.navigateTo({
      url: '../../pages/addressOperate/addressOperate?id='+item['id']+'&uid='+item['uid'],
    })
  }
})