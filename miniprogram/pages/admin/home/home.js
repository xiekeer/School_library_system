// pages/admin/home/home.js
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
      name: '扫码录书'
    }, {
      icon: 'text',
      color: 'blue',
      name: '借书单'
    }, {
      icon: 'text',
      color: 'orange',
      name: '借阅历史'
    },
    {
      icon: 'peoplelist',
      color: 'blue',
      name: '读者管理'
    },
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