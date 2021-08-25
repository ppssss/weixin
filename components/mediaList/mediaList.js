const app=getApp()
Component({
  properties:{
    dataType:{
      type:String,
      value:""
    },
    srcType:{
      type:String,
      value:""
    }
  },
  data:{
    arr:[],
    flag:false
  },
  attached(){
    this.noData=false;
    const srcType=this.properties.srcType;
    const dataType=this.properties.dataType;
    
    this.dataLoad(srcType,dataType,0)
  },
  methods:{
    dFresh(){
      this.isFresh=true;
     const srcType=this.properties.srcType;
     const dataType=this.properties.dataType;
     this.dataLoad(srcType,dataType,0,()=>{
         this.setData({
       flag:false
     })
     })
    },
   loaded(){
      this.isFresh=false;
      const srcType=this.properties.srcType;
      const dataType=this.properties.dataType;
      const page=this.data.arr.length;
      this.dataLoad(srcType,dataType,page)
    },
    dataLoad(srcType,dataType,page,fun){
      if(this.noData)return;
      const until=require('../../utils/util')
      let num=11;
      wx.request({
        data:{srcType,dataType,page,num},
        url: app.globalData.reqUserUrl+"mediaData",
        success:rs=>{
          let arr1=rs.data;          
          if(!arr1.length){
            wx.showToast({
              title: '到底了',
            })
            this.noData=true;
            return
          }
          arr1=arr1.map(el=>{
            el.dateTime=until.formatTime(new Date(el.updatedAt));
            el.date=until.formatDate(el.updatedAt);
            el.src=app.globalData.reqUrl+el.smSrc;
            return el
          })
          if(this.isFresh){
              this.setData({
                 arr:arr1
          });
          if(fun)fun()
          }else{
            this.setData({
              arr:[...this.data.arr,...arr1]
            })
          }        
        }
      })
    }
  }

})