// pages/reader/home/home.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noneview: false, //显示未找到提示
    searchlist: false, //显示列表
    searcharray:[], //搜索结果
    id:''
  },

  //搜索
  search: function(e) {
    let searchtext = this.data.searchtext; //搜索框的值
    //console.log('searchtext:' +searchtext)
    if (searchtext != "") {
      //模糊查询
      bookdb.where(db.command.or([
      {
        _id: db.RegExp({
          regexp: '.*'+searchtext,
          options:'i',
        })
      },
      {
        title:db.RegExp({
          regexp: '.*'+searchtext,
          options:'i',
        })
      },
      {
        isbn:db.RegExp({
          regexp: '.*'+searchtext,
          options:'i',
        })
      },
      ])).get({
        success: res =>{
          if (res.data.length >0){  
            this.setData({
              noneview: false, //隐藏未找到提示
              searchlist: true, //显示列表
              searcharray:res.data,
            })
          }else{
            this.setData({
              noneview: true, //显示未找到提示
              searchlist: false, //隐藏列表
            })
          }         
        }          
      })
    }    
  },

  //搜索框的值
  searchinput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        sarchlist: false, //隐藏列表
        searcharray:[] //初始化结果列表
      });     
    }
    this.setData({
      searchtext: e.detail.value
    })
  },
  // 预定书籍功能
  reserveBook:function(event){
    let that=this
    //返回当前书籍id和读者id
    let bookid= event.currentTarget.dataset.bookid
    let readerid= getApp().globalData.loginid
    let index = event.currentTarget.dataset.index
    //更新图书预约情况:
    //获取该书预约情况
    bookdb.doc(bookid).get().then(res => {
      //console.log(res.data.reservedby)
      //若该书无人预约
      if (res.data.reservedby == ""){
        //更新预约人
        bookdb.doc(bookid).update({
          data: {
            reservedby:readerid,
          },
          success: res => {
            //若图书预约成功
            wx.showToast({
              title: '图书预约成功',
            })
            var ss ='searcharray[' + index +'].reservedby' 
            console.log(ss)
            that.setData({
              [ss]:readerid,
            })
            console.log(searcharray[index].reservedby)
          },
          fail: err => {
            //若图书预约失败
            wx.showToast({
              icon: 'none',
              title: '图书预约失败',
            })
            console.error('[数据库] [更新记录] 失败：', err)
        }
      }
      
      )
      }
      //若该书有人预约
      else{
        //判断预约人是否为当前学生证号
        if (res.data.reservedby == readerid)
        {
          //预约人是当前学生证号，显示已预约
          wx.showToast({
            title: '图书已预约',
          })
        }else{
          //预约人不是当前学生证号
          //判断预约人是否已在waitinglist中, 找出当前id在waitinglist中的位置，若为-1，则该值不存在
          let waitinglist = res.data.waitinglist
        
          console.log("waitinglist:" + waitinglist)
          let idIndex = waitinglist.indexOf(readerid)
          console.log(idIndex)
          //若不在列表中
          if (idIndex == -1){
            //加入waitinglist，使用command指令中的push
            bookdb.doc(bookid).update({
              data: {
                waitinglist:_.push(readerid),
              },
              success: res => {
                //若图书等待列表更新成功，显示
                wx.showToast({
                  title: '您已加入等待列表',
                })
                var ss ='searcharray[' + index +'].waitinglist' 
                console.log(ss)
                that.setData({
                  [ss]:readerid,
                })
                console.log(searcharray[index].waitinglist) 
              },
              fail: err => {
                //若图书等待列表更新失败
                wx.showToast({
                  icon: 'none',
                  title: '图书预约失败',
                })
                console.error('[数据库] [更新记录] 失败：', err)
              }
            })

          }else{
            //若已在列表中，显示已在等待列表中
            wx.showToast({
              title: '已在等待列表中',
            })
          }
          
        }      
      }
    })
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
    //获取读者id用于页面显示
   this.setData({
     id:getApp().globalData.loginid
   })
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