// pages/admin/bookmanagement/booklist/booklist.js
const db = wx.cloud.database()
const bookdb= db.collection("book")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noneview: false, //显示未找到提示
    searchlist: false, //显示列表
    searcharray:[], //搜索结果
  },
//搜索
search: function(e) {
  let searchtext = this.data.searchtext; //搜索框的值
  console.log('searchtext:' +searchtext)
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
//点击详情时跳转到详情页面
showBookDetail:function(event){
  //返回下标
  let index = event.currentTarget.dataset.index
  //将实体转为json字符串
  let queryBean = JSON.stringify(this.data.searcharray[index])
 //页面跳转并传递字符串
  wx.navigateTo({
    url: '/pages/admin/bookmanagement/booklist/bookdetail?queryBean=' +queryBean,
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