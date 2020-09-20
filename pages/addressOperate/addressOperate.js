// pages/addressOperate/addressOperate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      id: '',
      uid: '',
      name: '',
      phone: '',
      address: ''
    },
    id: '',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options['id'];
    let uid = options['uid'];
    let that = this;
    that.data.id = id;
    that.data.uid = uid;
    if(that.data.id){
      that.getDataList();
      that.setMyData('id',id); 
      that.setMyData('uid',uid)
    }
    },
    //根据id查询当前地址详情
    getDataList(){
      let that = this;
      wx.request({
        url: 'http://localhost:8888/user/addressFindById/'+that.data.id,
        success:(res) =>{
          if(res){
            let bean = res.data;
            that.setData({
              formData:{
                id: bean['id'],
                uid: bean['uid'],
                name: bean['name'],
                phone: bean['phone'],
                address: bean['address']


              }
            })
          }
        }
      })
    },
    onInput: function(e){
     let typename =  e.currentTarget.dataset.typename;
     let value = e.detail.value
     this.setMyData(typename,value)
    },
    setMyData(key,value){
      let formData = this.data.formData;
      formData[key] = value;
      this.setData({
        formData: formData
      })
    },
    //提交
    operate(){
      var that = this;
      let formData = that.data.formData;
      console.log(that.data)
      console.log(that.data.id)
      console.log(that.data.formData.uid)
      if(that.data.id){
        //调用修改接口
        wx.request({
          url: 'http://localhost:8888/user/editAddress',
          data: formData,
          method: 'PUT',
          success: (res) =>{
            console.log(res)
            if(res){
              wx.showModal({
                title: '保存成功',
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })

      }
      else{
        //调用添加接口
        let uid = wx.getStorageSync('uid')
        this.data.formData.uid = uid
        wx.request({
          url: 'http://localhost:8888/user/addressAdd',
          data: formData,
          method: 'POST' ,
          success: (res) =>{
            console.log(res)
            if(res){
              wx.showModal({
                title: '保存成功',
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    },
})