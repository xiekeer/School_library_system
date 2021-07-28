// pages/reader/user/user.js
const db = wx.cloud.database()
const readerdb= db.collection("reader")
Page({
  /**
   * 页面的初始数据
   */
  data: {
      readerinfo:null,
      birthday:"",
  },

  //出生日期选择器
  bindBirthdayChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  //退出登录
  logout:function (){
    getApp().globalData.loginid = '';
    wx.reLaunch({   
      url: '/pages/index/index'
    })
  },
 //提交更改
  modifyReader:function(e){
    //读取表单数据
    let {readerid,password,passwordconfirm,name,birthday,studentid}=e.detail.value
    
    if(password==passwordconfirm ){
      //有新密码且密码不为空
      if(password!=''){
        //更新用户数据带密码
        readerdb.doc(readerid).update({
          data: {
            password:password,
            name:name,
            birthday:birthday,
            studentid:studentid          
          },success: res => {
            //若更新用户数据成功
            wx.showToast({
              title: '更新成功',
            })
            /* wx.navigateBack({
              delta: 1
            })     */    
          },
          fail: err => {
            //更新用户数据失败
            wx.showToast({
              icon: 'none',
              title: '更新失败',
            })
            console.error('[数据库] [更新记录] 失败：', err)
          },
          
        })
      }else{
        //更新用户数据无密码
        readerdb.doc(readerid).update({
          data: {
            name:name,
            birthday:birthday,
            studentid:studentid          
          },success: res => {
            //若更新用户数据成功
            wx.showToast({
              title: '更新成功',
            })
            /* wx.navigateBack({
              delta: 1
            })       */  
          },
          fail: err => {
            //更新用户数据失败
            wx.showToast({
              icon: 'none',
              title: '更新失败',
            })
            console.error('[数据库] [更新记录] 失败：', err)
          },
          
        })
      }      
    }else{
      wx.showToast({
        icon:'none',
        title: '密码和验证密码不同',
      })
    } 


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取登录id（即借书卡号）
    let readerid = getApp().globalData.loginid
    //从数据库获取用户信息保存到readerinfo中
    readerdb.doc(readerid).get().then(res => {
       this.setData({
        readerinfo:res.data,
        birthday: res.data.birthday,
        
       })
     }
    )
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