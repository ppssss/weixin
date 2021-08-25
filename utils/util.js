const formatDate= (t) => {
  const d=new Date(t);
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  return `${year}年${month}月${day}日`
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const app=getApp()

const getOpenId=function(fun){
  wx.login({
    success: res => {
      let code=res.code
      wx.request({
        url: app.globalData.reqUserUrl+'index',
        data:{code},
        success:obj=>{//箭头函数才能用this 
          if(fun) fun(obj.data)//obj.data就是opid
        }
      })
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    }
  })
}


module.exports = {
  formatTime,
  getOpenId,
  formatDate
}
