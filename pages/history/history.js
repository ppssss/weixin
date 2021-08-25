// pages/history/history.js
const app=getApp()
const until=require('../../utils/util');
Page({
  data: {
    data:[]
  },

  onLoad: function (options) {
    wx.login({
      success: res => {
        let code=res.code
        wx.request({
          url: app.globalData.reqUserUrl+'index',
          data:{code},
          success:obj=>{//箭头函数才能用this 
            this.setData({
              openId:obj.data
            })//obj.data就是opid
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  this.refresh()
  },
  refresh(){
    const data=this.data.openId
    wx.request({
      data,
      url:app.globalData.reqUserUrl+'getRecord',
      success:rs=>{
        // console.log(rs.data);
        let data=rs.data;
        data=data.map(el=>{
          el.Time=until.formatDate(el.createdAt)
          return el
        })
        this.setData({
          data
        })
        // console.log(this.data);
      }
    })
  },
  delHistory(el){
    console.log(el.target.dataset.id);
    const id=el.target.dataset.id;
    const openId=this.data.openId;
    console.log(openId);
    wx.request({
      data:{id,openId},
      url: app.globalData.reqUserUrl+'delHistory',
      success:rs=>{
        console.log(rs);
        this.refresh()
      }
    })

  }
})