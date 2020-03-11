/**
 * @description 音乐路由
 * 
 */

let express = require("express"); // 加载express模块 ES6 let
let router = express.Router(); // 实例化路由处理程序 ES6 let
let comment = require("../module/comment.module.js"); // 加载音乐相关数据库操作模块（自定义） ES6 let

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

// 获取评论列表
router.get("/list", (req, res) => { 
	comment.listComment(req, function(data, add){ 
		jsonWrite(res, data, add); // 执行回调函数
	})
});

// 保存评论列表
router.post("/add", (req, res) => { 
	
	comment.addComment(req, function(data, add){ 
		jsonWrite(res, data, add); // 执行回调函数
	})
});


module.exports = router; // 定义路由处理程序模块
