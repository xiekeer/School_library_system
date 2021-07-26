// pages/reader/basic/userbasic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'home',
    iconList: [
      {
        icon: 'vipcard',
        color: 'blue',
        name: '电子借书证',
        menuurl: '/pages/reader/barcode/barcode'
      },{
      icon: 'search',
      color: 'orange',
      name: '找书',
      menuurl: '/pages/reader/home/home'
    }, {
      icon: 'text',
      color: 'blue',
      name: '已借书籍',
      menuurl: '/pages/reader/list/borrowlist'
    }, {
      icon: 'text',
      color: 'orange',
      name: '已预约书籍',
      menuurl: '/pages/reader/list/reservelist'
    },  {
      icon: 'peoplelist',
      color: 'orange',
      name: '我的',
      menuurl: '/pages/reader/user/user'
    }
    
  ],
    gridCol:2
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
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