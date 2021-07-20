// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  db.collection('users').where({
    _openid:event._openId
  }).update({
    data:{
      joinTaskArray: event.joinTaskArray
    }
  })
  db.collection('tasks').where({
    _id:event._taskId
  }).update({
    data:{
      volunteerArray: event.volunteerArray
    }
  })
  return{
    event,
  }
  
}