var util = require('../../../utils/util.js');
var apiURL ='https://meal.mlg.kim'
var isPay=false;
var isUpdate=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList:[
      /*{
        "tableID":1,
        "orderList":[
          {
            "orderID":1,
            "orderDetail":[
              {
                "foodID": 0,
                "name": "平菇",
                "price": 3.00,
                "number": 2,
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
                "name": "花椰菜",
                "price": 2,
                "number": 3,
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
                "name": "平菇",
                "price": 3.00,
                "number": 2,
                "foodState":1
              },
              {
                "foodID": 2,
                "name": "猪里脊",
                "price": 6,
                "number": 3,
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
      }*/
    ],
    foodList:[],
    orderList:[],
    resName: '真香',
    currentTab: 0,
    scrollLeft: 0,
    winHeight:"",
    currTable:0,
    showTable:[],
    tableNum:7,
    currType:0,
    showModalStatus: false,
    hiddenModal:false,
    isfirst:true
  },
  input: function (e) {
    this.setData({ tableNum: e.detail.value })
  },

  modelConfirm: function (e) {
    this.setData({ hiddenModal: true })
    let that = this;
    if (this.data.tableNum) {
      wx.showToast({
        title: '您的餐台数为' + this.data.tableNum,
        icon: 'none'
      })

      var boolarr = [];
      for (var i = 0; i < this.data.tableNum; i++) {
        console.log('test')
        boolarr[i] = false;
      }
      this.setData({
        showTable: boolarr,
      })
      //console.log(boolarr)
    } else {
      wx.showToast({
        title: '您尚未输入餐台数！',
        icon: 'none'
      })
    }
    getApp().globalData.tableNum=this.data.tableNum;
  },

  modelCancel: function (e) {
    this.setData({ hiddenModal: true })
    wx.showToast({
      title: '您尚未输入餐台数！',
      icon: 'none'
    })
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
    //console.log('current state')
    //console.log(this.data.tableList[tableid].orderList[orderid].orderDetail[dishid].foodState)
  },


  deleteFood: function(e) {
    var foodtype=this.data.currType;
    var index=e.currentTarget.dataset.dish;
    var list = this.data.foodList[foodtype].foods;
   // console.log(list)
   // console.log("当前食品"+index)
    var key="foodList["+foodtype+"].foods";
    if (index>-1) {
      list.splice(index,1);
    }
    
    this.setData({
      [key]:list
    })
    console.log(this.data.foodList[foodtype].foods)
  },

  selectType: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      currType: index,
      // scrollTop: 1186
    })
  },
  
  toAdd:function(e) {
    wx.redirectTo({
      url: '../add/add',
    })
    isUpdate=true;
  },

  toChange:function(e) {
    var foodtype = this.data.currType;
    var foodindex = e.currentTarget.dataset.dish;
    //console.log('查看食物类型'+foodtype)
    //console.log('查看食物脚标'+foodindex)
    if (foodindex > -1) {
      console.log(this.data.foodList[foodtype].foods[foodindex])
      wx.setStorageSync('currDish', this.data.foodList[foodtype].foods[foodindex])
    } 
    wx.redirectTo({
      url: '../change/change',
    })
    isUpdate = true;
  },

  

  finishDish: function(e) {
    //console.log(e.currentTarget.dataset.index)
    var order = e.currentTarget.dataset.orderid;
    var tableid = e.currentTarget.dataset.index;
    var foodid = e.currentTarget.dataset.foodindex;


    var table = this.data.tableList[tableid];
    var foodstate = table.orderList[order].orderDetail[foodid].statues;
    var currCost=table.totalCost;
    var currFoodPrice = table.orderList[order].orderDetail[foodid].price;
    var currFoodNum = table.orderList[order].orderDetail[foodid].number;
    // 更新总消费金额
    currCost=currCost+currFoodNum*currFoodPrice;

    var statekey="tableList["+tableid+"].orderList["+order+"].orderDetail.["+foodid+"].statues";
    var costkey="tableList["+tableid+"].totalCost";

    this.setData({
      [statekey]:1,
      [costkey]:currCost,
    })
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
      if (tmp.statues!=1) {
          finishAll=false;
          break;
      }
    }
    if (finishAll) {
      /*for (var item in currOrder) {
        var tmp = currOrder[item];
        currCost = currCost + tmp.number * tmp.price;
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
         // console.log('点击确定')
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
        //  console.log('点击取消')
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
    this.setData({
      isfirst:false,
    })
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

    wx.request({
        url: `${apiURL}/user/food`,
        success: (res) => {
          wx.hideLoading();
          //console.log(res.data);
          that.setData({
            foodList: res.data,
            loading: true
          })
        }
    })

    //初始化餐台
    //console.log(that.data)
    var tablenum = that.data.tableNum
    var list1 = that.data.tableList;
    for (var i = 0; i < tablenum; i++) {
      if (!list1[i]) {
        var item = {
          "tableID": i + 1,
          "orderList": [],
          "tableState": 0,
          "orderNum": 0,
          "totalCost": 0,
        }
        list1[i] = item
      }
    }
    that.setData({
      tableList: list1,
    })

    this.getTableInfo().then(()=> {
      var tstate = 0;
      // 计算cost
      for (var table in that.data.tableList) {
        var currCost = that.data.tableList[table].totalCost;
        var key = "tableList[" + table + "].totalCost";
        var statekey = "tableList[" + table + "].tableState";
        //console.log(that.data.tableList[table])
        for (var order in that.data.tableList[table].orderList) {
          //console.log('order循环')
          var teststate = 0;

          for (var item in that.data.tableList[table].orderList[order].orderDetail) {

            //console.log('dish循环')
            var tmp = that.data.tableList[table].orderList[order].orderDetail[item];
            if (that.data.tableList[table].orderList[order].orderState == 0) {
              teststate++;
            }
            if (tmp.foodState == 1) {
              currCost = currCost + tmp.number * tmp.price;
              that.setData({
                [key]: currCost,
              })
            }

          }
          if (teststate == 0) {
            that.setData({
              [statekey]: 2
            })
          } else {
            that.setData({
              [statekey]: 1
            })
          }
          //console.log('current state:' + that.data.tableState)
        }
      }}
    )
  },
  
  getTableInfo: function() {
    var that = this;
    const promise = new Promise((resolve) => {
      wx.request({
      url: `https://meal.mlg.kim/admin/order?openid=test`,
      success: (res) => {
        //console.log(res)
        var data = res.data;
        for (var item in data) {
          var tmp = data[item];
          // 未结账订单
          if (!tmp.orderPayed) {
            var currtable = that.data.tableList[tmp.desk_num - 1];
            // 判断当前订单的状态
            var finishAll = true;
            for (var dish in tmp.currCart) {
              var tmpfood = tmp.currCart[dish];
              if (tmpfood.statues != 1) {
                finishAll = false;
                break;
              }
            }
            var orderstate = 0;
            if (finishAll) {
              orderstate = 1;
            }
            // 当前餐台已有订单
            
            if (currtable) {
              var indexnum=tmp.desk_num-1;
              var key ='tableList['+indexnum+'].orderList'
              var orderitem = {
                "orderID": ++currtable.orderNum,
                "orderDetail": tmp.currCart,
                "orderState": orderstate,
              }
              var list = currtable.orderList;
              list.push(orderitem);
              that.setData({
                [key]:list,
              })
            } 
          }
        }
        resolve()
        //console.log(that.data.tableList)
      },
    })
    })
    return promise;
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