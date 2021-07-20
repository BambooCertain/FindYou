// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 控制页面主体部分显示什么
      // 0 显示走失任务 1 显示寻亲帮助 2 显示好人榜
      contentCheck:0,
      // 走失任务
      taskArray:[],
      // 寻亲帮助
      findTaskArray:[],
      rankList:[],
      userInfo:{},
  },

  missTaskShow:function(e)
  {
      
      this.setData({
        contentCheck:0
      })
  },
  findTaskShow:function(e)
  {
      this.setData({
        contentCheck:1
      })
  },
  rankShow:function(e)
  {
      this.setData({
        contentCheck:2
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      // lang: 'zh_CN',
      success: res=>{
        console.log("wx.getUserInfo:",res.userInfo) 
      }
    })
    wx.cloud.callFunction({
      name:'login',
      data:{},
      success: res=>{
        console.log('[云函数] [login] user openid: ', res.result)
        app.globalData._openid = res.result.openid 

        const db = wx.cloud.database()
        db.collection("users").where({
          _openid: app.globalData._openid
        }).get({
          success: function(res){
              // console.log(res)
              if(!res.data.length)
              {
                wx.navigateTo({
                  url: '../register/register',
                })
              }
              else{
                // 把用户信息存储的本地
                app.globalData.userName = res.data[0].userName
                app.globalData.gender = res.data[0].gender
                app.globalData.phoneNumber = res.data[0].phoneNumber
                app.globalData.address = res.data[0].address
                app.globalData.birth = res.data[0].birth
                app.globalData.like = res.data[0].like
                app.globalData.point = res.data[0].point
                app.globalData.taskNumber = res.data[0].taskNumber
                app.globalData.joinTaskArray = res.data[0].joinTaskArray

              }
          },
          fail: function(err){
            console.log(err)
          }
        })
      },
      fail: err=>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    wx.cloud.callFunction({
      name:'getBriefFindTasks',
      data:{},
      success: res =>{
        console.log('[云函数][getBriefFindTasks]调用成功' , res);
        this.setData({
          taskArray: res.result.task[0].concat(res.result.task[1])
        })
      },
      fail: err =>{
        console.log('[云函数][getBriefFindTasks]调用失败' , err);
      }
      
    })
    wx.cloud.callFunction({
      name:'getBriefTasks',
      data:{},
      success: res =>{
        console.log('[云函数][getBriefTasks]调用成功' , res);
        this.setData({
          findTaskArray: res.result.task[0]
        })
      },
      fail: err =>{
        console.log('[云函数][getBriefTasks]调用失败' , err);
        
      }
      
    })
    wx.cloud.callFunction({
      name:'getRankList',
      data:{},
      success: res=>{
        console.log('[云函数][getRankList]调用成功' , res);
        this.setData({
          rankList : res.result.rank[0]
        })
      },
      fail: err =>{
        console.log('[云函数][getRankList]失败' , err);
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

    // console.log(app.globalData)
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