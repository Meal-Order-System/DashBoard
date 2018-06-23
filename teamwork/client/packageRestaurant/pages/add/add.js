
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list=wx.getStorageSync('currFoodList');
    this.setData({
      foodList:list,
    })
  },

  formSubmit: function (e) {
    var tmp = e.detail.value;
    var item=[];
    item={
      'foodName':tmp.name,
      'foodPrice':tmp.price,
      'foodDetail':tmp.detail
    }
    var foodtype=tmp.type;

    var typelist=this.data.foodList[foodtype].list;
    var key='foodList['+foodtype+"].list"
    typelist.push(item);
    this.setData({
      [key]:typelist,
    }),
    wx.setStorageSync('newList', this.data.foodList)
    wx.redirectTo({
      url: '../main/main?currentTab=1',
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