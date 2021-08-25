// pages/home/home.js
const app=getApp()
const screenH=app.globalData.screenH-34
Page({

  data: {
    screenH,
    current:0,
    navArr:[
      {id:0,title:'心经',dataType:'one'},
      {id:1,title:'金刚经',dataType:'two'},
      {id:2,title:'华严经',dataType:'three'},
      {id:3,title:'无量寿经',dataType:'four'},
      {id:4,title:'地藏经',dataType:'five'}
    ]
  },

  onLoad: function (options) {
    
  },
  changeId(e){
    this.setData({
      current:e.target.dataset.id
    })
  },
  swiperChange(e){
    this.setData({
      current:e.detail.current
    })
  }
})