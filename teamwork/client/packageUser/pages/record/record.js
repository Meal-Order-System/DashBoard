var app = getApp();
//var isFirst=true;
var apiURL ='https://meal.mlg.kim'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordList:[
    ],
    recordNum:0,
    currIndex:0,
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      openid: app.globalData.openid
    })
    //console.log('当前openid'+this.data.openid)
    wx.request({
      //url: `${apiURL}/user/order?openid=`+this.data.openid,
      url: `${apiURL}/user/order?openid=test`,
      success: (res) => {
        this.setData({
          recordList: res.data,
        })
      }
    })

    /*if (!isFirst) {
      var reData = wx.getStorageSync('currData');
      this.setData({
        recordList : reData.recordList,
        recordNum : reData.recordNum,
        currIndex :reData.currIndex
      })
    }*/

    var data = wx.getStorageSync('reDetail');
    //console.log(data.orderTime);
    var addItem = {
      "recordID": this.data.recordNum + 1,
      "orderTime": data.orderTime,
      "sumMoney": data.sumMoney,
      "cutMoney": data.cutMoney,
      "goodsNum": data.goodsNum,
      "currCart": data.cartList,
    }
    //console.log("push前记录的条数" + this.data.recordNum);
    var recordList = this.data.recordList;
    recordList.push(addItem);
    this.setData({
      recordList: recordList,
      recordNum: this.data.recordNum + 1
    })
    //console.log("push后记录的条数" + this.data.recordNum);
    //wx.setStorageSync('currData', this.data);
    //isFirst=false;

    /*wx.request({
      url: `${apiURL}/user/order?openid=test`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { data: this.data },
      success: (res) => {
        if (res.data.result) {
          consloe.log('show data post' + res.data)
        }
      }
    })*/

  },

  goDetail: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      currIndex : index
    })
    //console.log("当前选定的目标"+index+"当前record id： " + this.data.recordList[this.data.currIndex].recordID);
    wx.setStorageSync('currDetail',this.data.recordList[this.data.currIndex])
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
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