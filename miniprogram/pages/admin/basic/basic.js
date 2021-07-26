// pages/admin/basic/basic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'home',
    iconListBook: [{
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
      menuurl: '/pages/admin/bookmanagement/addbook/addbook'
    }, {
      icon: 'text',
      color: 'blue',
      name: '图书列表',
      menuurl: '/pages/admin/bookmanagement/booklist/booklist'
    }
  ],
  iconListUser: [{
    icon: 'text',
    color: 'blue',
    name: '读者列表',
    menuurl: '/pages/admin/readermanagement/readerlist/readerlist'
  }, {
    icon: 'friendadd',
    color: 'orange',
    name: '增加读者',
    menuurl: '/pages/admin/readermanagement/addreader/addreader'
  }
],
iconListLib: [{
  icon: 'settings',
  color: 'blue',
  name: '图书馆规则',
  menuurl: '/pages/admin/libmanagement/home/home'
}, {
  icon: 'people',
  color: 'orange',
  name: '管理员信息',
  menuurl: '/pages/admin/admininfo/admininfo'
}
],
    gridCol:3
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