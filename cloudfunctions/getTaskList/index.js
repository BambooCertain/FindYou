// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var result
  const runningTaskList = []
  const checkingTaskList = []
  const finishedTaskList = []
  var userInfo = await db.collection('users').where({_openid: event._openid}).get()
  for(var i = 0 ; i < userInfo.data[0].joinTaskArray.length ; ++ i)
  {
    
    var taskInfo = await db.collection('tasks').where({_id:userInfo.data[0].joinTaskArray[i]}).get()
    // 如果任务已完成 则直接归入已完成一栏
    if(taskInfo.data[0].isFinish)
    {
      finishedTaskList.push(taskInfo.data[0]);
    }
    else{
      // 查看验证信息
      var checkInfo = await db.collection('check').where({_openid:event._openid , _taskid:userInfo.data[0].joinTaskArray[i]}).get()
      var flag = 1
      for(var j = 0 ; j < checkInfo.data.length ; ++ j)
      {
        if(checkInfo.data[j].isChecking == 1 && flag == 1)
        {
          flag = 0
          checkingTaskList.push(taskInfo.data[0])
        }
      }
      if(flag)
      {
        runningTaskList.push(taskInfo.data[0])
      }
      
    }
  }
  return {
    runningTaskList,
    checkingTaskList,
    finishedTaskList,
  }
}