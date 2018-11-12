const db = wx.cloud.database();
const article = db.collection('article')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked1: false,
    checked2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    article.doc(options.id).get({
      success: res => {
        console.log(res)
        this.setData({
					id:options.id,
          article: res.data,
          checked1: res.data.Recommended,
          checked2: res.data.Popular
        })
      }
    })
  },
  formSubmit: function(e) {
    console.log(e)
		var res = e.detail.value;
		console.log(res)
		if (res.title == null && res.content == null) {
			wx.showModal({
				title: '提交失败',
				content: '文章标题和文章内容不能为空',
				showCancel: false
			})
		} else {
			article.doc(this.data.id).update({
				data: {
					title: res.title,
					Author: res.Author,
					content: res.content,
					img: res.img,
					Recommended: res.Recommended,
					Popular: res.Popular,
				},
				success: res => {
					console.log(res)
					wx.showToast({
						title: '修改成功',
						icon: "../../image/xl.png"
					})
					wx.navigateTo({
						url: '../run/run',
					})
				}
			})
		}
  },
  upload: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths;
        var code;
        function createCode() {
          code = "";
          var codeLength = 12; //验证码的长度
          var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
          for (var i = 0; i < codeLength; i++) { //循环操作
            var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
            code += random[index]; //根据索引取得随机数加到code上
          }
          return code
        }
        let randString = createCode() + '.png';
        console.log(randString)
        wx.cloud.uploadFile({
          cloudPath: 'pingce/' + randString, // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            this.setData({
              imgUrl: res.fileID
            })
            wx.showToast({
              title: '上传成功',
            })
          },
          fail: err => {
            console.error(err)
          }
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  onChange1: function(e) {
    console.log(e)
    if (this.data.checked1 == false) {
      this.setData({
        checked1: true
      })
    } else {
      this.setData({
        checked1: false
      })
    }
    if (this.data.checked1 == true && this.data.checked2 == true) {
      wx.showModal({
        title: '错误',
        content: '精品推荐和热门推荐只能选一个',
        showCancel: false,
        success: res => {
          this.setData({
            checked1: false,
            checked2: false
          })
        }
      })
    }
  },
  onChange2: function() {
    if (this.data.checked2 == false) {
      this.setData({
        checked2: true
      })
    } else {
      this.setData({
        checked2: false
      })
    }
    if (this.data.checked1 == true && this.data.checked2 == true) {
      wx.showModal({
        title: '错误',
        content: '精品推荐和热门推荐只能选一个',
        showCancel: false,
        success: res => {
          this.setData({
            checked1: false,
            checked2: false
          })
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