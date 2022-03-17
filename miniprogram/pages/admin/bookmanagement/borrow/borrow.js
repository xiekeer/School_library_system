// pages/admin/bookmanagement/borrow/borrow.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
const readerdb= db.collection("reader")
const _ = db.command
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
    reservedby:"",
    borrowedby:"",
    //借阅时长
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
    var that=this
    //读取表单数据
    let {bookid,readerid}=e.detail.value
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    let date = new Date()
    //返回借阅开始时间
    let borrowedbegin = util.formatDate(date)
    //计算借阅结束时间
    date.setDate(date.getDate() + that.data.maxborrowday);
    let borrowedend = util.formatDate(date)
    //打印检查时间
    //console.log(borrowedbegin)
    //console.log(borrowedend)
    //内容输入不全提示
    if (!bookid||!readerid){
      wx.showToast({
          icon:'none',
          title: '请输入学生证号和书籍号码',
        })
      return;
    }else{      
      readerdb.doc(readerid).get({
        //若读者存在
        success: res=>{
           //查询书籍是否存在以及找到是否有预订  
            bookdb.doc(bookid).get({
              success: res=>{
                console.log("bookres "+ res.data.borrowedby)                
                /* that.setData({
                  reservedby: res.data.reservedby,
                  borrowedby: res.data.borrowedby,
                }) */
                let reservedby =res.data.reservedby
                let borrowedby = res.data.borrowedby
                let waitinglist = res.data.waitinglist
                if (waitinglist.length==0){
                  waitinglist =['']
                }
                //console.log('reservedby'+reservedby)
                //console.log('borrowedby'+borrowedby)
                console.log('waitinglist '+ waitinglist)
                //若书籍已借出
                if (borrowedby!=''){
                  wx.showToast({
                    icon: 'none',
                    title: '书籍未归还',
                  })
                  //清空书籍编号输入框
                  setTimeout(() => { 
                    this.setData({
                      'bookid': ''
                      })
                  }, 10)  
                }else{
                  //如果书籍未被预约或者预约人是请求读者
                  if (reservedby ==''|| reservedby==readerid){    
                    console.log("更新书籍：借阅人，借阅开始时间，借阅结束时间，续借次数重置")
                    //更新书籍：借阅人，借阅开始时间，借阅结束时间，续借次数重置,重置预约人
                    bookdb.doc(bookid).update({
                      data: {
                        borrowedby:readerid,
                        borrowedbegin:borrowedbegin,
                        borrowedend:borrowedend,
                        renewtime:0,
                        reservedby:waitinglist[0],
                        waitinglist: _.shift(),
                      },
                      success: res => {
                        //console.log(res.stats.updated)
                        //若图书状态更新
                        if(res.stats.updated==1){
                          console.log('书籍借阅成功')
                          wx.showToast({
                            title: '书籍借阅成功',
                          })
                          //清空书籍编号输入框
                          setTimeout(() => { 
                            this.setData({
                              'bookid': ''
                              })
                          }, 10)  
                        }else{
                          //若图书状态没有更新
                          wx.showToast({
                            icon: 'none',
                            title: '书籍不存在或已借阅',
                          })
                          //清空书籍编号输入框
                          setTimeout(() => { 
                            this.setData({
                              'bookid': ''
                              })
                          }, 10)  
                        }               
                      },
                      fail: err => {
                        //若图书更新失败
                        wx.showToast({
                          icon: 'none',
                          title: '书籍借阅失败',
                        })
                        //清空书籍编号输入框
                        setTimeout(() => { 
                          this.setData({
                            'bookid': ''
                            })
                        }, 10)  
                        console.error('[数据库] [更新记录] 失败：', err)
                      }
                    })
                  }else{
                    wx.showToast({
                      icon:'none',
                      title: '书籍已被预订',
                    })
                    //清空书籍编号输入框
                    setTimeout(() => { 
                      this.setData({
                        'bookid': ''
                        })
                    }, 10)  
                  } 
                }               
              },
              fail:err =>{
                wx.showToast({
                  icon:'none',
                  title: '书籍不存在',
                })
                //清空书籍编号输入框
                setTimeout(() => { 
                  this.setData({
                    'bookid': ''
                    })
                }, 10)  
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
          //清空书籍编号输入框
          setTimeout(() => { 
            this.setData({
              'readerid': ''
              })
          }, 10)  
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