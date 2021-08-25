const app=getApp()
const screenH=app.globalData.screenH-34
Page({

  data: {
    screenH,
    current:0,
    navArr:[
      {id:0,title:'知识',dataType:'one'},
      {id:1,title:'热门',dataType:'one'},
      {id:2,title:'军事',dataType:'one'},
      {id:3,title:'财经',dataType:'one'},
      {id:4,title:'文化历史',dataType:'five'}
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