// pages/createTaskInfo/createTaskInfo.js
var app = getApp();
var that;
const util = require('../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailPics:[],
    _taskid:'',
    infoPics:[],
    cloudAddress:'cloud://findyoucloud-9gqeacwcc7c2605d.6669-findyoucloud-9gqeacwcc7c2605d-1306416417/misserPics/',
  },
  // 递归上传图片到云存储
  uploadFiles(imagePaths , successUp , failUp , count , length){
    that = this;
    wx.showLoading({
      title: '上传第' + (count+1) + '张图片',
    })
    wx.cloud.uploadFile({
      cloudPath:'misserPics/' + imagePaths[count].substring(11),
      filePath:imagePaths[count],
      success: res=>{
        console.log("success" , res)
        successUp++
        this.data.cloudPics.push(res.fileID)
      },
      fail: res=>{
        failUp++
      },
      complete: res=>{
        count++
        console.log("count and length:" , count)
        console.log("count and length:" ,length)
        if(count == length)
        {
          console.log('successUp:' + successUp +',' +  'failUp:' + failUp);
          
          wx.showToast({
            title:'验证提交成功',
            duration:2000,
            success: res=>{
              wx.switchTab({
                url: '/pages/home/home',
              })
            }
          })

          
        }else{
          that.uploadFiles(imagePaths , successUp , failUp , count , length)
          // console.log('正在上传第' + count + '张')
        }
      }
    })
  },
  // // 选取图片
  uploadImage:function(e){
      that = this
      var pics = []
      var detailPics = that.data.detailPics;
      var cloudPics = []
      if(detailPics.length > 9)
      {
        wx.showToast({
          title: '最多选择9张照片',
        })
        return;
      }
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          for(var i = 0 ; i < res.tempFilePaths.length ; ++ i)
          {
            cloudPics[i] = this.data.cloudAddress + res.tempFilePaths[i].substring(11)
          }
          this.setData({
            detailPics:res.tempFilePaths,
            infoPics: cloudPics
          })
        }
        
      })
  },
  taskInfoSubmit:function(e)
  {
      var now = util.formatTime(new Date())
      var provider = app.globalData.userName
      wx.cloud.callFunction({
        name:'createTaskInfo',
        data:{
          _taskid: that.data._taskid,
          _openid: app.globalData._openid,
          name:provider,
          time: now,
          value:e.detail.value.value,
          infoPics:that.data.infoPics,
        },
        success: res =>{
          console.log("[调用云函数][createTaskInfo][创建任务线索]调用成功", res)
          that.uploadFiles(that.data.detailPics , 0 , 0 , 0 , that.data.detailPics.length)
        },
        fail: err=>{
          console.log("[调用云函数][createTaskInfo][创建任务线索]调用失败" , err)
        }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      _taskid:options._taskid
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