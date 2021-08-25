const app=getApp()
const url=app.globalData.reqUrl
 Page({
   data:{
     url,
     arr:[{id:16,title:'aaa',url:'smallSrc/1.jpeg'},
     {id:18,title:'bbb',url:'smallSrc/94cad1c8a786c917eae88bf5ad5ea6c739c757fb.jpeg'},
     {id:19,title:'cccc',url:'smallSrc/2.jpeg'}
    ],
    arr1:[],
    screenH:`height:${app.globalData.screenH}px`,
    screenW:`width:${app.globalData.screenW}px`
   },
  onLoad:function(options){
    this.dataProc(0);
    this.dataFlag=true
  },
  dataProc(start,fun){
    const pageSize=6
    wx.request({
      data:{start,pageSize},
      url: app.globalData.reqUserUrl+'getArt',
      success:rs=>{
        const temp=rs.data
        if(temp.length===0){
          wx.showToast({
            title: '已经到底了',
          })
          return
        }
        const arr1F=temp.map(el=>{
          el.smSrc=app.globalData.reqUrl+'smallSrc/'+el.smSrc;
          el.time=require('../../utils/util').formatTime(new Date(el.updatedAt))
          return el
        })
        if(start)
        this.setData({
          arr1:[...this.data.arr1,...arr1F]
        });
        else{
          this.setData({
          arr1:arr1F
        })
        this.dataFlag=true;
        if(fun)fun()
        }
        
      },
    })
  },
  onReachBottom:function(){
    if(this.dataFlag){
       let arrLen=this.data.arr1.length;
    this.dataProc(arrLen)
    }
  },
  onPullDownRefresh:function(){
    this.dataProc(0,function(){
      setTimeout(_=>{
        wx.stopPullDownRefresh()
      },2000)
    });
   
  }
})