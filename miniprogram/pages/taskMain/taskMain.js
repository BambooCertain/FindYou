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
  joinTask:function(e){
    // this.task.volunteerArray.push(app.globalData._openid)
    that = this;
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
        this.setData({
          isAccept:1
        })
      }
    })
    
  },
  turnToTaskInfo:function(e){
    wx.navigateTo({
      url: '../taskInfo/taskInfo?_id=' + this.data.task._id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        // console.log("this.data.task.volunteerArray:",this.data.task.volunteerArray)
        for(var i = 0 ; i < this.data.task.volunteerArray.length ; ++ i)
        {
          // console.log("item:",item)
          if(this.data.task.volunteerArray[i] == app.globalData._openid)
          {
            this.setData({
              isAccept:1
            })
          }
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