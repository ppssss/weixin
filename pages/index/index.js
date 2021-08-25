const app=getApp()
const screenH=app.globalData.screenH
const screenW=app.globalData.screenW
 Page({
   data:{
     style:`height:${screenH}px;
     background:url('${app.globalData.reqUrl}images/(1).jpg');
     background-size: 100% ${screenH}px;`,
     screenW
   },
   enter(){
     app.getUser()
     wx.switchTab({
       url: '../swiper/swiper',
     })
   }
 
})