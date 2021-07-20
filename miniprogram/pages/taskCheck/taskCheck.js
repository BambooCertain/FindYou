// pages/taskCheck/taskCheck.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    detailPics:[],
    checkArray:[],
  },
  refuseCheck:function(e)
  {
    that = this
    // 传入id e.currentTarget.dataset.id
    // console.log("refuseCheck:" , e)
    const db = wx.cloud.database()
    db.collection('check').where({_id: e.currentTarget.dataset.id})
    .update({
      data:{
        isChecking: 0
      },
      success:res=>{
        console.log("驳回错误验证")
        that.onLoad(that.options)
      }
    })
  },
  acceptCheck:function(e){
    const db = wx.cloud.database()
    db.collection('check').where({_id: e.currentTarget.dataset.id})
    .update({
      data:{
        isChecking: 0
      },
      success:res=>{
        console.log("接受正确验证")
        that.onLoad(that.options)
      }
    })
    db.collection('tasks').where({_id: e.currentTarget.dataset.taskid})
    .update({
      data:{
        isFinish:1
      }
    })
    // console.log("acceptCheck:" , e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.cloud.callFunction({
      name:'getCheckList',
      data:{
        _taskid:options._taskid
      },
      success:res=>{
        console.log("[云函数][getCheckList][获取验证列表]调用成功",res)
        that.setData({
            checkArray:res.result.checkArray
        })  
      },
      fail:err=>{
        console.log("[云函数][getCheckList][获取验证列表]调用失败". err)
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