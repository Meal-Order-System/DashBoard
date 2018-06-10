// pages/dish/dish.js
var WXParse = require('../../wxParse/wxParse.js')
//var { apiURL } = getApp()
var detailList = wx.getStorageSync('dishDetail');
var cartList = wx.getStorageSync('cartList');
var totalMoney = wx.getStorageSync('sumMonney');
var totalNum = wx.getStorageSync('totalNum');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    foodDetail: [],
    currCart: [],
    currMoney: 0,
    currNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   /* wx.request({
      url: `${apiURL}/goods/${data.ID}`,
      success: (res) => {
        this.setData({
          goods: res.data
        })
        WXParse.wxParse('intro', 'html', this.data.goods.Intro.replace(/="/g, '="' + appURL),this, 10)
      }
    })*/
    this.setData({
      foodDetail: detailList,
      currCart: cartList,
      currMonty: totalMoney,
      currNum: totalNum 
    })
  },
  /*checkType (ex) {
    this.setData({
      typeIndex: ex.target.dataset.id
    })
  },*/
  subNum () {
    if (this.data.currNum == 1) {
      return false
    }
    this.setData({
      currNum: this.data.currNum-1
    })
  },
  addNum () {
    this.setData({
      currNum: this.data.currNum+1
    })
  },
  goPay() {
    if (this.currCart != null) {
      wx.setStorageSync('cartList', this.data.currCart);
      wx.setStorageSync('sumMonney', this.data.currMoney);
      wx.setStorageSync('totalNum', this.data.currNum);
      wx.navigateTo({
        url: '../pay/pay'
      })
    }
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