// pages/comment/comment.js
const app=getApp()
const until=require('../../utils/util')
Page({
  data: {
    data:[]
  },
  onLoad: function (options) {
    this.setData({
      artId:options.id
    })
    console.log(options);
    this.refresh()
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
  },
  refresh(){
    const artId=this.data.artId
    wx.request({
      data:{artId},
      url:app.globalData.reqUserUrl+'getArtcomment',
      success:rs=>{
        // console.log(rs.data);
        let data=rs.data;
       data=data.map(el=>{
        el.dateTime=until.formatTime(new Date(el.updatedAt));
        return el
       })
        this.setData({
          data
        })
        console.log(data);
      }
    })
  }
})