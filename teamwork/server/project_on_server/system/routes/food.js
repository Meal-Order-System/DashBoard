var express = require('express');
var router = express.Router();
var food_data = require('../database/food_data');
var multiparty = require('multiparty');

router.get('/', function (req, res, next) {
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
			res.set('Content-Type', 'application/json');
			res.set('charset', 'utf-8');
			res.end(JSON.stringify(data));
		});
	}
    /*
    var data = [
      {
        "name": "热销推荐",
        "foods": [
          {
            "image_url": "",
            "rating": 4.2,
            "month_sales": 15,
            "rating_count": 5,
            "image_path": "",
            "name": "隆江猪脚饭",
            "price": 30
          }
        ]
      },
      {
        "name": "人气单品",
        "foods": [
          {
            "image_url": "",
            "rating": 4,
            "month_sales": 6,
            "rating_count": 3,
            "image_path": "",
            "name": "北京烤鸭饭",
            "price": 25
          },
          {
            "image_url": "",
            "rating": 4.296666666666666,
            "month_sales": 215,
            "rating_count": 59,
            "image_path": "",
            "name": "猪杂汤饭",
            "price": 15
          }
        ]
      }
    ];

    
    res.set('Content-Type', 'application/json');
    res.set('charset', 'utf-8');
    res.json(data);
    res.end();
    
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    */

    
});


router.post("/uploadImg", function (req, res, next) {
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
			var path = files.files[0].path;
			var link = path.replace(/public/g, "https://meal.mlg.kim/");
			console.log(link);
			res.set('Content-Type', 'application/json');
			res.set('charset', 'utf-8');
			res.end(JSON.stringify({path: link}));
		}
	});
});




module.exports = router;
