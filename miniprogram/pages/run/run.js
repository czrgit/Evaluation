const db = wx.cloud.database();
const article = db.collection('article')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    article.orderBy('date', 'desc').limit(10).get().then(res => {
      this.setData({
        article: res.data
      })
    })
  },
  goModify: function(e) {
    wx.navigateTo({
      url: '../modify/modify?id=' + e.currentTarget.dataset.id,
    })
  },
  dele: function(e) {
    console.log(e)
    article.doc(e.currentTarget.dataset.id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        this.onShow()
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
    let page = this.data.page + 10;
    if (this.data.total > page) {
      wx.showLoading({
        title: '数据加载中',
      })
      article.skip(page).get().then(res => {
        let new_data = res.data;
        let old_data = this.data.article
        this.setData({
          article: old_data.concat(new_data), //数组相加
          page: page
        })
        wx.hideLoading()
      })
    } else {
      wx.showToast({
        title: '到底了',
        image: '../../image/xl.png'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})