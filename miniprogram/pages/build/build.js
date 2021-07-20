// pages/build/build.js
var app = getApp();
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTaskArray:[],
    myFindTaskArray:[],
    isChosen:0,
  },
  showTaskArray:function(e)
  {
    this.setData({
      isChosen:0
    })
  },
  showFindTaskArray:function(e)
  {
    this.setData({
      isChosen:1
    })
  },
  // turnToCheckList: function(e)
  // {
  //   wx.navigateTo({
  //     url: '../taskCheck/taskCheck?_taskid=',
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.cloud.callFunction({
        name:'getBriefFindTasks',
        data:{},
        success:res=>{
          console.log("res:",res)
          let allTaskArray = res.result.task[0].concat(res.result.task[1])
          console.log("allTaskArray:",allTaskArray)
          let myTaskArray = []
          for(var i = 0 ; i < allTaskArray.length ; ++ i)
          {
            if(allTaskArray[i]._openid == app.globalData._openid)
            {
              myTaskArray.push(allTaskArray[i])
            }
          }
          this.setData({
            myTaskArray:myTaskArray
          })
        }
      })
      wx.cloud.callFunction({
        name:'getBriefTasks',
        data:{},
        success:res=>{
          console.log("res:",res)
          let allTaskArray = res.result.task[0]
          console.log("allTaskArray:",allTaskArray)
          let myFindTaskArray = []
          for(var i = 0 ; i < allTaskArray.length ; ++ i)
          {
            if(allTaskArray[i]._openid == app.globalData._openid)
            {
              myFindTaskArray.push(allTaskArray[i])
            }
          }
          this.setData({
            myFindTaskArray:myFindTaskArray
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