var express = require('express');
var http = require('https');
var router = express.Router();
var multiparty = require('multiparty');
var food_data = require('../database/food_data');
var user_data = require('../database/user_data');
var order_data = require('../database/order_data');

var appid = "wx7c23c5d2c5dbbab1";
var secret = "9051d8e80c67730540d118db18b32c9a";


/*
 * 用户登录
 */
router.get('/login', function (req, res, next) {
	console.log(req.query);
	var req_data = req.query;
	var path = "/sns/jscode2session?appid=" + appid + "&secret=" + secret +"&js_code=" + req.query.code + "&grant_type=authorization_code";
	var options={  
		host:"api.weixin.qq.com",                   //要访问的域名，别加http或https
		path: path,									//请求的路径或参数
		method:'get'								//请求类型，这里是get
	}  
	var sendmsg='';                                //创建空字符串，用来存放收到的数据
	request_2=http.request(options, function(request) {      //发出请求，加上参数，然后有回调函数
		request.on("data", function(chunk) {               //监听data,接受数据
		sendmsg += chunk;                         //把接受的数据存入定放的sendmsg
		});        
		request.on("end", function(d) {                     //监听end事件，请求结束后调用
			var list=JSON.parse(sendmsg);            //对接受到的数据流进行编码
			console.log(list);                  //打印出结果
			if(!list.errcode){
				user_data.query_user(list.openid, function(result){
					console.log(result); 
					if(!result[0]){
						user_data.add_user(list.openid, list.session_key, function(){
							data = {
								openid: list.openid
							}
							res.set('Content-Type', 'application/json');
							res.set('charset', 'utf-8');
							res.end(JSON.stringify(data));
						});
					}else{
						data = {
							openid: list.openid,
							admin: result[0].admin
						}
						res.set('Content-Type', 'application/json');
						res.set('charset', 'utf-8');
						res.end(JSON.stringify(data));
					}
				});
			}else{
				data = {
					error: "invalid code"
				}
				res.set('Content-Type', 'application/json');
				res.set('charset', 'utf-8');
				res.end(JSON.stringify(data));
			}
		}); 
	});
	request_2.end();
});


/*
 * 用户查看菜单
 * 当发送的json带有food_id时，返回带评论的食物详细信息
 */
router.get('/food', function (req, res, next) {
	console.log(req.query);
	if(!req.query.food_id){
		food_data.get_menu(function(result){
			var food_class = [];
			var data = [];
			result.forEach(function(item, index){
				var i = 0;
				for (; i < food_class.length; i++)
				{
					if(item.food_class == food_class[i]){
						data[i].foods.push(item);
						break;
					}
				}
				if(i == food_class.length){
					food_class.push(item.food_class);
					data.push({
						"name" : item.food_class,
						"foods":[]
					});
					data[food_class.length - 1].foods.push(item);
				}
			});
        res.set('Content-Type', 'application/json');
        res.set('charset', 'utf-8');
        res.end(JSON.stringify(data));
    });
	}
	else{
		var food_id = req.query.food_id;
		food_data.get_food_detail(food_id, function(data){
			food_data.get_comment(food_id, function(comment){
				var res_data = data[0]; 
				res_data.comment = comment;
				res.set('Content-Type', 'application/json');
				res.set('charset', 'utf-8');
				res.end(JSON.stringify(res_data));		
			});
		});
	}
});

/*
 * 用户查看历史订单
 */
router.get('/order', function (req, res, next) {
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
	}
});

/*
 * 上传图片
 */
router.post('/new_order', function (req, res, next) {
	var order = req.body.order;
	var openid = req.body.openid;
	var desk_num = req.body.desk_num;
	console.log(req.body);
	user_data.query_user(openid, function(result_id){
		var id = result_id[0].id;
		
		order_data.create_order(id, function(order_id_result){
			//console.log(order_id_result);
			var order_id = order_id_result.order_id;
			var fun_list = [];
			for(var i = 0; i < order.length; i++){
				fun_list.push(function(j){
					console.log(j);
					console.log(order_id);
					order_data.add_food(order[j].food_id, order[j].num, order_id, function(result){
						fun_list[j+1](j+1);
					});
				});
			};
			fun_list.push(function(j){
				order_data.get_order_detail(order_id, function(result){
					var sumMoney = 0;
					var cutMoney = 0;
					var goodsNum = 0;
					var pay = 0;
					result.forEach(function(item, index){
						sumMoney = sumMoney + item.price * item.number;
						goodsNum = goodsNum + item.number;
					});
					order_data.update_order(sumMoney, cutMoney, goodsNum, desk_num,order_id, pay, function(result_update){
						res.set('Content-Type', 'application/json');
						res.end(JSON.stringify({
							"currCart": result,
							"orderTime": order_id_result.order_time,
							"sumMoney": sumMoney,
							"cutMoney": cutMoney,
							"goodsNum": goodsNum,
							"pay": pay,
							"recordID": order_id
						}));
					})
				});
			});
			fun_list[0](0);
		});
	});
});


/*
 * 修改订单信息
 */
router.post("/change_order", function(req, res, next){
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


/*
 * 为食品添加评论
 */
router.post("/comment", function(req, res, next){
	food_data.add_comment(req.body.user_name, req.body.rank, req.body.comment, req.body.food_id, function(result_comment){
		food_data.get_food_detail(req.body.food_id, function(result){
			var new_score = (result[0].rating_count * result[0].rating + req.body.rank)/(result[0].rating_count + 1);
			food_data.update_food_score(new_score, result[0].rating_count + 1,req.body.food_id, function(result){
				res.set('Content-Type', 'application/json');
				res.end(JSON.stringify({"statues":"success"}));
			});
		});	
	});

});

module.exports = router;
