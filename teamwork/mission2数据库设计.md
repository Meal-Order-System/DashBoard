![1.png-62.7kB][1]
##**食品管理系统**

1 食品(food) : 食品id(food_id),食品名称(food_name),食品类别(food_category),评分(food_score),价格(food_price),详细描述信息(food_description),图片名称(food_pic)

2 顾客(customer) : 顾客id(customer_id),顾客微信名(customer_wechatname)

3 评价(comment) : 评价id(comment_id),评价时间(comment_time),评分(comment_score)

4 订单(order) : 订单id(order_id),订餐时间(order_time)

5 点餐记录(memo) : 点餐记录id(memo_id),点餐时间(memo_time),点餐人id(memo_id),评分(memo_score),订单id(order_id)

##**实体之间的联系**
1 一个食品对应多条评价
2 一个顾客对应多个订单
3 一个订单对应一条评价
4 一条评价对应一个顾客
5 一个食品对应多条点餐记录

  [1]: http://static.zybuluo.com/panchy7/rs21rfs9lr414d959n18qprl/1.png
