// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

    const task = []
    let taskArray = await db.collection('tasks').where({taskType:2 , isFinish:0}).get()
    task.push(taskArray.data)

    return {
      task
    }
}