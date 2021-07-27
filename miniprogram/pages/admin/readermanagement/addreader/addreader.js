// pages/admin/readermanagement/addreader/addreader.js
const db = wx.cloud.database()
const readerdb= db.collection("reader")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    readerid: "",
    readername: "",
    studentid: "",
    birthday: "2021-01-01",
    validate: "2022-01-01",
    password: "123456",
  },
  //扫描读者条形码
  scanCodeReader: function() {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          readerid: res.result
        });
      }
    })
  },
  //出生日期选择器
  bindBirthdayChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  //有效期选择器
  bindValidateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      validate: e.detail.value
    })
  },
//添加用户
addReader: function(e) {
  //读取表单数据
  let {readerid,readername,studentid,birthday,validate}=e.detail.value
  if (!readerid||!studentid||!validate){
    wx.showToast({
        title: '请完整填写内容',
      })
    return;
  }else{
    readerdb.add({
      data:{
        _id:readerid,
        password:this.data.password,
        name:readername,
        birthday:birthday,
        studentid:studentid,
        validate:validate
      },
      success:res =>{
        wx.showToast({
          title: '新增记录成功',
        })
      },
      fail:err=>{
        wx.showToast({
          icon: 'none',         
          title: '新增记录失败'
          
        })
        console.error(' 失败：', err)

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