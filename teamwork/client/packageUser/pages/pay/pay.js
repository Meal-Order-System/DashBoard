// pages/order/balance/balance.js
var Util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    totalNum:0,
    tableid:0,
    currOrder:[],
    hiddenModal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cutMonney: wx.getStorageSync('sumMonney')>49?3:0,
      totalNum: wx.getStorageSync('totalNum'),
    })
    var list = [];
    for (var item in this.data.cartList) {
      var tmp = this.data.cartList[item];
      var additem = {
        "food_id":tmp.id,
        "num":tmp.number,
      }
      
      list.push(additem)
    }
    this.setData({
      currOrder:list,
    })
    //console.log(this.data.currOrder)
  },
  
  input: function (e) {
    this.setData({ tableid: e.detail.value })
  },

  showModal: function (e) {
    this.setData({ hiddenModal: false })
  },

  modelConfirm: function (e) {
    this.setData({ hiddenModal: true })
    let that = this;
    if (this.data.tableid <= getApp().globalData.tableNum && this.data.tableid>0) {

      wx.showToast({
        title: '当前餐台号为' + this.data.tableid,
        icon: 'none'
      })
     
      console.log(that.data.currOrder),
      //wx.setStorageSync('recordDetail', this.data);
      wx.request({
        url: 'https://meal.mlg.kim/user/new_order',
        data: { 
          openid: "test", 
          desk_num: that.data.tableid, 
          order: that.data.currOrder
        },
        method: 'POST',
        header: {
          "content-type": "application/json"
        },
      })
      wx.redirectTo({
        url: '../record/record'
      })
    } else if (this.data.tableid > getApp().globalData.tableNum || this.data.tableid <=0) {
      wx.showToast({
        title: '请输入正确的餐台号！',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '您尚未输入餐台号！',
        icon: 'none'
      })
    }
  },

  modelCancel: function (e) {
    this.setData({ hiddenModal: true })
    wx.showToast({
      title: '您尚未输入餐台号！',
      icon: 'none'
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