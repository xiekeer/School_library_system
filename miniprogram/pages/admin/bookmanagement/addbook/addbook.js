// pages/admin/bookmanagement/addbook/addbook.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookid: "",
    bookisbn: "",
    booktitle: "",
    booknote: ""
  },

  //扫描书籍编号
  scanCodeBookId: function() {
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
 
  //扫描书籍ISBN
  scanCodeBookIsbn: function() {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          bookisbn: res.result
        });
      }
    })
  },

  //添加图书
  addBook: function(e) {

    //读取表单数据
    let {bookid,bookisbn,booktitle,booknote}=e.detail.value
    //内容输入不全提示
    if (!bookid||!bookisbn||!booktitle){
      wx.showToast({
          title: '请完整填写内容',
        })
      return;
    }else{
      bookdb.add({
        data:{
          _id:bookid,
          title:booktitle,
          isbn:bookisbn,
          note:booknote,
          borrowedby:"",
          reservedby:"",
          borrowedbegin:"",
          borrowedend:"",
          renewtime:0,
          waitinglist:[],
        },
        success:res =>{
          wx.showToast({
            title: '新增记录成功',
          })
          /* //清空页面输入框
          setTimeout(() => { 
            this.setData({
              'bookid': '',
              'bookisbn': '',
              'booktitle': '',
              'booknote': '',
              })
          }, 15)   */
        },
        fail:err=>{
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error(' 失败：', err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果没有登录转到首页登录
    let id=getApp().globalData.loginid
    if (id=='' || id == null){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
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