const db = wx.cloud.database();
const article = db.collection('article')
const collection = db.collection('collection')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中...',
    })
    this.data.openid = options.id;
    collection.where({
      aid: options.id
    }).count({
      success: res => {
        console.log(res.total)
        if (res.total > 0) {
          article.doc(this.data.openid).get({
            success: res1 => {
              // console.log(res1.data._id)
              var date = new Date(res1.data.date).toLocaleString()
              this.setData({
                article1: res1.data,
                date: date,
                love: true
              })
              wx.hideLoading()
            }
          })
        } else {
          article.doc(this.data.openid).get({
            success: res1 => {
              // console.log(res1.data._id)
              var date = new Date(res1.data.date).toLocaleString()
              this.setData({
                article1: res1.data,
                date: date,
                love: false
              })
              wx.hideLoading()
            }
          })
        }
      }
    })
  },

  collection: function(e) {
    if (this.data.love == false) {
      collection.add({
        data: {
          aid: this.data.openid,
					Author: this.data.article1.Author,
					content: this.data.article1.content,
					img: this.data.article1.img,
					title: this.data.article1.title,
					Recommended: this.data.article1.Recommended,
					Popular: this.data.article1.Popular,
          love: true
        },
        success: res => {
					wx.showToast({
						title: '收藏成功',
					})
          this.setData({        
            love: true
          })
        }
      })
    } else {
      wx.cloud.callFunction({
				name:'noColl',
				data:{
					aid:this.data.article1._id
				},
				success:res =>{
					wx.showToast({
						title: '取消收藏',
					})
					this.setData({
						love:false
					})
				},
				fail:res =>{
					console.log(res)
					
				}
			})

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // article.doc(this.data.openid).get({
    //   success: res1 => {
    //     // console.log(res1.data._id)
    //     // var date = new Date(res1.data.date).toLocaleString()
    //     // this.setData({
    //     //   article1: res1.data,
    //     //   date: date
    //     // })
    //     collection.where({
    //       aid: this.data.openid,
    //     }).get({
    //       success: res => {
    //         console.log(res.data.length)
    //         if (res.data.length < 1) {
    //           // console.log(res.data)
    //           collection.add({
    //             data: {
    //               aid: this.data.openid,
    //               Author: res1.data.Author,
    //               content: res1.data.content,
    //               img: res1.data.img,
    //               title: res1.data.title,
    //               Recommended: res1.data.Recommended,
    //               love: false
    //             },
    //             success: res => {
    //               this.setData({
    //                 _id: res._id,
    //                 love: false
    //               })
    //               wx.hideLoading()
    //             }
    //           })
    //         } else if (res.data.length == 1) {
    //           this.setData({
    //             _id: res.data[0]._id,
    //             love: res.data[0].love
    //           })
    //           wx.hideLoading()
    //         }
    //       },
    //       fail: res => {
    //         console.log(111)
    //       }
    //     })
    //   }
    // })
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