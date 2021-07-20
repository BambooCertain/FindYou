// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // console.log("event" , event)
  // let _taskid = await db.collection('tasks').count();
  let id = await db.collection('tasks').add({
    data:[
      {
        _openid: event.userInfo.openId,
        // _taskid: _taskid.total,
        misserName: event.misserName,
        misserAge: event.misserAge,
        misserSex: parseInt(event.misserSex),
        misserAddress: event.misserAddress,
        misserTime: event.misserTime,
        misserDetailPics: event.misserDetailPics,
        isCallPolice: parseInt(event.isCallPolice),
        price:  parseInt(event.price),
        taskType: parseInt(event.taskType),
        title: event.title,
        introduction: event.introduction,
        isFinish: event.isFinish,
        familyName: event.familyName,
        familyPhoneNumber: event.familyPhoneNumber,
        // 志愿者列表
        volunteerArray:[],
        // 线索列表
        taskInfoArray:[]
      }
    ]
  })
  


  return {
  }
}