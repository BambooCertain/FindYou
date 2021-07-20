
// 地图显示同任务下地图上志愿者的位置
const myCallout = {
  id: 0,
  latitude: 30.390559,
  longitude: 119.990662,
  iconPath: '../../icon/my_location.png',
  width:30,
  height:30,
}

const customCallout1 = {
  id: 1,
  latitude: 30.392559,
  longitude: 119.991662,
  iconPath: '../../icon/location.png',
  width:30,
  height:30,
}
const customCallout2 = {
  id: 2,
  latitude: 30.392559,
  longitude: 119.988662,
  iconPath: '../../icon/location.png',
  width:30,
  height:30,
}
const customCallout3 = {
  id: 3,
  latitude: 30.387559,
  longitude: 119.991662,
  iconPath: '../../icon/location.png',
  width:30,
  height:30,
  
}
const customCallout4 = {
  id: 4,
  latitude: 30.389559,
  longitude: 119.989662,
  iconPath: '../../icon/location.png',
  width:30,
  height:30,
}
const customCallout5 = {
  id: 5,
  latitude: 30.391559,
  longitude: 119.994662,
  iconPath: '../../icon/location.png',
  width:30,
  height:30,
}
const customCallout6 = {
  id: 6,
  latitude: 30.3905559,
  longitude: 119.992662,
  iconPath: '../../icon/miss_location.png',
  width:30,
  height:30,
}

// lat: 30.292038 lng 120.022446
const allMarkers = [myCallout , customCallout1, customCallout2, customCallout3,customCallout4, customCallout5, customCallout6]
var QQMapWX = require('qqmap-wx-jssdk.js')
const util = require('../../util/util.js')
var qqmapsdk = new QQMapWX({
  key: 'ZLHBZ-4CZWW-WRGRW-ODK2T-XMVWZ-HYF27'
});
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    now:'',
    phoneNumber:'',
    _taskid:'',
    // 119.997662,30.395759
    latitude: 30.390559,
    longitude: 119.991662,
    markers:[],
    // 标签导航
    navCheck:0,
    // 时间排序
    timeChosen:1,
    location:'',
    cloudAddress:'cloud://findyoucloud-9gqeacwcc7c2605d.6669-findyoucloud-9gqeacwcc7c2605d-1306416417/checkPics/',
    // customCalloutMarkerIds:[],
    detailPics:[] ,
    isChecking:0,
    task:{},
  },

  timeRank:function(e)
  {
    var taskInfoArrayReverse = []
    var taskReverse = this.data.task;
    for(var i = this.data.task.taskInfoArray.length - 1 , j = 0 ; i >= 0 ; --i , ++ j)
    {
      taskInfoArrayReverse[j] = this.data.task.taskInfoArray[i]
    }
    taskReverse.taskInfoArray = taskInfoArrayReverse
    this.setData({
      timeChosen:0,
      task:taskReverse
    })
  },
  timeUnrank:function(e)
  {
    var taskInfoArrayReverse = []
    var taskReverse = this.data.task;
    for(var i = this.data.task.taskInfoArray.length - 1 , j = 0 ; i >= 0 ; --i , ++ j)
    {
      taskInfoArrayReverse[j] = this.data.task.taskInfoArray[i]
    }
    taskReverse.taskInfoArray = taskInfoArrayReverse
    this.setData({
      timeChosen:1,
      task:taskReverse
    })
  },
  infoShow:function(e)
  {
    this.setData({
      navCheck:0
    })
  },
  threadShow:function(e){
    this.setData({
      navCheck:1
    })
  },
  weatherShow:function(e){
    this.setData({
      navCheck:2
    })
  },
  finishShow:function(e){
    this.setData({
      navCheck:3
    })
  },

  // 递归上传图片到云存储
  uploadFiles(imagePaths , successUp , failUp , count , length){
    var that = this;
    wx.showLoading({
      title: '上传第' + (count+1) + '张图片',
    })
    wx.cloud.uploadFile({
      cloudPath:'checkPics/' + imagePaths[count].substring(11),
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
        if(count == length)
        {
          console.log('successUp:' + successUp +',' +  'failUp:' + failUp);
          
          wx.showToast({
            title:'验证提交成功',
            duration:2000,
            success: res=>{
              this.setData({
                isChecking:1
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
// 提交表单数据
checkSubmit:function(e){
  
  that = this;
  wx.cloud.callFunction({
    name:'createCheck',
    data:{
      _openid:app.globalData._openid,
      name:that.data.userName,
      phoneNumber:that.data.phoneNumber,
      relation:'',
      detailPics: that.data.cloudPics,
      introduction: e.detail.value.introduction,
      _taskid: that.data._taskid
    },
    success: res=>{
      console.log('[云函数][createCheck][创建寻人验证]调用成功' , res)
      that.uploadFiles(that.data.detailPics , 0 , 0 , 0 , that.data.detailPics.length)
      // console.log('this.data.detailPics[0].substring(11)' , this.data.detailPics[0].substring(11))
      
    },
    fail: res=>{
      console.log('[云函数][createCheck][创建寻人验证]调用失败' , res)
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
        cloudPics: cloudPics
      })
    }
    
  })
  // wx.cloud.callFunction({
  //   name:'chooseImage',
  //   data:{},
  //   success:res=>{
  //     console.log('[云函数][chooseImage]调用成功' , res)
  //   }
  // })
},








  freshLocation:function(e)
  {
    qqmapsdk.reverseGeocoder({
      success:res=>{
        console.log("myLocation:",res)
        this.setData({location:res.result.address})
      }
    })
  }
,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = util.formatTime(new Date());
    console.log("now:",now)
    // 获取用户定位
    this.setData({
      _taskid:options._id,
      now:now,
      userName:app.globalData.userName,
      phoneNumber:app.globalData.phoneNumber,
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      success:res=>{
        console.log("myLocation:",res)
        this.setData({location:res.result.address})
      }
    })
    
    this.mapCtx = wx.createMapContext('myMap')
    this.mapCtx.getCenterLocation({
      success: res=>{
        console.log(res.latitude)
        console.log(res.longitude)
      }
    })
    
    this.setData({
      markers:allMarkers
    })
    wx.cloud.callFunction({
      name:'getTaskInfo',
      data:{
        _id: options._id,
      },
      success: res =>{
        this.setData({
          task: res.result.taskInfo.data[0]
        })
      }
    })
    const db = wx.cloud.database()
    db.collection('check').where({
      _taskid:this.data._taskid ,
      _openid:app.globalData._openid,
      isChecking:1,
    }).get({
      success:res=>{
        console.log("getCheck:", res);
        if(res.data.length != 0)
        {
          this.setData({
            isChecking:1
          })
        }
      } 
    })
    
    
  },
  
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()
  // },
  // getCenterLocation: function () {
  //   this.mapCtx.getCenterLocation({
  //     success: function(res){
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //       // moveToLocation()
  //     }
  //   })
  // },
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