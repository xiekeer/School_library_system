// pages/reader/list/reservelist.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservelist:null,
    waitinglist:null
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
      bookdb.where({reservedby:id}).get({
        success: res =>{
          this.setData({
            reservelist:res.data
          })
        }
      })
      bookdb.where({waitinglist:id}).get({
        success: res =>{
          this.setData({
            waitinglist:res.data
          })
        }
      })
    }
    
    
  },
  // 取消预约书籍功能
  cancleReserveBook:function(event){
    let that=this
    //返回当前书籍id
    let bookid= event.currentTarget.dataset.bookid
    let index = event.currentTarget.dataset.index  
    let bookwaitinglist = event.currentTarget.dataset.bookwaitinglist
    console.log(bookwaitinglist)
    if (bookwaitinglist.length==0){
      bookwaitinglist =['']
    }
    //更新图书预约
    bookdb.doc(bookid).update({
      data: {
        reservedby:bookwaitinglist[0],
        waitinglist: _.shift(),
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

  cancleWaitinglistBook:function(event){
    let id=getApp().globalData.loginid
    let that=this
    //返回当前书籍id
    let bookid= event.currentTarget.dataset.bookid
    let index = event.currentTarget.dataset.index  
    //更新图书等待列表
    bookdb.doc(bookid).update({
      data: {
        waitinglist:_.pull(id),
      },
      success: res => {
        //若图书预约取消成功
        wx.showToast({
          title: '图书预约已取消',
        })
         let updatedlist = that.data.waitinglist
        updatedlist.splice(index,1)
        that.setData({
          waitinglist:updatedlist
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