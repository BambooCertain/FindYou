// pages/taskMain/taskMain.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 该任务是否接受
    isAccept:0,
    // task_id
    task:{},

  },

  submitCheck:function(e){
    that = this;
    var volunteerArray = that.data.task.volunteerArray
    var _openid = app.globalData._openid
    for(var i = 0 ; i < volunteerArray.length ; ++ i)
    {
      console.log("_openid == volunteerArray[i]" , _openid == volunteerArray[i])
      if(_openid == volunteerArray[i])
      {
        wx.navigateTo({
          url: '../findCheck/findCheck?_taskid=' + this.data.task._id,
        })
        return
      }
    }
    var newVolunteerArray = that.data.task.volunteerArray
    // console.log("newVolunteerArray:",newVolunteerArray)
    newVolunteerArray.push(app.globalData._openid)
    var newJoinTaskArray = app.globalData.joinTaskArray
    newJoinTaskArray.push(that.data.task._id)
    wx.cloud.callFunction({
      name:'joinTask',
      data:{
        _taskId:that.data.task._id,
        volunteerArray:newVolunteerArray,
        joinTaskArray:newJoinTaskArray,
        _openId:app.globalData._openid
      },
      success:res=>{
        console.log("[云函数][joinTask]调用成功",res)
        wx.navigateTo({
          url: '../findCheck/findCheck?_taskid=' + this.data.task._id,
        })
      }
    })
 
      
    
    




   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.cloud.callFunction({
      name:'getTaskInfo',
      data:{
        _id:options.task
      },
      success: res =>{
        console.log("[云函数][getTaskInfo]调用成功" , res)
        console.log(app.globalData)
        this.setData({
          task: res.result.taskInfo.data[0]
        })
      }
    })
    // 查看是否正在验证
    const db = wx.cloud.database()
    db.collection('check').where({
      _taskid:options.task,
      _openid:app.globalData._openid,
      isChecking:1
    }).get({
      success:res=>{
        console.log("查询是否提交验证" , res)
        if(res.data.length != 0)
        {
          that.setData({
            isAccept:1
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})