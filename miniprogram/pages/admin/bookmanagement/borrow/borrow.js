// pages/admin/bookmanagement/borrow/borrow.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
const readerdb= db.collection("reader")
const util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readerid: "",
    bookid: "",
    borrowedbegin: "",
    borrowedend: "",
    maxborrowday: 30,


  },
  //扫描读者图书证
  scanCodeReader: function() {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        //console.log(res) //输出回调信息
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
        //console.log(res) //输出回调信息
        that.setData({
          bookid: res.result
        });
      }
    })
  },
  //借书
  borrowBook: function(e) {
    //读取表单数据
    let {bookid,readerid}=e.detail.value
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    let date = new Date()
    //返回借阅开始时间
    let borrowedbegin = util.formatDate(date)
    //计算借阅结束时间
    date.setDate(date.getDate() + this.data.maxborrowday);
    let borrowedend = util.formatDate(date)
    //打印检查时间
    //console.log(borrowedbegin)
    //console.log(borrowedend)
    //内容输入不全提示
    if (!bookid||!readerid){
      wx.showToast({
          icon:'none',
          title: '请输入图书证号和书籍号码',
        })
      return;
    }else{      
      readerdb.doc(readerid).get({
        //若读者存在
        success: res=>{        
            //更新书籍：借阅人，借阅开始时间，借阅结束时间，续借次数重置
            bookdb.doc(bookid).update({
              data: {
                borrowedby:readerid,
                borrowedbegin:borrowedbegin,
                borrowedend:borrowedend,
                renewtime:0,
              },
              success: res => {
                console.log(res.stats.updated)
                //若图书状态更新
                if(res.stats.updated==1){
                  console.log('书籍借阅成功')
                  wx.showToast({
                    title: '书籍借阅成功',
                  })
                }else{
                  //若图书状态没有更新
                  wx.showToast({
                    icon: 'none',
                    title: '书籍不存在或已借阅',
                  })
                }               
              },
              fail: err => {
                //若图书更新失败
                wx.showToast({
                  icon: 'none',
                  title: '书籍借阅失败',
                })
                console.error('[数据库] [更新记录] 失败：', err)
              }
            })            
        },
        //若读者不存在，提示
        fail:err=>{
          console.log('读者不存在')
          wx.showToast({
            icon: 'none',
            title: '读者不存在',
          })
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