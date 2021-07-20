//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env:'findyoucloud-9gqeacwcc7c2605d'
      })
    }

    this.globalData = {
      // 用户姓名
      userName:'',
      // 用户性别
      gender:'',
      // 用户生日
      birth:'',
      phoneNumber:'',
      address:'',
      like:'',
      point:'',
      taskNumber:'',
      // 创建的用户列表
      createTaskArray:[],
      // 加入的任务列表
      joinTaskArray:[],
      userInfo:null,
      _openid:null,
      cloudPics:'cloud://findyoucloud-9gqeacwcc7c2605d.6669-findyoucloud-9gqeacwcc7c2605d-1306416417/'
    }
  }
})
