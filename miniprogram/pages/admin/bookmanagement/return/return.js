// pages/admin/bookmanagement/return/return.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readerid: "",
    bookid: ""
  },
  //扫描读者图书证
  scanCodeReader: function() {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          readerid: res.result
        });
      }
    })
  },
  //扫描图书编码
  scanCodeBook: function() {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          bookid: res.result
        });
      }
    })
  },
  
  //还书
  returnBook: function(e) {
    //读取表单数据
    let {bookid}=e.detail.value

    //内容输入不全提示
    if (!bookid){
      wx.showToast({
          icon:'none',
          title: '请输入书籍号码',
        })
      return;
    }else{
      bookdb.doc(bookid).update({
        data: {
          borrowedby:"",
          borrowedbegin:"",
          borrowedend:"",
        },
        success: res => {
          wx.showToast({
            title: '书籍归还成功',
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '书籍归还失败',
          })
          console.error('[数据库] [更新记录] 失败：', err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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