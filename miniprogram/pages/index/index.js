// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()
const admindb= db.collection("admin")
const readerdb= db.collection("reader")

Page({
  data: {
    welcome: '欢迎使用\n纽伦堡中文学校图书馆系统',
    //表单数据
    id:"",
    password:"",
    warn:""
  },

  login:function(e){
    //读取表单数据
    let {id,password}=e.detail.value
    if (!id||!password){
      this.setData({
        warn:"请输入借书证号和密码"
      })
      return;
    } else{
      admindb.where({_id:id} && {password:password}).get().then(res => {
        console.log(res.data)
        //若结果存在
        if(res.data.length>0){
          //重置警告信息
          this.setData({
            warn:""
          })
          //将用户id存到全局变量中
          app.globalData.loginid = id;
          //页面跳转到读者首页
          wx.redirectTo({
            url: '/pages/admin/basic/basic'
          })
        }//若在admin表中未找到结果
        else{
          //在reader表中查询
          readerdb.where({_id:id} && {password:password}).get().then(res => {
            console.log(res.data)
            //若结果存在
            if(res.data.length>0){
              //重置警告信息
              this.setData({
                warn:"",
              })
              //将用户id存到全局变量中
              app.globalData.loginid = id;
              console.log(app.globalData.loginid)
              //页面跳转到管理员首页
              wx.redirectTo({
                url: '/pages/reader/basic/userbasic'
              })
            }//若没有找到，给出提示
            else{
              this.setData({
                warn:"用户名或密码错误"
              })
              return;
            }
          })
        }
      })
    }
  
  },
  
  adminlogin(){
    wx.navigateTo({
      url: '/pages/admin/basic/basic'
    })
  },
  onLoad() {

  }
  
})
