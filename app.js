// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
   
   
   
  },

  getUser(){
   let that=this
      wx.getUserProfile({
    desc: 'desc',
    success:res=>{
      that.globalData.avatarUrl=res.userInfo.avatarUrl;
      that.globalData.nickName=res.userInfo.nickName;
    },
    fail:e=>{
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  })
  
  },


  globalData: {
    userInfo: null,
    reqUserUrl:'http://192.168.1.13:1337/users/',
    reqUrl:'http://192.168.1.13:1337/',
    reqUpload:'http://192.168.1.13:1337',
    opendId:'',
   screenH:wx.getSystemInfoSync().windowHeight,
   screenW:wx.getSystemInfoSync().windowWidth,
   avatarUrl:'',
   nickName:''
  }
})
