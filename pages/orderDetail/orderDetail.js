// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id = options['id'];
    that.getOrderList(id);
    that.getAddressDetail();
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
  getOrderList(id){
    let that = this;
    that.setData({
      orderList:[]
    })
    wx.request({
      url: 'http://localhost:8888/order/orderById/'+id,
      success: (res) =>{
        let dataList = res.data;
        
        for(let i=0;i<dataList.length;i++){
          let bean = dataList[i];
          let id = bean['addressId'];
          wx.request({
            url: 'http://localhost:8888/user/addressById/'+id,
            success: (res) =>{
            console.log(res)
            this.setData({
               address: res.data
             })
      }
    })
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
  
  },
  getAddressDetail(){
    // wx.request({
    //   url: 'http://localhost:8888/user/addressById/'+id,
    //   success: (res) =>{
    //     console.log(res)
    //     this.setData({
    //       address: res.data
    //     })
    //   }
    // })
  }
})