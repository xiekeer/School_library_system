// pages/reader/list/reservelist.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservelist:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id= getApp().globalData.loginid
    bookdb.where({reservedby:id}).get({
      success: res =>{
        this.setData({
          reservelist:res.data
        })
      }
    })
  },
  // 取消预约书籍功能
  cancleReserveBook:function(event){
    let that=this
    //返回当前书籍id
    let bookid= event.currentTarget.dataset.bookid
    let index = event.currentTarget.dataset.index  
    //更新图书预约
    bookdb.doc(bookid).update({
      data: {
        reservedby:'',
      },
      success: res => {
        //若图书预约取消成功
        wx.showToast({
          title: '图书预约已取消',
        })
        let updatedlist = that.data.reservelist
        updatedlist.splice(index,1)
        that.setData({
          reservelist:updatedlist
        })
      },
      fail: err => {
        //图书预约取消失败
        wx.showToast({
          icon: 'none',
          title: '图书预约取消失败',
        })
        console.error('[数据库] [更新记录] 失败：', err)
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