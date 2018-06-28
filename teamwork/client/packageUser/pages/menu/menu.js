// pages/menu/menu.js
var apiURL= 'https://meal.mlg.kim'
var ifAdd = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
    ],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    showModalStatus: false,
    currentType: 0,
    currentIndex: 0,
    cartList: [],
    sumMonney: 0,
    totalNum: 0,
    showCart: false,
    loading: false
  },

  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
      // scrollTop: 1186
    })
    console.log(this.data.toView);
  },
  scroll: function (e) {
    console.log(e)
    var dis = e.detail.scrollTop
    if (dis > 0 && dis < 1189) {
      this.setData({
        activeIndex: 0,
      })
    }
    if (dis > 1189 && dis < 1867) {
      this.setData({
        activeIndex: 1,
      })
    }
    if (dis > 1867 && dis < 2180) {
      this.setData({
        activeIndex: 2,
      })
    }
    if (dis > 2180 && dis < 2785) {
      this.setData({
        activeIndex: 3,
      })
    }
    if (dis > 2785 && dis < 2879) {
      this.setData({
        activeIndex: 4,
      })
    }
    if (dis > 2879 && dis < 4287) {
      this.setData({
        activeIndex: 5,
      })
    }
    if (dis > 4287 && dis < 4454) {
      this.setData({
        activeIndex: 6,
      })
    }
    if (dis > 4454 && dis < 4986) {
      this.setData({
        activeIndex: 7,
      })
    }
    if (dis > 4986) {
      this.setData({
        activeIndex: 8,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  addToCart: function (e) {
    ifAdd = true;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentType: type,
      currentIndex: index
    });
    var a = this.data
    var isAdd = true;
    var addItem = {
      "name": a.listData[a.currentType].foods[a.currentIndex].name,
      "price": a.listData[a.currentType].foods[a.currentIndex].price,
      "number": 1,
      "sum": a.listData[a.currentType].foods[a.currentIndex].price,
    }
    var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].price;
    var cartList = this.data.cartList;
    for (var i = 0; i < cartList.length; i++) {
      if (cartList[i].name == addItem.name) {
        console.log(1);
        isAdd = false;
        cartList[i].number++;
        cartList[i].sum += cartList[i].price;
      }

    }
    if (isAdd)
      cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      totalNum: a.totalNum + 1
    });
    console.log(this.data.cartList)
  },
  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0,
      totalNum: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;

    this.setData({
      cartList: cartList,
      sumMonney: sum,
      totalNum: this.data.totalNum + 1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;

    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      totalNum: this.data.totalNum - 1
    });
  },
  goPay: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('totalNum', this.data.totalNum);
      wx.navigateTo({
        url: '../pay/pay'
      })
    }
  },
  toDetail(e) {
    //console.log("before click" + " " + ifAdd);
    if (!ifAdd) {
      //console.log(ifAdd);
      var dish_type = e.currentTarget.dataset.type;
      var index = e.currentTarget.dataset.index;
      console.log("获取所选择的菜品"+dish_type+index)
      this.setData({
        currentType: dish_type,
        currentIndex: index
      });
      var curr = this.data;
      wx.setStorageSync('dishDetail', this.data.listData[curr.currentType].foods[curr.currentIndex]);
      wx.navigateTo({
        url: '../dish/dish'
      })
    }
    ifAdd = false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '努力加载中',
    })
    wx.request(
      {
      url:`${apiURL}/user/food`,
      success: (res) => {
        wx.hideLoading();
        console.log(res.data);
        that.setData({
          listData: res.data,
          loading: true
        })
      }
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