
module.exports = {

  index: async function (req, res) {
    let code=req.query.code; 
    const url=`https://api.weixin.qq.com/sns/jscode2session`;

     const superAgent=require('superagent');
     superAgent.get(url)
     .query({
       appid:'wxd0c92dd9ac8632a7',
       secret:'50b49ac2cb3bc0211961e50916125d87',
       js_code:code,
       agent_type:'authorization_code'
     })
     .end((err,obj)=>{
       res.json((JSON.parse(obj.text)).openid)
     });
  },
  addPlayRecord:async function (req, res) {
    const json=req.allParams();
    const obj=await Users.create(json).fetch()
    res.json(obj)
  },
  getRecord:async function (req, res) {
    const openId=req.query.openId;
    const arr=await Users.find({openId})
    res.json(arr)
  },
  delHistory:async function (req, res) {
    const id=req.query.id;
    const openId=req.query.openId;
    console.log(id,openId);
    const arr=await Users.destroy({id,openId}).fetch()
    res.json(arr)
  },
  getArt: async function (req, res) {
    let skip=req.query.start;
    let pageSize=req.query.pageSize;
    const arr=await Article.find().sort("id desc").skip(skip).limit(pageSize)
    res.json(arr)
  },
  getArtId: async function (req, res) {
    let id=req.query.id;
    const obj=await Article.findOne({id});
    res.json(obj)
  },
  getAudioId: async function (req, res) {
    let id=req.query.id;
    const obj=await Audio.findOne({id});
    res.json(obj)
  },
  getVideoId:async function (req, res) {
    let id=req.query.id;
    const obj=await Video.findOne({id});
    res.json(obj)
  },
  getAudioPrev: async function (req, res) {
    let id=req.query.id;
    let dataType=req.query.dataType;
    const obj=await Audio.find({id:{'<':id},dataType}).sort('id desc').limit(1);
    if(obj.length===0){
      res.json(false)
    }else res.json(obj)
  },
  getVideoPrev: async function (req, res) {
    let id=req.query.id;
    let dataType=req.query.dataType;
    const obj=await Video.find({id:{'<':id},dataType}).sort('id desc').limit(1);
    if(obj.length===0){
      res.json(false)
    }else res.json(obj)
  },
  getAudioNext: async function (req, res) {
    let id=req.query.id;
    let dataType=req.query.dataType;
    const obj=await Audio.find({id:{'>':id},dataType}).sort('id asc').limit(1);
    if(obj.length===0){
      res.json(false)
    }else res.json(obj)
  },
  getVideoNext: async function (req, res) {
    let id=req.query.id;
    let dataType=req.query.dataType;
    const obj=await Video.find({id:{'>':id},dataType}).sort('id asc').limit(1);
    if(obj.length===0){
      res.json(false)
    }else res.json(obj)
  },
  mediaData:async function (req, res) {
    let srcType=req.query.srcType;
    let dataType=req.query.dataType;
    let page=req.query.page;
    let num=req.query.num;
    if(srcType==="audio"){
          let arr=await Audio.find({dataType}).sort('id asc').skip(page).limit(num)
          res.json(arr)
        }else{
          let arr=await Video.find({dataType}).sort('id asc').skip(page).limit(num)
          res.json(arr)
    }
  },
  comment:async function (req, res) {
    const json=req.allParams();
    const temp=await Comment.create(json).fetch();
    res.json(temp)
  },
  getComment:async function (req, res) {
    const artId=req.query.artId;
    const arr=await Comment.find({artId}).sort('id desc');
    res.json(arr)
  },
  artComment:async function (req,res){
    const json=req.allParams();
    const arr=await ArtComment.create(json).fetch();
    res.json(arr)
  },
  getArtcomment:async function (req,res){
    const artId=req.query.artId;
    console.log(artId);
    const arr=await ArtComment.find({artId}).sort('id desc');
    res.json(arr)
  },
  insertAudio: async function (req, res) {
    const arr=[];
    for(let i=1;i<=45;i++){
      let json={}
      json.title="《金刚经》第"+i+"集";
      json.url='https://cdn.leadinghr.cn/audio/jgj/jgj'+i+'.mp3';
      json.smSrc="images/"+"("+parseInt(Math.random()*28+1)+")"+'.jpg'
      json.dataType='two'
      arr.push(json)
    }
    const temp=await Audio.createEach(arr).fetch()
    res.json(temp)
  },
  insertvideo: async function (req, res) {
    const arr=[];
    for(let i=1;i<=34;i++){
      let json={}
      json.title="西游记"+i+"集";
      json.url='a.mp4';
      json.smSrc="images/"+"("+parseInt(Math.random()*30+1)+")"+'.jpg'
      json.dataType='one'
      arr.push(json)
    }
    const temp=await Video.createEach(arr).fetch()
    res.json(temp)
  },
};

