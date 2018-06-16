Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList:[
      {
        "tableID":1,
        "orderList":[
          {
            "orderID":1,
            "orderDetail":[
              {
                "foodID": 0,
                "foodName": "平菇",
                "foodPrice": 3.00,
                "foodNum": 2
              }
            ],
            "orderState":1
          },
          {
            "orderID":2,
            "orderDetail":[
              {
                "foodID": 1,
                "foodName": "花椰菜",
                "foodPrice": 2,
                "foodNum": 3
              }
            ],
            "orderState": 0
          }
        ],
        "totalCost":12,
        "tableState":1,
        "orderNum":2
      },
      {
        "tableID":2,
        "orderList": [
          {
            "orderID":1,
            "orderDetail":[
              {
                "foodID": 0,
                "foodName": "平菇",
                "foodPrice": 3.00,
                "foodNum": 2
              }
            ],
            "orderState":0
          },
          {
            "foodID": 2,
            "foodName": "猪里脊",
            "foodPrice": 6,
            "foodNum": 3
          }
        ],
        "totalCost": 24,
        "tableState": 1,
        "orderNum":1
      },
      {
        "tableID":3,
        "orderList":[],
        "totalCost": 0,
        "tableState": 0,
        "orderNum":0
      }
    ],
    foodList:[
      {
        "name": "素菜",
        "list": [
          {
            foodID: 0,
            foodName: "平菇",
            img_url: "",
            foodDetail: "平菇",
            foodPrice: 3.00
          },
          {
            foodID: 1,
            foodName: "花椰菜",
            img_url: "",
            foodDetail: "绿色健康无公害",
            foodPrice: 2.00
          },
        ]
      },
      {
        "name": "荤菜",
        "list": [
          {
            foodID: 2,
            foodName: "猪里脊",
            img_url: "",
            foodDetail: "肉类",
            foodPrice: 6.00
          }
        ]
      }
    ],
    orderList:[],
    resName: '真香',
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  tabShowTable: function () {
    wx.navigateTo({
      url: '../table/table',
    })
  },

  tabShowOrder: function() {
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  
  tabManageFood: function() {
    wx.navigateTo({
      url: '../food/food',
    })
  },
  

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
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