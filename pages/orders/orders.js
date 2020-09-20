// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    swiperTab: [
      {
        name: '全部',
        index: 0
      },
      {
        name: '待支付',
        index: 1
      },
      {
        name: '待发货',
        index: 2
      },
      {
        name: '待收货',
        index: 3
      },
      {
        name: '已完成',
        index: 4
      }
    ],
    orderList: []
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
    let that = this;
    wx.getSystemInfo({
      complete: (res) => {
        that.setData({
          deviceH: res.windowHeight
        })

      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderList();

  },
  /**
   * 选项卡点击切换功能
   */
  tabSwitch(e){
   
    let that = this;
    if(that.data.currentTab == e.currentTarget.dataset.current){
      return false;
    }
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })
    that.getOrderList()
  },
  tabChange(e){   
    this.setData({
      currentTab: e.detail.current 
    })
   this.getOrderList();
  },

  /**
   * 查询订单
   */
  getOrderList(){
    let that = this;
    that.setData({
      orderList: []
    })
    let stateParam = that.data.currentTab == 0 ? {} :{
      state: that.data.currentTab
    }
    if(that.data.currentTab == 0){
    wx.request({
      url: 'http://localhost:8888/order/orderList',
      success: (res) =>{
        let dataList = res.data;
        for(let i=0;i<dataList.length;i++){
          let bean = dataList[i];
        
          //状态处理
          let str = ''
          switch(bean.state){
            case 1:
              str = '待支付';
              break;
            case 2:
              str = '待发货';
              break;
            case 3:
              str = '待收货';
              break;
            case 4:
              str = '已完成';
              break;
          }
          //bean有stateStr字段有就查，没有就创建stateStr字段
          bean['stateStr'] = str;
        }
        that.setData({
          orderList: dataList
        })
      }
    })
  }else{
    wx.request({
      url: 'http://localhost:8888/order/orderListByState/'+this.data.currentTab,
      success: (res) =>{
        let dataList = res.data;
        for(let i=0;i<dataList.length;i++){
          let bean = dataList[i];
        
          //状态处理
          let str = ''
          switch(bean.state){
            case 1:
              str = '待支付';
              break;
            case 2:
              str = '待发货';
              break;
            case 3:
              str = '待收货';
              break;
            case 4:
              str = '已完成';
              break;
          }
          //bean有stateStr字段有就查，没有就创建stateStr字段
          bean['stateStr'] = str;
        }
        that.setData({
          orderList: dataList
        })
      }
    })
  }
  },
  //点击事件
  onItemClick(e){ 
    let that = this;
    let currentIndex = e.currentTarget.dataset.index;
    let item = that.data.orderList[currentIndex];
    let orderId =   item.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+orderId,
    }) 
  },
  //支付
  payOrder(e){
    var that = this;
    let currentIndex = e.currentTarget.dataset.index
    let item = that.data.orderList[currentIndex];
    let orderId = item.id;
    wx.request({
      url: 'http://localhost:8888/order/updatePayState/'+orderId,
      success: (res) =>{
        if(res){
          if(that.data.currentTab == 1 || that.data.currentTab == 0){
            this.onShow();
            // that.data.orderList.splice(currentIndex,1)
          }
        }
      }
    })
    that.setData({
        orderList: that.data.orderList
    })
  },
  endOrder(e){
    var that = this;
    let currentIndex = e.currentTarget.dataset.index
    let item = that.data.orderList[currentIndex];
    let orderId = item.id;
    wx.request({
      url: 'http://localhost:8888/order/updateWaitState/'+orderId,
      success: (res) =>{
        if(res){
          if(that.data.currentTab == 3 || that.data.currentTab == 0){
            this.onShow();
            // that.data.orderList.splice(currentIndex,1)
          }
        }
      }
    })
    that.setData({
        orderList: that.data.orderList
    })
  }
})