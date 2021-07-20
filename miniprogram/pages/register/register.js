var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  registerSuccess:function(e)
  {
    console.log(e)
    var userName = e.detail.value.userName
    var gender = e.detail.value.gender
    var address = e.detail.value.address
    var birth = e.detail.value.birth
    var phoneNumber = e.detail.value.phoneNumber
    const db = wx.cloud.database()

    db.collection('users').add({
      data:{
        userName:e.detail.value.userName,
        gender:e.detail.value.userGender,
        address:e.detail.value.userAddress,
        birth:e.detail.value.userBirth,
        phoneNumber:e.detail.value.phoneNumber,
        point:0,
        taskNumber:0,
        like:0,
        joinTaskArray:[],
        createTaskArray:[],
        checkTaskArray:[],
      },
      success:function(res){
        console.log(res)
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: function(err){
        console.log(err)
      }
    })


    
  },
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