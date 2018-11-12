const db = wx.cloud.database();
const user = db.collection('user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "授权请求",
    message: "本次授权将获取您的用户信息,但不包括其他敏感信息,请放心授权,不然部分功能将受限制!"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    // wx.cloud.callFunction({
    //     name: 'getOpenid',
    //     complete: res => {
    // 			this.setData({
    // 				_openid: res.result.openId,
    // 			})
    //       user.where({
    //         _openid: res.result.openId
    //       }).count().then(res => {
    //         console.log(res)
    //         if (res.total == 0) {
    //           this.setData({
    //             show: true,								
    //           })
    //         } else {
    //           console.log('数据存在')
    // 					user.where({
    // 						_openid: this.data._openid
    // 					}).field({
    // 						avatarUrl:true,
    // 						nickName:true
    // 					}).get({
    // 						success: res => {
    // 							this.setData({
    // 								user: res.data[0]
    // 							})
    // 							setTimeout(res => {
    // 								wx.hideLoading()
    // 							}, 1000)
    // 						},
    // 						fail: res => {
    // 							console.log(res)
    // 						}
    // 					})
    //         }
    //       })
    //     }
    //   })			     
  },

  bindgetuserinfo: function(e) {
    console.log(e)
    user.add({
        data: e.detail.userInfo,
        success: res => {
          console.log(res)
        }
      }),

      user.where({
        _openid: this.data._openid
      }).field({
        avatarUrl: true,
        nickName: true,
        _openid: true
      }).get({
        success: res => {
          this.setData({
            user: res.data[0]
          })
          setTimeout(res => {
            wx.hideLoading()
          }, 1000)
        }
      })
  },
	goAdmin:function(e){
		console.log(e)
		wx.navigateTo({
			url: '../admin/admin?id='+e.currentTarget.dataset.id,
		})
	},
  goToIndex: function(e) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  inList: function(e) {
    wx.navigateTo({
      url: '../coll/coll',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        this.setData({
          _openid: res.result.openId,
        })
        user.where({
          _openid: res.result.openId
        }).count().then(res => {
          console.log(res)
          if (res.total == 0) {
            this.setData({
              show: true,
            })
          } else {
            console.log('数据存在')
            user.where({
              _openid: this.data._openid
            }).field({
              avatarUrl: true,
              nickName: true
            }).get({
              success: res => {
                this.setData({
                  user: res.data[0]
                })
                setTimeout(res => {
                  wx.hideLoading()
                }, 1000)
              },
              fail: res => {
                console.log(res)
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
		
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})