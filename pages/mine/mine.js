// pages/mine/mine.js
const app=getApp()
Page({
  data: {
    nickName:'',
    avatarUrl:''
  },
  onLoad: function (options) {
    this.setData({
      nickName:app.globalData.nickName,
      avatarUrl:app.globalData.avatarUrl
    })
  },

})