/**
 * @description 音乐路由
 * 
 */

let express = require("express"); // 加载express模块 ES6 let
let router = express.Router(); // 实例化路由处理程序 ES6 let
let music = require("../module/music.module.js"); // 加载音乐相关数据库操作模块（自定义） ES6 let

/**
 * @description 描述:返回信息给前端
 * 
 */
let jsonWrite = function(res, ret, add) { //  ES6 let
	if(typeof ret === "undefined") { // 判断数据是否存在
		res.json({ // 返回数据
			state: "500", // 状态码
			msg: "操作失败", // 提示消息
		});
	}else{
		res.json({ // 返回数据
			state: "200", // 状态码
			msg: "操作成功", // 提示消息
			data: ret,
			extra: add
		});
	}
};

// 获取新上传的四首音乐
router.get("/new", (req, res) => { // 获取新上传的四首音乐函数 ES6箭头函数
	music.listMusicByNew(req, function(data, add){ // 调用获取新上传的四首音乐方法，执行回调函数
		jsonWrite(res, data, add); // 执行回调函数
	})
});
// 获取新上传的四首音乐
router.get("/click", (req, res) => { // 获取新上传的四首音乐函数 ES6箭头函数
	music.listMusicByClick(req, function(data, add){ // 调用获取新上传的四首音乐方法，执行回调函数
		jsonWrite(res, data, add); // 执行回调函数
	})
});

router.get("/music", (req, res) => { // 获取新上传的四首音乐函数 ES6箭头函数
	music.getMusic(req, function(data, add){ // 调用获取新上传的四首音乐方法，执行回调函数
		jsonWrite(res, data, add); // 执行回调函数
	})
});

module.exports = router; // 定义路由处理程序模块
