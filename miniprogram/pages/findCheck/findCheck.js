// pages/findCheck/findCheck.js
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    relationArray:['夫妻' , '父母' , '子女' ,'兄弟' , '姐妹'],
    relation:'',
    _taskid:'',
    name:'',
    phoneNumber:'',
    detailPics:[],
    cloudAddress:'cloud://findyoucloud-9gqeacwcc7c2605d.6669-findyoucloud-9gqeacwcc7c2605d-1306416417/checkPics/',
    cloudPics:[],
  },
  bindDataChange:function(e)
  {
    this.setData({
      index : e.detail.value
    })
  },
  // 递归上传图片到云存储
  uploadFiles(imagePaths , successUp , failUp , count , length){
      that = this;
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
            cloudPics: cloudPics
          })
        }
        
      })
  },

  findCheckSubmit:function(e)
  {
    console.log("e.detail:",e.detail)
    that = this;
    wx.cloud.callFunction({
      name:'createCheck',
      data:{
        _taskid: this.data._taskid,
        _openid: app.globalData._openid,
        name: e.detail.value.name,
        phoneNumber: e.detail.value.phoneNumber,
        relation: e.detail.value.relation,
        detailPics: this.data.cloudPics,
        introduction:""
      },
      success: res=>{
        console.log('[云函数][createCheck][创建寻人验证]调用成功', res);
        that.uploadFiles(that.data.detailPics , 0 , 0  , 0 , that.data.detailPics.length)
        console.log("that.data.detailPics.length:",that.data.detailPics.length)
      },
      fail: err=>{
        console.log("[云函数][createCheck][创建寻人验证]调用失败" , err)
      }

    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _taskid: options._taskid
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