//index.js
//获取应用实例
const app = getApp()
Page({
  globalData: {
    userInfo: null
  },
  data: {
    motto: '点餐',
    nickName: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindEntrance:function() {
    wx.navigateTo({
      url: '../../packageUser/pages/main/main',
    })
  },

  bindRestaurant:function() {
    wx.navigateTo({
      url:'../../packageRestaurant/pages/main/main',
    })
  },


  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  getUserInfo: function () {
    var openId = (wx.getStorageSync('openId'))
    var that = this;
    if (openId) {
      wx.getUserInfo({
        success: function (res) {
          console.log(res);
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            hasUserInfo: true,
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    } else {
      wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                wx.request({
                  //后台接口地址
                  url: 'https://meal.mlg.kim/user/login',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res);
                    // this.globalData.userInfo = JSON.parse(res.data);
                    wx.getUserInfo({
                      success: function (res) {
                        console.log(res);
                        that.setData({
                          nickName: res.userInfo.nickName,
                          avatarUrl: res.userInfo.avatarUrl,
                          hasUserInfo: true,
                        })
                      },
                      fail: function () {
                        // fail
                        console.log("获取失败！")
                      },
                      complete: function () {
                        // complete
                        console.log("获取用户信息完成！")
                        console.log(that.data)
                      }
                    })
                  }
                })
              }, fail: function () {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {
                                      wx.request({
                                        url: 'https://meal.mlg.kim/user/login',
                                        data: {
                                          code: res_login.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv
                                        },
                                        method: 'GET',
                                        header: {
                                          'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                          that.setData({
                                            nickName: res.data.nickName,
                                            avatarUrl: res.data.avatarUrl,

                                          })
                                          wx.setStorageSync('openId', res.data.openId);
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }, fail: function (res) {

                        }
                      })

                    }
                  }
                })
              }, complete: function (res) {


              }
            })
          }
        }
      })

    }
  },

  
  
})
