const app=getApp()
const until=require('../../utils/util')
Page({

  data: {
    getUser:false,
    obj:{},
    data:[],
    src:'',
    isShow:false,
    avatarUrl:'',
    nickName:'',
    commentTime:'',
    comment:'',
    artId:'',
    next:true,
    isRecord:false
  },

  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        isRecord:true
      })
    }, 10000);
    this.setData({
      artId:options.id
    })
    const iAo = wx.createVideoContext('myVideo')
    iAo.autoplay=true
    wx.request({
      data:options,
      url: app.globalData.reqUserUrl+"getVideoId",
      success:rs=>{
        const obj=rs.data;
        obj.dataTime=require('../../utils/util').formatTime(new Date(obj.updatedAt))
        obj.smSrc= app.globalData.reqUrl+obj.smSrc;
        obj.url=app.globalData.reqUrl+'video/'+obj.url;
           
        this.setData({
          obj,
          src:obj.url
        })
      }
    })
    this.refresh()
  },
  onUnload:function(){
    const data={};
    data.mediaId=this.data.artId;
    data.srcType="video";
    data.title=this.data.obj.title;
    data.current='';
    const until=require('../../utils/util');
    if(this.data.isRecord){
      until.getOpenId(openId=>{
          data.openId=openId
          wx.request({
            data,
            url: app.globalData.reqUserUrl+'addPlayRecord',
            success:rs=>{
              console.log(rs.data);
            }
          })
        })
    }
  },
  prev(){
    this.setData({
      next:true
    })
    console.log(this.data.obj.id-1);
    if(this.data.obj.id>1){
      this.setData({
      artId:this.data.obj.id-1
    })
    }
    wx.request({
      data:{id:this.data.obj.id,dataType:this.data.obj.dataType},
      url: app.globalData.reqUserUrl+"getVideoPrev",
      success:rs=>{
        if(rs.data===false){
          wx.showToast({
            title: '我是第一条',
          })
        }else{
           const obj=rs.data[0];
        obj.dataTime=require('../../utils/util').formatTime(new Date(obj.updatedAt))
        obj.title;
        obj.smSrc= app.globalData.reqUrl+obj.smSrc;
        obj.url=app.globalData.reqUrl+'video/'+obj.url;               
        this.setData({
          obj,
          src:obj.url
        })
        }
       
      }
    })
    this.refresh()
  },
  next(){
    if(this.data.next){
      console.log(this.data.next);
      if(this.data.next){
        this.setData({
        artId:this.data.obj.id+1
      })
      }else{
        this.setData({
          artId:this.data.obj.id
        })
      }
      wx.request({
        data:{id:this.data.obj.id,dataType:this.data.obj.dataType},
        url: app.globalData.reqUserUrl+"getVideoNext",
        success:rs=>{
          if(rs.data===false){
            this.setData({
              next:false,            
            })
             wx.showToast({
               title: '我是最后一条',
             })
          }else{
            const obj=rs.data[0];
          // console.log(obj.id);
          obj.dataTime=require('../../utils/util').formatTime(new Date(obj.updatedAt))
          obj.title;
          obj.smSrc= app.globalData.reqUrl+obj.smSrc;
          obj.url=app.globalData.reqUrl+'video/'+obj.url;       
          this.setData({
            obj,
            src:obj.url
          })
          this.refresh()
          }        
        }
      })
     
    }    
  },
  formSubmit(e) {
    this.setData({
      comment:e.detail.value.comment
    })
    if(!e.detail.value.comment){
      wx.showToast({
        title: '请输入评论',
      })
    }else{
      const data=e.detail.value;

        // const data=e.detail.value;
        data.nickName=app.globalData.nickName;
        data.avatarUrl=app.globalData.avatarUrl;
        data.artId=this.data.obj.id,
        console.log(data);
        wx.request({          
          data:data,
          url: app.globalData.reqUserUrl+'comment',
          success:rs=>{
            console.log(rs.data);
            const info=rs.data;
            this.setData({
              commentTime:require('../../utils/util').formatTime(new Date(info.updatedAt)),
              comment:info.comment,
              isShow:true
            })
            wx.showToast({
              title: '提交成功',
            })
            this.setData({
              comment:''
            })
          }
        })
        this.intoData()
        this.refresh()
      
    
    }
    
  },
  pageShow(){
    const isShow=this.data.isShow;
    if(isShow===false){
      this.setData({
        isShow:true
      })
    }else{
      this.setData({
        isShow:false
      })
    }
  },

  refresh(){
    // console.log(this.data.artId);
    const artId=this.data.artId
    console.log(artId);
    wx.request({      
      data:{artId},//必须是对象
      url: app.globalData.reqUserUrl+"getComment",
      success:rs=>{
        console.log(rs.data);
        let arr1=rs.data;
        arr1=arr1.map(el=>{
          el.dateTime=until.formatTime(new Date(el.updatedAt));
          return el
        })
        console.log(arr1);
        this.setData({
          commentTime:require('../../utils/util').formatTime(new Date(rs.updatedAt)),
          data:arr1,
          count:rs.data.length
        })
      }
     
    })
  },
  intoData(){
    wx.request({
      data:this.data.data,
      url: app.globalData.reqUserUrl+'comment',
      success:rs=>{
        console.log(rs.data);
        const info=rs.data;
        this.setData({  
          commentTime:require('../../utils/util').formatTime(new Date(info.updatedAt)),
          comment:info.comment,           
          isShow:true
        })
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          comment:''
        })
      }
    })
  }
})