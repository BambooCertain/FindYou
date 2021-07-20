// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var res = await db.collection('tasks').where({_id:event._taskid}).get()
  console.log(res.data[0].taskInfoArray)
  var taskInfoArray = []
  taskInfoArray = res.data[0].taskInfoArray
  var info = {
    provider:event.name,
    time:event.time,
    value:event.value,
    infoPics: event.infoPics
  }
  taskInfoArray.push(info)
  console.log(taskInfoArray)
  console.log(info)
  await db.collection('tasks').where({_id:event._taskid}).update({
    data:{
      taskInfoArray:taskInfoArray
    },
    success:res=>{
      console.log("成功更新线索数据" , res)
    }
  })

  return {

  }
}