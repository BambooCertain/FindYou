// pages/task/task.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断显示哪个页面
    isChosen:0,
    runningTaskList:[],
    finishedTaskList:[],
    checkingTaskList:[]
  },
  showRunning:function(e)
  {
    this.setData({
      isChosen:0
    })
  },
  showChecking:function(e)
  {
    this.setData({
      isChosen:1
    })
  },
  showFinished:function(e)
  {
    this.setData({
      isChosen:2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getTaskList',
      data:{
        _openid:app.globalData._openid,
      },
      success: res=>{
        console.log("[云函数][getTaskList]调用成功",res)
        this.setData({
          runningTaskList: res.result.runningTaskList,
          checkingTaskList: res.result.checkingTaskList,
          finishedTaskList:res.result.finishedTaskList,
        })
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