# 数据库设计

标签（空格分隔）： 系统分析与设计

---


## **食品管理系统**
1 评价(comment) : 评价id(comment_id),评分人(comment_guestname),评价时间(comment_time),评分(comment_score),评价细则(comment_details),食物id(food_id)

2 食品(food) : 食品id(food_id),食品名称(name),食品类别(food_class),价格(price),详细描述信息(detail),图片路径(image_path),评分(rating),月销售量(month_sales),rating_count

3 点餐记录(food_record) : 点餐数量(food_num),订单id(order_id),食品id(food_id),状态(status)

5 订单(order) : 金额(pay),订单id(order_id),id(id),订单总额(order_sum),订单时间(order_time),order_cut(order_cut),goods_num(goods_num)

4 顾客(user) : id(id), 顾客id(user_id), 登陆密码(session_key),admin(admin)



## **实体之间的联系**
1 一个食品对应多条评价
2 一个食品对应多条点餐记录
3 一个顾客对应多个订单
4 一个订单对应一条评价
5 一个顾客对应多条评价

## **ER图**
![1.png-71.3kB][1]


  [1]: http://static.zybuluo.com/panchy7/w9ke902o2ca5nni0fqox5so5/1.png