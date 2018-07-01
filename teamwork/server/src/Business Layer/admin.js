var express = require('express');
var http = require('https');
var router = express.Router();
var multiparty = require('multiparty');
var food_data = require('../database/food_data');
var user_data = require('../database/user_data');
var order_data = require('../database/order_data');

var appid = "";
var secret = "";

check_login = function(openid){
	return true;
};

router.post("/uploadImg", function (req, res, next) {
	if(!check_login(req.body.openid)){
		res.set('Content-Type', 'application/json');
		res.set('charset', 'utf-8');
		res.end(JSON.stringify({err: "not admin"}));
		return;
	}
	var form = new multiparty.Form();
	console.log(__dirname);
    form.encoding = 'utf-8';
    form.uploadDir ="./public/images";
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files);
		if(err){
			console.log('parse error: ' + err);
		} else {
			console.log(fields);
			console.log(files);
			if(files.content){
				var path = files.content[0].path;
			}
			if(files.file){
				var path = files.file[0].path;
			}
			var link = path.replace(/public/g, "https://meal.mlg.kim/");
			console.log(link);
			res.set('Content-Type', 'application/json');
			res.set('charset', 'utf-8');
			res.end(JSON.stringify({path: link}));
		}
	});
});


router.post("/updateFood", function (req, res, next) {
	if(!check_login(req.body.openid)){
		res.set('Content-Type', 'application/json');
		res.set('charset', 'utf-8');
		res.end(JSON.stringify({err: "not admin"}));
		return;
	}
	console.log(req);
	if(!req.body.food_id){
		food_data.get_menu(function(result){
			food_data.add_food(req.body.name, req.body.food_class, req.body.price, req.body.detail, req.body.image_path, function(data){
				console.log(data.insertId);
				res.set('Content-Type', 'application/json');
				res.set('charset', 'utf-8');
				res.end(JSON.stringify({"food_id":data.insertId}));
			});
		});
	}else{
		food_data.update_food(req.body.food_id, req.body.name, req.body.food_class, req.body.price, req.body.detail, req.body.image_path, function(data){
			console.log(data);
			res.set('Content-Type', 'application/json');
			res.set('charset', 'utf-8');
			res.end(JSON.stringify({"changed":data.changedRows}));
		});
	}
});


router.get('/order', function (req, res, next) {
	if(!check_login(req.body.openid)){
		res.set('Content-Type', 'application/json');
		res.set('charset', 'utf-8');
		res.end(JSON.stringify({err: "not admin"}));
		return;
	}
	order_data.get_order_all(function(order){
		console.log(order);
		var data = [];
		var fun_list = [];
		for(var i = 0;i < order.length; i++){
			fun_list.push(function(j){
					order_data.get_order_detail(order[j].order_id, function(result){
					var sumMoney = order[j].order_sum;
					var cutMoney = order[j].order_cut;
					var goodsNum = order[j].goods_num;
					var recordID = order[j].order_id;
					data.push({
						"currCart": result,
						"orderTime": order[j].order_time,
						"orderPayed": order[j].pay,
						"sumMoney": sumMoney,
						"cutMoney": cutMoney,
						"goodsNum": goodsNum,
						"recordID": recordID,
						"desk_num": order[j].desk_num
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
});

router.post("/change_order", function(req, res, next){
	if(!check_login(req.body.openid)){
		res.set('Content-Type', 'application/json');
		res.set('charset', 'utf-8');
		res.end(JSON.stringify({err: "not admin"}));
		return;
	}
	var operation = req.body.operation;
	var order_id = req.body.order_id;
	var fun_list = [];
	console.log(req.body);
	if(operation){
		for(var i = 0; i < operation.length; i++){
			fun_list.push(function(j){
				var op = operation[j].operation;
				
				if(op == 0){
					order_data.add_food(operation[j].food_id, operation[j].num, order_id, function(result){
						console.log(result);
						fun_list[j+1](j+1);
					});
				}
				if(op == 1){
					order_data.delete_food(operation[j].food_id, order_id, function(result){
						fun_list[j+1](j+1);
					});
				}
				if(op == 2){
					order_data.update_food(operation[j].food_id, operation[j].num, operation[j].statues, order_id, function(result){
						fun_list[j+1](j+1);
					});
				}
			});
		}
	}
	fun_list.push(function(j){
		order_data.get_order_by_id(order_id, function(result_order){
			console.log(result_order);
			order_data.get_order_detail(order_id, function(result){
				var sumMoney = 0;
				var cutMoney = result_order[0].order_cut;
				var goodsNum = 0;
				var pay = 0;
				var desk_num = result_order[0].desk_num;
				if(req.body.order_cut){
					cutMoney = req.body.order_cut;
				}
				if(req.body.desk_num){
					desk_num = req.body.desk_num;
				}
				if(req.body.pay){
					var s = 1;
					if(pay != req.body.pay){
						pay = req.body.pay;
						if(pay = 0) s = -1;
						result.forEach(function(item, index){
							food_data.get_food_detail(item.food_id, function(result){
								var sale = result[0].month_sales + item.num * s;
								food_data.update_food_sales(sale, item.food_id, function(result){});
							});
						});
					}
				}
				result.forEach(function(item, index){
					sumMoney = sumMoney + item.price * item.number;
					goodsNum = goodsNum + item.number;
				});

				order_data.update_order(sumMoney, cutMoney, goodsNum, desk_num,order_id, pay, function(result_update){
					res.set('Content-Type', 'application/json');
					res.end(JSON.stringify({"statues":"success"}));
				});
			});
		});
	});
	console.log(fun_list.length);
	fun_list[0](0);
});

module.exports = router;
