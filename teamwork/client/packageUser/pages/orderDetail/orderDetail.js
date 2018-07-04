Page({

  /**
   * 页面的初始数据
   */
  data: {
    currCart : [],
    orderTime : "",
    sumMoney:0,
    cutMoney:0,
    goodsNum:0,
    recordID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currDetail = wx.getStorageSync('currDetail');
    this.setData({
      recordID : currDetail.recordID,
      orderTime : currDetail.orderTime,
      sumMoney: currDetail.sumMoney,
      cutMoney: currDetail.cutMoney,
      goodsNum: currDetail.goodsNum,
      currCart : currDetail.currCart
    })
    console.log(this.data.recordID);
  },

  toSuccess() {
    wx.redirectTo({
      url: '../success/success',
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