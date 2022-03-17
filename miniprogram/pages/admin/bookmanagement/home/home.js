// pages/admin/bookmanagement/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    iconList: [{
      icon: 'vipcard',
      color: 'blue',
      name: '借书',
      menuurl: '/pages/admin/bookmanagement/borrow/borrow'
    }, {
      icon: 'vipcard',
      color: 'orange',
      name: '还书',
      menuurl: '/pages/admin/bookmanagement/return/return'
    }, {
      icon: 'scan',
      color: 'blue',
      name: '扫码录书',
      menuurl: '/pages/admin/basic/basic'
    }, {
      icon: 'text',
      color: 'blue',
      name: '书籍状态',
      menuurl: '/pages/admin/bookmanagement/booklist/booklist'
    }, {
      icon: 'text',
      color: 'orange',
      name: '借阅历史',
      menuurl: '/pages/admin/basic/basic'
    }
  ],
    gridCol:3

  },

  IconTap(e) {
    var menuurl = e.currentTarget.dataset.menuurl;
    wx.navigateTo({
      url: menuurl
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