// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   * 要从父组件中接受的数据
   */
  properties: {
    // 要接受的数据名称
    aaa:{
      // type 要接受的属性类型
      type: String,
      // 默认值
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:"首页",
        isActive:true
      },
      {
        id:1,
        name:"分类",
        isActive:false
      },
      {
        id:2,
        name:"关于",
        isActive:false
      },
    ]
  },

  /**
   * 组件的方法列表
   * 1 页面.js 文件中 存放事件的回调函数的时候 存放在data的同层次下
   * 2 组件.js 文件中 存放事件的回调函数的时候 存放在 methods 中
   */
  
  methods: {
      handleItemTap(e){
        console.log(e);
        /* 
        1 绑定点击事件 需要在methods中绑定
        2 获取被点击的索引
        3 获取原数组
        4 对数组循环
          1 给每一个循环项 选中属性 改为 false
          2 给当前索引的项 添加激活选中效果
        */
        // 获取索引
        const {index} = e.currentTarget.dataset;
        // 获取 data 中的数组

        // 解构 ： 对复杂类型进行解构的时候 复制一份 变量的引用 （引用）
        // 最严谨的做法应该是 重新拷贝一份数组 在对这个数组的备份进行处理
        // let tabs = JSON.parse(JSON.stringify(this.data.tabs));
        // 以下两种方法 效果相同 都是对 tabs 的 解构
        let {tabs} = this.data
        //  let tabs = this.data.tabs;
       // 循环数组
        tabs.forEach((v,i)=> i === index ? v.isActive =  true : v.isActive = false );
        this.setData({
            tabs:tabs
        });
      }
  }
})
