// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var detailPics = []
  chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (result) => {
      detailPics = result.tempFilePaths
    },
  })

  return {
    detailPics: detailPics,
  }
}