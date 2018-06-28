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
                "foodNum": 2,
                "foodState":1
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
                "foodNum": 3,
                "foodState":2
              }
            ],
            "orderState": 0
          }
        ],
        "totalCost":0,
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
                "foodNum": 2,
                "foodState":1
              },
              {
                "foodID": 2,
                "foodName": "猪里脊",
                "foodPrice": 6,
                "foodNum": 3,
                "foodState":0
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
            foodID:0,
            foodName: "平菇",
            img_url: "",
            foodDetail: "平菇",
            foodPrice: 3.00
          },
          {
            foodID:1,
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
            foodID:0,
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
    currType:0,
    showModalStatus: false,
  },

  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.status;
    this.util(currentStatu);
  },

  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },

  cancelDish: function(e) {
    var tableid=e.currentTarget.dataset.index;
    var orderid=e.currentTarget.dataset.orderid;
    var dishid=e.currentTarget.dataset.foodindex;
    var key="tableList["+tableid+"].orderList["+orderid+"].orderDetail";
    var orderlist = "tableList[" + tableid + "].orderList";
    var currOrderDetail = this.data.tableList[tableid].orderList[orderid].orderDetail;
    console.log(currOrderDetail)
    if (dishid >-1) {
      currOrderDetail.splice(dishid,1);
    }
    var len = 0;
    for (var item in currOrderDetail) {
      len = len+1;
    }
    console.log(len)
    if (!len) {
      var currOrderList=this.data.tableList[tableid].orderList;
      if (orderid>-1) {
        currOrderList.splice(orderid,1)
      }
      this.setData({
        [orderlist]:currOrderList,
      })
    } else {
      this.setData({
        [key]: currOrderDetail,
      })
    }
  },

  prepareDish: function(e) {
    var tableid = e.currentTarget.dataset.index;
    var orderid = e.currentTarget.dataset.orderid;
    var dishid = e.currentTarget.dataset.foodindex;
    var key = "tableList[" + tableid + "].orderList[" + orderid + "].orderDetail["+dishid+"].foodState";

    var currState = this.data.tableList[tableid].orderList[orderid].orderDetail[dishid].foodState;
    if (currState==2) {
      this.setData({
        [key]: 0,
      })
    }
    console.log('current state')
    console.log(this.data.tableList[tableid].orderList[orderid].orderDetail[dishid].foodState)
  },


  deleteFood: function(e) {
    var foodtype=this.data.currType;
    var index=e.currentTarget.dataset.dish;
    var list = this.data.foodList[foodtype].list;
   // console.log(list)
   // console.log("当前食品"+index)
    var key="foodList["+foodtype+"].list";
    if (index>-1) {
      list.splice(index,1);
    }
    
    this.setData({
      [key]:list
    })
    console.log(this.data.foodList[foodtype].list)
  },

  changeFood:function(e) {

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

  finishDish: function(e) {
    console.log(e.currentTarget.dataset.index)
    var order = e.currentTarget.dataset.orderid;
    var tableid = e.currentTarget.dataset.index;
    var foodid = e.currentTarget.dataset.foodindex;


    var table = this.data.tableList[tableid];
    var foodstate = table.orderList[order].orderDetail[foodid].state;
    var currCost=table.totalCost;
    var currFoodPrice = table.orderList[order].orderDetail[foodid].foodPrice;
    var currFoodNum = table.orderList[order].orderDetail[foodid].foodNum;
    // 更新总消费金额
    currCost=currCost+currFoodNum*currFoodPrice;

    var statekey="tableList["+tableid+"].orderList["+order+"].orderDetail.["+foodid+"].foodState";
    var costkey="tableList["+tableid+"].totalCost";

    this.setData({
      [statekey]:1,
      [costkey]:currCost,
    })
  },

  dealWait: function(e) {
    
  },

  finishOrder: function(e) {
    var order = e.currentTarget.dataset.orderid;
    var tableid = e.currentTarget.dataset.index;
    var table = this.data.tableList[tableid];

    var state=table.orderList[order].orderState;
    var key="tableList["+this.data.currTable+"].orderList["+order+"].orderState";
   // var cost = "tableList[" + this.data.currTable + "].totalCost";
    var currOrder = table.orderList[order].orderDetail;
    //var currCost = table.totalCost;

    var finishAll=true;
    for(var item in currOrder) {
      var tmp = currOrder[item];
      if (tmp.foodState!=1) {
          finishAll=false;
          break;
      }
    }
    if (finishAll) {
      /*for (var item in currOrder) {
        var tmp = currOrder[item];
        currCost = currCost + tmp.foodNum * tmp.foodPrice;
      }*/

      if (state == 0) {
        this.setData({
          [key]: 1,
          //[cost]: currCost,
        })
      }
    } else {
      wx.showModal({
        title:'提示',
        content:'存在尚未完成的菜品！'
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
    for (var table in this.data.tableList) {
      var currCost = this.data.tableList[table].totalCost;
      var key = "tableList["+table+"].totalCost";
      for (var order in this.data.tableList[table].orderList) {
        for (var item in this.data.tableList[table].orderList[order].orderDetail) {
          var tmp = this.data.tableList[table].orderList[order].orderDetail[item];
          if (tmp.foodState==1) {
            currCost = currCost+tmp.foodNum*tmp.foodPrice;
            this.setData({
              [key]:currCost,
            })
          }
        }
      }
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