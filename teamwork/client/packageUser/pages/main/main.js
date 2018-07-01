// pages/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:'开始\n点菜',
    record:'历史\n订单',
    userInfo:'个人\n信息',
    menuid:'menu',
    recordid:'record',
    userInfoid:'userInfo',
    orderListid:'orderList',
  },

  bindMenu:function () {
    wx.navigateTo({
      url: '../menu/menu',
    })
  },

  bindRecord:function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },

  bindUserInfo: function () {

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
    this.setData({
      menuid: 'menu-display',
      recordid: 'record-display',
      userInfoid: 'userInfo-display',
    })
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