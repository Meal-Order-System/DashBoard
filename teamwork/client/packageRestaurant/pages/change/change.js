Page({

  /**
   * 页面的初始数据
   */
  data: {
    currFood:{},
    changeImage:false,
    url:'',
    img_path:'',
    uploadSuc:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curr=wx.getStorageSync('currDish');
    this.setData({
      currFood:curr,
    })
  },

  formSubmit: function (e) {

    var temp = e.detail.value;
    var mname=this.data.currFood.name;
    var mdetail=this.data.currFood.detail;
    var mclass=this.data.currFood.food_class;
    var mprice=this.data.currFood.price;
    if (temp.name) {
      mname=temp.name
    }
    if(temp.detail) {
      mdetail=temp.detail
    }
    if(temp.type) {
      mclass=temp.type
    }
    if(temp.price) {
      mprice=temp.price
    }
    if (this.data.changeImage) {
      this.uploadImage().then(() => {
        var that = this;
        wx.request({
          url: 'https://meal.mlg.kim/admin/updateFood',
          data: { food_id:that.data.currFood.food_id, name: mname, food_class: mclass, price: mprice, detail: mdetail, image_path: that.data.url },
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            //console.log(res);
            wx.showToast({
              title: '添加成功！',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      })

    } else {
        var that = this;
        wx.request({
          url: 'https://meal.mlg.kim/admin/updateFood',
          data: { food_id: that.data.currFood.food_id, name: mname, food_class: mclass, price: mprice, detail: mdetail, image_path: that.data.currFood.image_path },
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            //console.log(res);
            wx.showToast({
              title: '添加成功！',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
    }
    wx.redirectTo({
      url: '../main/main?currentTab=1',
    })
  },

  chooseWay: function () {
    this.setData({
      changeImage:true,
    })
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  //获取照片
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],

      success: function (res) {
        //console.log(res);
        //console.log('test path')
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          img_path: res.tempFilePaths[0],
          uploadSuc: true,
        })
      },
    })
  },

  uploadImage: function () {
    var that = this;
    const promise = new Promise((resolve) => {
      wx.uploadFile({
        url: 'https://meal.mlg.kim/admin/uploadImg',
        filePath: that.data.img_path,
        name: 'content',
        header: {
          "Content-Type": "multipart/form-data"
        },
        //formData:
        success: function (res) {
          //console.log(res)
          //console.log(res.data)
          //var data = JSON.parse(res.data);
          that.setData({
            url: (JSON.parse(res.data)).path,
          })
          resolve();
          //console.log(that.data.url)
        }
      })
    })
    return promise;
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