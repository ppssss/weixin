function changeTime(t) {
  let d = new Date(t);
  //return d.toLocalDataString()
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  return year + '-' + month + '-' + day;
}

module.exports = {
  index: function(req, res) {
      res.view({ layout: false });
  },
 
  addData: async function(req, res) {
      req.file('image').upload({
              dirname: require('path').resolve(sails.config.appPath, 'assets/upload')
          },
          async function(err, files) {
              if (err)
                  return res.serverError(err);
              if (files.length === 0)
                  return res.json(false);
              let path = files[0].fd.split('\\');
              path = path[path.length - 1];
              let json = req.allParams();
              json.imgSrc = path;
              let row = await News.create(json).fetch();
              res.json(row);
          });
  },

   newImg: function(req, res) {
      req.file('smallSrc').upload({
              dirname: require('path').resolve(sails.config.appPath, 'assets/upload')
          },
          function(err, files) {
              if (err)
                  return res.serverError(err);
              if (files.length === 0)
                  return res.json(false);
              let arr = files[0].fd.split('\\');
              let fileName = arr[arr.length - 1];
              res.json(fileName);
          });
  },

  delAudio: async function(req, res) {
    let id = req.query.id;
    let dataType=req.session.dataType;
    try {
        let row = await Audio.destroy({ id }).fetch();
        let count1 = await Audio.count({dataType});
        res.json(count1)  
    } catch (error) {
        res.json(false)
    }
},

  addArticle: async function(req, res) {
    req.file('smallSrc').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/smallSrc')
        },
        async function(err, files) {
            if (err)
                return res.serverError(err);
            if (files.length === 0)
                return res.json(false);
            let path = files[0].fd.split('\\');
            path = path[path.length - 1];
            let json=req.allParams();
            json.smSrc=path;
            let row = await Article.create(json).fetch();
            res.json(row);
        });
},
audioList: async function(req, res) {
    let dataType=req.query.dataType;
    let pageNum = req.query.pageNum;
    req.session.dataType=dataType;
    let arr = await Audio.find({dataType}).sort('id asc').skip(pageNum * 5).limit(5);
    let num = await Audio.count({dataType});
    res.json({ arr, num })
},

select: async function(req, res) {
    let keyword = req.query.title;
    let arr = await Article.find({ where: { title: { contains: keyword } } }).sort('id desc').limit(5);
    arr = arr.map(el => {
        el.date = changeTime(el.updatedAt);
        return el
    })
    res.json(arr)
},
selectId: async function(req, res) {
    let id = req.query.id;
    let obj = await Article.findOne({ id });
    res.json(obj)
},
changeNew: async function(req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    let obj = await Article.update({ id }, { title, content }).fetch();
    res.json(obj)
},

};

