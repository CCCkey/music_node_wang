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

// 获取新上传的四首音乐
function listMusicByNew(req, callback){ // 获取新上传的四首音乐方法
	let sql = "SELECT id, music_name, singer, music_img_url FROM music ORDER BY create_time DESC LIMIT ?"; // 根据用户用户名和密码获取id和用户名
	conn.query(sql, [+req.query.limit], function(error, result) { // 参数分别为SQL语句、查询参数、回调函数（返回数据集）		
		console.log(result);
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			callback(undefined); // 执行回调函数		
		}else{			
			callback(result); // 执行回调函数 返回数据集
		}
	})
};

// 获取新上传的四首音乐
function listMusicByClick(req, callback){ // 获取新上传的四首音乐方法
	let sql = "SELECT id, music_name, singer, music_img_url FROM music ORDER BY click_number DESC LIMIT ?"; // 根据用户用户名和密码获取id和用户名
	conn.query(sql, [+req.query.limit], function(error, result) { // 参数分别为SQL语句、查询参数、回调函数（返回数据集）		
		console.log(result);
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			callback(undefined); // 执行回调函数		
		}else{			
			callback(result); // 执行回调函数 返回数据集
		}
	})
};

function getMusic(req, callback){ // 获取音乐方法
	let sql = "SELECT id, music_name, singer,music_url,lyric_url,music_img_url,click_number FROM music WHERE id=?"; // 根据用户用户名和密码获取id和用户名
	conn.query(sql, [+req.query.id], function(error, result) { // 参数分别为SQL语句、查询参数、回调函数（返回数据集）		
		console.log(result);
		if (result[0] == null || result[0] == "") { // 若返回数据集为空，返回操作错误信息			
			callback(undefined); // 执行回调函数		
		}else{			
			callback(result); // 执行回调函数 返回数据集
		}
	})
};

exports.listMusicByNew = listMusicByNew; // 定义获取新上传的四首音乐方法
exports.listMusicByClick = listMusicByClick; // 定义获取点击数最多的四首音乐方法
exports.getMusic = getMusic; // 定义获取音乐方法