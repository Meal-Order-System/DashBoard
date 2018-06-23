var util = require('../../../utils/util.js');
var isPay=false;
var isAdd=false;
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
        "totalCost":6,
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
              },
              {
                "foodID": 2,
                "foodName": "猪里脊",
                "foodPrice": 6,
                "foodNum": 3
              }
            ],
            "orderState":0
          },
        ],
        "totalCost": 0,
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
            foodName: "平菇",
            img_url: "",
            foodDetail: "平菇",
            foodPrice: 3.00
          },
          {
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
            foodName: "猪里脊",
            img_url: "",
            foodDetail: "肉类",
            foodPrice: 6.00
          }
        ]
      }
    ],
    orderList:[
      {
        'table': 3,
        'list': [
          {
            "orderID":1,
            "orderDetail":[
              {
                "foodID": 0,
                "foodName": "平菇",
                "foodPrice": 3.00,
                "foodNum": 2
              },
              {
                "foodID": 2,
                "foodName": "猪里脊",
                "foodPrice": 6,
                "foodNum": 3
              }
            ]
          }
        ],
        'cost': 24,
        'time': '2018-06-22 15:57',
      }
    ],
    resName: '真香',
    currentTab: 0,
    scrollLeft: 0,
    winHeight:"",
    currTable:0,
    showTable:[false,false,false],
    tableNum:3,
    currType:0
  },

  deleteFood: function(e) {
    var foodtype=this.data.currType;
    var index=e.currentTarget.dataset.dish;
    var list = this.data.foodList[foodtype].list;
    console.log(list)
    console.log("当前食品"+index)
    var key="foodList["+foodtype+"].list";
    if (index>-1) {
      list.splice(index,1);
    }

    this.setData({
      [key]:list
    })
    console.log(this.data.foodList[foodtype].list)
  },

  selectType: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currType: index,
      // scrollTop: 1186
    })
  },
  
  toAdd:function() {
      wx.setStorageSync('currFoodList', this.data.foodList)
      wx.redirectTo({
        url: '../add/add',
      })
      isAdd=true;
  },

  finishOrder: function(e) {
    var order=e.currentTarget.dataset.orderid;
    var table = this.data.tableList[this.data.currTable];
    var state=table.orderList[order].orderState;
    var key="tableList["+this.data.currTable+"].orderList["+order+"].orderState";
    var cost = "tableList[" + this.data.currTable + "].totalCost";
    var currOrder = table.orderList[order].orderDetail;
    var currCost = table.totalCost;

    console.log(currOrder)
    for(var item in currOrder) {
      var tmp = currOrder[item];
      currCost = currCost + tmp.foodNum*tmp.foodPrice;
    }

    if (state==0) {
      this.setData({
        [key]: 1,
        [cost]: currCost,
      })
    }
  },

  changeTableState: function(e) {
    var index = e.currentTarget.dataset.index;
    var tmp=0;
    var key="tableList["+index+"].tableState";
    var currList = this.data.tableList[index].orderList;
    var currState = this.data.tableList[index].tableState;
    //console.log(currState);
    //console.log(currList)
    for (var item in currList) {
      var tmp_order=currList[item]
      if (tmp_order.orderState==0) {
          tmp=tmp+1;
      }
    }
    if (currState!=0) {
      if (tmp == 0) {
        this.setData({
          [key]: 2,
        })
      } else {
        this.setData({
          [key]: 1,
        })
      }
    }
  },

  finishPay: function(e) {
    isPay=true;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认用户已支付？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定')
          var index = e.currentTarget.dataset.index;
          var key = "tableList[" + index + "]";
          let tmpid = that.data.tableList[index].tableID;

          var tableOrder = key + ".orderList";
          var tableCost = key + ".totalCost";
          var tableState = key + ".tableState";
          var orderNum = key + ".orderNum";

          var list = that.data.orderList;
          console.log("index" + index + "current list: " + list)
          var time = util.formatTime(new Date());

          var addItem = {
            'table': tmpid,
            'list': that.data.tableList[index].orderList,
            'cost': that.data.tableList[index].totalCost,
            'time': time,
          };

          list.push(addItem);

          that.setData({
            currTable: 0,
            orderList: list,
            [tableOrder]: [],
            [tableCost]: 0,
            [tableState]: 0,
            [orderNum]: 0
          })
        } else if (res.cancel) {
          console.log('点击取消')
        }
      }
    }),
    this.data = that.data;
  },
  
  toggleTable: function (e) {
    if (!isPay) {
      var index = e.currentTarget.dataset.index;
      let tmp = !this.data.showTable[index];
      var key = "showTable[" + index + "]";
      this.setData({
        currTable: index,
        [key]: tmp,
      })
    }
    isPay=false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
        clientWidth = res.windowWidth,
        rpxR = 750 / clientWidth;
        //console.log("系统高度" + clientHeight);
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: clientHeight,
        })
        //console.log("窗口高度"+calc)
      },
    })
    if(isAdd) {
      var list=wx.getStorageSync('newList');
      this.setData({
        foodList:list,
        currentTab:options.currentTab,
      })

      isAdd = false;
    }
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

  // 滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },

  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
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