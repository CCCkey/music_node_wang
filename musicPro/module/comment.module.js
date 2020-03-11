/**
 * @description 音乐业务逻辑
 * 
 */

const mysql = require('mysql');
let conn = mysql.createConnection({ // 创建数据库连接 ES6 let	
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'music_web',
});
conn.connect();
let crypto = require("crypto"); // 加载crypto原生模块

// 获得token MD5
let getToken = function(id) {
	let md5 = crypto.createHash('md5'); // 创建MD5加密算法
	md5.update(id); // 传入初始值
	return md5.digest('hex'); // 返回加密值
}

// 获取新上传的四首音乐
function listComment(req, callback) { // 获取新上传的四首音乐方法
	let sql = "SELECT id, content, create_time, user_id FROM comment limit ? offset ?"; // 根据用户用户名和密码获取id和用户名
	conn.query(sql, [+req.query.limit, +req.query.offset], function(error, result) { // 参数分别为SQL语句、查询参数、回调函数（返回数据集）		
		console.log(result);
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			callback(undefined); // 执行回调函数		
		} else {
			for (let i in result) {
				getUserAccount(result[i].user_id, function(data) {
					result[i].user_account = data[0].user_account;
					delete result[i].user_id;
					if (i == result.length - 1) {
						callback(result); // 执行回调函数 返回数据集
					}
				});
			}

		}
	})
};

function getUserAccount(user_id, callback) {
	let sql = "SELECT user_account FROM user WHERE id = ?"; // 根据用户用户名和密码获取id和用户名
	conn.query(sql, [user_id], function(error, result) { // 参数分别为SQL语句、查询参数（用户用户名、密码）、回调函数（返回数据集）	
		callback(result);
	})
}

function addComment(req, callback) { // 获取新上传的四首音乐方法
	if (getToken(req.session.userToken) == req.body["token"]) {
		let sql = "INSERT INTO comment(user_id, music_id, content) VALUES(?, ?, ?);"; // 根据用户用户名和密码获取id和用户名
		conn.query(sql, [req.body["user_id"], req.body["music_id"], req.body["content"]], function(error, result) { // 参数分别为SQL语句、查询参数（用户用户名、密码）、回调函数（返回数据集）
			if (error) { // 插入操作失败			
				callback(undefined); // 执行回调函数		
			} else { // 插入操作成功		
				callback(result); // 执行回调函数 	
			}
		})
	} else {
		callback(undefined); // 执行回调函数	
	}
};
exports.listComment = listComment;
exports.addComment = addComment;
