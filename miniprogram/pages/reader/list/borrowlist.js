// pages/reader/list/borrowlist.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrowlist:null,
    //续借时间
    renewday:14,
    //续借最大次数
    maxRenewTimes:2,

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
    }else{
      bookdb.where({borrowedby:id}).get({
        success: res =>{
          this.setData({
            borrowlist:res.data
          })
        }
      })
    }
  },

  // 续借书籍功能
  renewBook:function(event){
    let that=this
    //返回当前书籍id
    let bookid= event.currentTarget.dataset.bookid
    let index = event.currentTarget.dataset.index
    let renewtime = event.currentTarget.dataset.renewtime+1
    let enddate = that.data.borrowlist[index].borrowedend
    console.log(enddate)
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    let date = new Date(enddate + ' 00:00:00')
    
    //计算借阅结束时间
    date.setDate(date.getDate() + this.data.renewday);
    let borrowedend = util.formatDate(date)
    //更新图书续借
    bookdb.doc(bookid).update({
      data: {
        borrowedend:borrowedend,
        renewtime: renewtime,
      },
      success: res => {
        //若图书续借成功
        wx.showToast({
          title: '图书续借成功',
        })
        var ss ='borrowlist[' + index +'].renewtime' 
        var ss2 ='borrowlist[' + index +'].borrowedend' 
        console.log(ss)
        that.setData({
          [ss]:renewtime,
          [ss2]:borrowedend,
        })
        console.log(searcharray[index].renewtime)
        console.log(searcharray[index].borrowedend)
      },
      fail: err => {
        //若图书续借失败
        wx.showToast({
          icon: 'none',
          title: '图书续借失败',
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