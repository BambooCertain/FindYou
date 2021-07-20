// pages/createTask/createTask.js
var app = getApp();
var that;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      detailPics:[],//上传图片的合集
      images:[],
      _taskid:0,
      // taskType 表示任务类型 0 表示寻人 1 表示寻宠物 2 表示认亲
      taskType:0,
      // _openid:"oYXlB5Hj54R1ng0q29vdDcyqrlFo",
      date:'',
      cloudPics:[],
      cloudAddress:'cloud://findyoucloud-9gqeacwcc7c2605d.6669-findyoucloud-9gqeacwcc7c2605d-1306416417/misserPics/',
      isCallPoliceArray:[0 , 1],
      task:{},
      taskCreated:0,
    },
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
    console.log(e.detail.value)
  },
  

  // 递归上传图片到云存储
  uploadFiles(imagePaths , successUp , failUp , count , length){
      var that = this;
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
          if(count == length)
          {
            console.log('successUp:' + successUp +',' +  'failUp:' + failUp);
            
            wx.showToast({
              title:'任务创建成功',
              duration:2000,
              success: res=>{
                wx.switchTab({
                  url: '/pages/home/home'
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
  taskSubmit:function(e){
    that = this;
    wx.cloud.callFunction({
      name:'createFindTask',
      data:{
        misserName: e.detail.value.misser_name,
        misserAge: e.detail.value.misser_age,
        misserSex: e.detail.value.misser_sex,
        misserAddress: e.detail.value.misser_address,
        misserTime: e.detail.value.misser_time,
        misserDetailPics: this.data.cloudPics,
        isCallPolice: e.detail.value.isCallPolice,
        price: e.detail.value.price,
        taskType: this.data.taskType,
        title: e.detail.value.title,
        introduction: e.detail.value.introduction,
        familyName: app.globalData.userName,
        familyPhoneNumber: app.globalData.phoneNumber,
        isFinish: 0,
      },
      success: res=>{
        console.log('[云函数][createFindTask][创建找人任务]调用成功' , res)
        that.uploadFiles(that.data.detailPics , 0 , 0 , 0 , that.data.detailPics.length)
        // console.log('this.data.detailPics[0].substring(11)' , this.data.detailPics[0].substring(11))
        
      },
      fail: res=>{
        console.log('[云函数][createFindTask][创建找人任务]调用失败' , res)
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
  // uploadImage:function(e){
  //   var that = this;
  //   var pics = [];
  //   var detailPics = that.data.detailPics;
  //   if(detailPics.length > 9){
  //      wx.showToast({
  //        title:"最多选择9张！",
  //      })
  //      return;
  //   }
  //   const db = wx.cloud.database()
  //   let _taskid = db.collection('tasks').count()
  //   this.setData({
  //     _taskid:_taskid
  //   })
    

  //   wx.chooseImage({
  //     count: 9,
  //     sizeType: ['original','compressed'],
  //     sourceType: ['album','camera'],
  //     success: (res)=>{
  //       var images = res.tempFilePaths;
  //       for(var i = 0 ; i < images.length ; ++ i)
  //       {
  //         wx.cloud.uploadFile({
  //           cloudPath:'miss_images/' + this.data._openid + '_' + this.data._taskid + '_' + i + '.png',
  //           filePath:images[i],
  //           success: res=>{
  //             console.log(res.fileID)
  //           },
  //           fail: console.error
  //         })
  //       }
  //       console.log("images" , images)
        


  //     },
  //     fail: ()=>{},
  //     complete: ()=>{}
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      
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