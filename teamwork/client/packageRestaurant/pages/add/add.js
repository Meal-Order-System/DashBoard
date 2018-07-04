Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:[],
    img_path:'',
    uploadSuc:false,
    url:'',
    typeTip:'',
    priceTip:'仅需要输入数字',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list=wx.getStorageSync('currFoodList');
    var str='';
    var count = 0;
    //console.log('查看是添加还是修改'+modify) 
    for(var item in list) {
      var tmp = list[item];
      if (count==0) {
        str = '当前分类: ' + tmp.name;
      } else {
        str = str + '/' + tmp.name;
      }
      count = count + 1;
    }
    //console.log(str);
    this.setData({
      foodList:list,
      typeTip:str,
    })

  },

  formSubmit: function (e) {
    this.uploadImage().then(()=> {
      var that = this;
      var temp = e.detail.value;
      //console.log(this.data);
      //console.log(this.data.url);
      //console.log('typename' + this.data.foodList[foodtype].name)
        wx.request({
          url: 'https://meal.mlg.kim/admin/updateFood',
          data: { name: temp.name, food_class: temp.type, price: temp.price, detail: temp.detail, image_path: that.data.url },
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
      //新建条目
      /*var item = [];
      item = {
        //'food_id': idcount + 1,
        'foodName': tmp.name,
        'foodPrice': tmp.price,
        'foodDetail': tmp.detail,
        'img_url': this.data.url
      }*/
     /* var key = 'foodList[' + foodtype + "].list"
      typelist.push(item);
      this.setData({
        [key]: typelist,
      }),
      // console.log(this.data.foodList[foodtype].list)
      wx.setStorageSync('newList', this.data.foodList);*/
      wx.redirectTo({
        url: '../main/main?currentTab=1',
      })
    })
  },

  // 弹窗显示照片提交方式

  chooseWay: function() {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择','拍照'],
      itemColor:"#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if(res.tapIndex==0) {
            that.chooseWxImage('album')
          } else if(res.tapIndex==1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
   
   //获取照片
  chooseWxImage:function(type) {
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

  uploadImage:function() {
    var that = this;
    const promise=new Promise((resolve)=> {
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