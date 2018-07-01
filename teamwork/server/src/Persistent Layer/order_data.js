var mysql  = require('mysql'); 
moment = require('moment');

var connection = mysql.createConnection({     
	host     : 'localhost',       
	user     : 'root',              
 	password : 'root',       
 	port: '3306',                   
 	database: 'meal_order_system', 
}); 




get_order = function(openid, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	//console.log('Hello');
	connection.query('SELECT o.* FROM orders o, user u WHERE u.id = o.id AND u.user_id = ?', openid, function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		callback(result);
	});
	connection.end();
}

get_order_all = function(callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	//console.log('Hello');
	connection.query('SELECT * FROM orders', function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		callback(result);
	});
	connection.end();
}

get_order_by_id = function(order_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();
	//console.log('Hello');
	connection.query('SELECT * FROM orders WHERE order_id = ?',order_id, function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		callback(result);
	});
	connection.end();
}



get_order_detail = function (food_id, callback) {
	connection = mysql.createConnection(connection.config);
	connection.connect();


	connection.query('SELECT f.food_id, f.name as name, f.price as price ,fr.food_num as number, fr.statues as statues FROM  food f, (SELECT * FROM food_record WHERE order_id = ?) fr WHERE fr.food_id = f.food_id', food_id, function (err, result) {
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


create_order = function(id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	var now_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	console.log(now_time);
	connection.query('INSERT INTO `orders` (`id`, `order_time`) VALUES (?, ?)', [id, now_time], function (err, result) {
			if(err){
 	         console.log('[INSERT ERROR] - ',err.message);
  	        return;
   	     	}
       		console.log(result);
			callback({order_id:result.insertId, order_time: now_time});
	});
	
	connection.end();
}

add_food = function(food_id, num, order_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	connection.query('INSERT INTO `food_record` (`food_num`, `order_id`, `food_id`) VALUES (?, ?, ?)', [num, order_id, food_id], function (err, result) {
			if(err){
 	         console.log('[INSERT ERROR] - ',err.message);
  	        return;
   	     	}
       		console.log(result);
			callback(result);
	});
	connection.end();
}

update_food = function(food_id, num, statues, order_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	connection.query('UPDATE `food_record` SET `food_num`=?, `statues`=? WHERE (`food_id`=? AND `order_id`=?)',[num, statues, food_id, order_id], function (err, result) {
		if(err){
 	        console.log('[UPDATE ERROR] - ',err.message);
  	        return;
   	     	}
       	console.log(result);
		callback(result);
	});
	connection.end();

}

delete_food = function(food_id, order_id, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	connection.query('DELETE FROM `food_record` WHERE (`food_id`=? AND `order_id`=?)',[food_id, order_id], function (err, result) {
		if(err){
 	        console.log('[DELETE ERROR] - ',err.message);
  	        return;
   	     	}
       	console.log(result);
		callback(result);
	});
	connection.end();
}

update_order = function(sum, cut, num,  desk_num, order_id, pay, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	connection.query('UPDATE `orders` SET `order_sum`=?, `order_cut`=?, `goods_num`=?, `desk_num`=?, `pay` = ? WHERE (`order_id`=?)',[sum, cut, num, desk_num, pay, order_id], function (err, result) {
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
    get_order: get_order,
	get_order_all: get_order_all,
	get_order_by_id:get_order_by_id,
    get_order_detail: get_order_detail,
	create_order: create_order,
	add_food: add_food,
	update_food: update_food,
	delete_food: delete_food,
	update_order: update_order
}
