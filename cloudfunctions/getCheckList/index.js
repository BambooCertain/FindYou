// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var result;
  result = await db.collection('check').where({_taskid:event._taskid, isChecking:1}).get()
  var checkArray = []
  checkArray = await result.data
  return {
    checkArray,  
  }
}