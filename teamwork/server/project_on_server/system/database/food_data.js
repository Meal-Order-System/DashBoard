var mysql  = require('mysql'); 

var connection = mysql.createConnection({     
	host     : 'localhost',       
	user     : 'root',              
 	password : 'root',       
 	port: '3306',                   
 	database: 'meal_order_system', 
}); 


/*
 * 从数据库获取菜单
 */
get_menu = function(callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	console.log('Hello');
	connection.query('SELECT * FROM food', function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		callback(result);
	});
	connection.end();
}



/*
 * 从数据库获取单件食品信息
 */
get_food_detail = function (food_id, callback) {
	connection = mysql.createConnection(connection.config);
	connection.connect();


	connection.query('SELECT * FROM food WHERE food_id=?', food_id, function (err, result) {
	        if(err){
 	         console.log('[SELECT ERROR] - ',err.message);
  	        return;
   	     	}

       		console.log('--------------------------SELECT----------------------------');
       		console.log(result);
       		console.log('------------------------------------------------------------\n\n');  
			callback(result);
	});

	connection.end();
}

/*
 * 更新食品信息，用于商家修改食物
 */
update_food = function(food_id, name, food_class, price, detail, image_path, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	connection.query('UPDATE `food` SET `name`=?, `food_class`=?, `price`=?, `detail`=?, `image_path`=? WHERE (`food_id`=?)',[name, food_class, price, detail, image_path, food_id], function (err, result) {
		if(err){
 			console.log('[UPDATE ERROR] - ',err.message);
  			return;
   	    }
		console.log(result);
		callback(result);
	});
	connection.end();
}


/*
 * 往数据库添加新食物
 */
add_food = function(name, food_class, price, detail, image_path, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	connection.query('INSERT INTO `food` (`name`, `food_class`, `price`, `detail`, `image_path`) VALUES(?,?,?,?,?)', [name, food_class, price, detail, image_path], function (err, result) {
		if(err){
 			console.log('[INSERT ERROR] - ',err.message);
  			return;
   	    }
		console.log(result);
		callback(result);
	});
	connection.end();
}

/*
 * 根据食物的识别码food_id获取评论
 */
get_comment = function(food_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	connection.query('SELECT * FROM comment WHERE food_id=?', food_id, function (err, result) {
	        if(err){
 	         console.log('[SELECT ERROR] - ',err.message);
  	        return;
   	     	}

       		console.log('--------------------------SELECT----------------------------');
       		console.log(result);
       		console.log('------------------------------------------------------------\n\n');  
			callback(result);
	});

	connection.end();

}

/*
 * 对某件食品添加评论，包括评价信息，评分，用户昵称等
 */
add_comment = function(user_name, rank, comment,food_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	var now_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	console.log(now_time);
	connection.query('INSERT INTO `comment` (`comment_guestname`, `comment_time`, `comment_score`, `comment_detail`, `food_id`) VALUES(?,?,?,?,?)', [user_name, now_time, rank, comment, food_id], function (err, result) {
		if(err){
 			console.log('[INSERT ERROR] - ',err.message);
  			return;
   	    }
		console.log(result);
		callback(result);
	});
	connection.end();
}


/*
 * 更新食品评价
 */
update_food_score = function(score, rating_count, food_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	connection.query('UPDATE `food` SET `rating`=?, `rating_count`=? WHERE (`food_id`=?)',[score, rating_count, food_id], function (err, result) {
		if(err){
 			console.log('[UPDATE ERROR] - ',err.message);
  			return;
   	    }
		console.log(result);
		callback(result);
	});
	connection.end();
}

/*
 * 更新食品销量
 */
update_food_sales = function(sale, food_id,callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	connection.query('UPDATE `food` SET `month_sales`=? WHERE (`food_id`=?)',[sale, food_id], function (err, result) {
		if(err){
 			console.log('[UPDATE ERROR] - ',err.message);
  			return;
   	    }
		console.log(result);
		callback(result);
	});
	connection.end();	
}

module.exports = {
    get_food_detail: get_food_detail,
    get_menu: get_menu,
	update_food: update_food,
	add_food: add_food,
	get_comment: get_comment,
	add_comment: add_comment,
	update_food_score: update_food_score,
	update_food_sales: update_food_sales
}
