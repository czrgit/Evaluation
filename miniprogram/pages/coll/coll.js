const db = wx.cloud.database();
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
    
  },
  noColl: function(e) {
    let id = e.currentTarget.dataset.id;
    collection.doc(id).remove({
      success: res => {
       wx.navigateTo({
				 url: '../coll/coll',
				 success: res => {
					 wx.showToast({
						 title: '取消成功',
						 duration: 2000
					 })
					 this.onShow()
				 }
			 })
      }
    })
  },
  goInfo: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../info/info?id=' + id,
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
  onShow: function() {
		wx.showLoading({
			title: '数据加载中...',

		}),
		
		collection.where({
			love: true
		}).get({
			success: res => {
				console.log('还剩' + res.data.length)
				if (res.data.length==0){
					this.setData({
						hidden: true
					})
				}else{
					this.setData({
						coll: res.data
					})
						
				}
				wx.hideLoading()
			}
		})
  },
	addArticle:function(e){
		wx.switchTab({
			url: '../list/list',
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