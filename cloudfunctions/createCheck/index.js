// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  db.collection('check').add({
    data:[
      {
        _taskid:event._taskid,
        _openid:event._openid,
        name:event.name,
        phoneNumber:event.phoneNumber,
        relation:event.relation,
        detailPics: event.detailPics,
        introduction: event.introduction,
        isChecking:1,
      }
    ]
  })

  return {
    event,
  }
}