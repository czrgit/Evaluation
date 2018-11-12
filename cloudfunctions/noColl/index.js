// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const collection = db.collection('collection')
// 云函数入口函数
exports.main = async (event, context) => {
 return	await collection.where({
	 aid: event.aid
 }).remove()
}