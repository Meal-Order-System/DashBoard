var mysql  = require('mysql'); 

var connection = mysql.createConnection({     
	host     : 'localhost',       
	user     : 'root',              
 	password : 'root',       
 	port: '3306',                   
 	database: 'meal_order_system', 
}); 


query_user = function(openid, callback){
	connection = mysql.createConnection(connection.config);
	connection.connect();

	connection.query('SELECT * FROM user WHERE user_id = ?', openid, function (err, result) {
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		callback(result);
	});
	connection.end();
}

add_user = function (openid, session_key, callback) {
	connection = mysql.createConnection(connection.config);
	connection.connect();

	connection.query('INSERT INTO `user` (`user_id`, `session_key`, `admin`) VALUES (?, ?, ?)', [openid, session_key, 0], function (err, result) {
	        if(err){
 	         console.log('[INSERT ERROR] - ',err.message);
  	        return;
   	     	}

       		console.log('--------------------------SELECT----------------------------');
       		console.log(result);
       		console.log('------------------------------------------------------------\n\n');  
			callback(result);
	});

	connection.end();
}


module.exports = {
    query_user: query_user,
    add_user: add_user
}
