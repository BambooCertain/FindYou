// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var rank = []
  const result = await db.collection('users').orderBy('point' , 'desc').get()
  rank.push(result.data)

  return {
    rank
  }
}