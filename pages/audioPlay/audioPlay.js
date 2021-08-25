const app=getApp()
Page({
  data: {
    obj:{},
    current:0,
    total:0,
    percent:0,
    backUrl:app.globalData.reqUrl+'icon/',
    isRecord:false
  },
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        isRecord:true
      })
    }, 10000);
    // console.log(options);id
    let current=0;
    let total=0;
    const innerAudio=wx.createInnerAudioContext();
    this.iAo=innerAudio;
    innerAudio.autoplay=true;
    this.iAo.onTimeUpdate(_=>{
      this.setData({
        total:parseInt(innerAudio.duration),
        current:parseInt(innerAudio.currentTime),
        percent:parseInt(this.data.current/this.data.total*100)
      })
      // console.log(this.data.percent);
    })
  
    wx.request({
      data:options,
      url: app.globalData.reqUserUrl+"getAudioId",
      success:rs=>{
        const obj=rs.data;
        obj.dataTime=require('../../utils/util').formatTime(new Date(obj.updatedAt));
        obj.dataType=obj.dataType;
        // console.log(obj.dataType);
        obj.smSrc= app.globalData.reqUrl+obj.smSrc;
        innerAudio.src=obj.url;        
        this.setData({
          obj
        })
      }
    })
    innerAudio.onEnded(_=>{
      this.next()
    })
  },
  onUnload:function(){  
    this.iAo.stop();
    console.log(this.options);
    const data={};
    data.mediaId=this.options.id;
    data.srcType="audio";
    data.title=this.data.obj.title;
    data.current=this.data.current;
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
  play(){
   this.iAo.play()
   
  },
  stop(){
    this.iAo.stop()
    this.setData({
      current:0,
      percent:0
    })
  },
  pause(){
    this.iAo.pause()
  },
  sliderChange(e){
    let pre=e.detail.value;
    let current=parseInt(pre/100*this.data.total) 
    this.iAo.seek(current);
    this.setData({
      current,
      percent:parseInt(current/this.data.total*100) 
    })
    this.iAo.pause()
  },
  prev(){
    this.iAo.stop()
    wx.request({
      data:{id:this.data.obj.id,dataType:this.data.obj.dataType},
      url: app.globalData.reqUserUrl+"getAudioPrev",
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
        this.iAo.src=obj.url;        
        this.setData({
          obj
        })
        }
       
      }
    })
  },
  next(){
    this.iAo.stop()
    wx.request({
      data:{id:this.data.obj.id,dataType:this.data.obj.dataType},
      url: app.globalData.reqUserUrl+"getAudioNext",
      success:rs=>{
        if(rs.data===false){
           wx.showToast({
             title: '我是最后一条',
           })
        }else{
          const obj=rs.data[0];
        console.log(obj.id);
        obj.dataTime=require('../../utils/util').formatTime(new Date(obj.updatedAt))
        obj.title;
        obj.smSrc= app.globalData.reqUrl+obj.smSrc;
        this.iAo.src=obj.url;        
        this.setData({
          obj
        })
        } 
          
        
      }
    })
  }
})