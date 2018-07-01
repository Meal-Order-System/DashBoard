var express = require('express');
var router = express.Router();
var food_data = require('../database/food_data');
var order_data = require('../database/order_data');
//var user_data = require('../database/user_data');

router.get('/', function (req, res, next) {
	if(!req.query.openid){
		res.set('Content-Type', 'application/json');
		res.end();
	}else{
		var openid = req.query.openid;
		console.log(openid);
		order_data.get_order(openid, function(order){
			console.log(order);
			var data = [];
			var fun_list = [];
			for(var i = 0;i < order.length; i++){
				fun_list.push(function(j){
						order_data.get_order_detail(order[j].order_id, function(result){
						var sumMoney = 0;
						var cutMoney = 0;
						var goodsNum = 0;
						var recordID = order[j].order_id;
						result.forEach(function(item, index){
							sumMoney = sumMoney + item.price * item.number;
							goodsNum = goodsNum + item.number;
						});
						data.push({
							"currCart": result,
							"orderTime": order[j].order_time,
							"sumMoney": sumMoney,
							"cutMoney": cutMoney,
							"goodsNum": goodsNum,
							"recordID": recordID
						});
						fun_list[j+1](j+1);
					});
				});

			};
			fun_list.push(function(j){
				res.set('Content-Type', 'application/json');
				res.end(JSON.stringify(data));
			});
			fun_list[0](0);
		});
	}
});

module.exports = router;
