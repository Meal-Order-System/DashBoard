
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:[],
    img_path:'',
    uploadSuc:false,
    img_url:'',
    tipString:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list=wx.getStorageSync('currFoodList');
    var str='';
    var count = 0;
    for(var item in list) {
      var tmp = list[item];
      if (count==0) {
        str = str + '如果为' + tmp.name + '输入' + count;
      } else {
        str = str + '; 如果为' + tmp.name + '输入' + count;
      }
      count = count + 1;
    }
    //console.log(str);
    this.setData({
      foodList:list,
      tipString:str
    })

  },

  formSubmit: function (e) {
    var tmp = e.detail.value;
    var item=[];
    item={
      'foodName':tmp.name,
      'foodPrice':tmp.price,
      'foodDetail':tmp.detail,
      'img_url':this.data.img_path
    }
    var foodtype=tmp.type;

    var typelist=this.data.foodList[foodtype].list;
    var key='foodList['+foodtype+"].list"
    typelist.push(item);
    this.setData({
      [key]:typelist,
    }),
    
    wx.showModal({
      title: '提示',
      content: '增加菜品成功！',
    })
    wx.redirectTo({
      url: '../main/main?currentTab=1',
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
        that.setData({
          img_path: res.tempFilePaths[0],
        })
        
        wx.uploadFile({
          url: 'https://meal.mlg.kim/admin/food/uploadImg',
          filePath: that.data.img_path,
          name: 'file',
          //formData:
          success: function (res) {
            console.log(res);
            that.setData({
              uploadSuc: true,
              img_url: res.data
            })
          }
        })
      },
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