// pages/showArt/showArt.js
const app=getApp()
const until=require('../../utils/util');
const { formatTime } = require('../../utils/util');
Page({
  data: {
    isShow:false,
    artId:'',
    tempFilePaths:[]
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      artId:options.id
    })
    wx.request({
      data:options,
      url: app.globalData.reqUserUrl+'getArtId',
      success:rs=>{
        let obj=rs.data;//这里要不能const因为下面不能改
        obj.dateTime=until.formatTime(new Date(obj.updatedAt));
        obj.content=obj.content.replace(/\{\{imgUrl\}\}/g,app.globalData.reqUpload).replace(/<p/g,'<p class="p"').replace(/<img/g,'<img class="img"')
        this.setData({
          obj
        })
      }
    })
  },
  commentshow(){
    
    if(this.data.isShow===false){
       this.setData({
      isShow:true
    })
    }else{
      this.setData({
        isShow:false
      })
    }   
  },
  chooseImg(){
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        this.setData({
          tempFilePaths:res.tempFilePaths
        })
      }
    })
  },
  formSubmit(e){
    this.setData({
      comment:e.detail.value.comment
    })
    if(!e.detail.value.comment){
      wx.showToast({
        title: '请输入评论',
      })
    }else{
      const data=e.detail.value;
      data.srcone=this.data.tempFilePaths[0];
      data.srctwo=this.data.tempFilePaths[1];
      data.artId=this.data.artId
      data.nickName=app.globalData.nickName
      data.avatarUrl=app.globalData.avatarUrl
      console.log(data);
      wx.request({
        data,
        url: app.globalData.reqUserUrl+"artComment",
        success:rs=>{
          wx.showToast({
            title: '评论成功',
          })
          console.log(rs.data);
          wx.navigateTo({
            url: '/pages/comment/comment?id='+this.data.artId,
          })
        }
      })
    }
  },
  tocomment(){
    wx.navigateTo({
      url: '/pages/comment/comment?id='+this.data.artId,
    })
    console.log(this.data.artId);
  }
})