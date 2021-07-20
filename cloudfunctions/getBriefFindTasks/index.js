// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // const countResult1 = await db.collection('tasks').where({taskType:0}).count()
  // countResult = countResult + await db.collection('tasks').where({taskType:1}).count(
  const task = []
  let findTaskArray = await db.collection('tasks').where({taskType:0 , isFinish:0}).get()
  let animalTaskArray = await db.collection('tasks').where({taskType:1 , isFinish:0}).get()
  // task.push.apply(findTaskArray.data)
  // task.push.apply(animalTaskArray.data)
  task.push(findTaskArray.data)
  task.push(animalTaskArray.data)
  return {
    task
  }
}