## UI设计

商家端UI基本界面与市场上已有的点餐软件类似，包括

* [初始入口界面](#初始入口界面)
* [餐台管理界面](#商家管理界面)
* [菜品管理界面](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/3.PNG)
* [商家添加菜品界面](#商家添加菜品界面)


### 初始入口界面

微信授权后的用户初始入口界面，上部为用户姓名和头像，中部为logo，下部分为两个入口：客人点餐入口和商家入口。

![初始入口界面](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/IMG_5115.PNG)


### 餐台管理界面

用户登录为商家后可以在商家管理界面进行餐台管理，查看餐台对应消费和订单状态。

对于餐台的三种状态（存在未完成的菜品/所有菜品均已完成/餐台空闲），在餐台号左侧用不同的标志标识出来
![商家管理界面](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/1.PNG)

点击每个餐台可以展开/收起其对应的订单状况。餐台号右侧对应的总消费是当前已完成菜品的总金额。
![餐台对应订单详情查看](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/2.PNG)
可以看到，菜品对应的状态有三种：等待中、制作中和已完成；每个订单对应的状态有两种：已完成和完成订单。

下面以餐台1的管理为例来浏览具体的功能。

① 对于等待中的菜品处理
![等待中菜品处理](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/3.PNG)
两个选项可选
如果选择取消菜品
![取消菜品](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/9.PNG)
如果选择开始制作菜品
![开始制作](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/10.PNG)

②对订单状态的处理
![不正确标记完成](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/11.PNG)

③完成菜品(花椰菜)
![完成菜品](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/12.PNG)
注意右上总消费金额此时发生变化

④完成订单
![完成订单](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/13.PNG)

⑤支付
确认支付弹窗
![确认支付](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/14.PNG)
支付完毕后的餐台处理
![支付完毕](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/15.PNG)

### 商家添加菜品界面

商家可以为自己的店面添加菜品，需要提供菜品分类、菜品名称、菜品价格、菜品简洁并上传菜品图片。

![商家管理界面](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/4.PNG)

①商家增加菜品界面
![增加菜品界面](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/6.PNG)
图片的选择是我们常见的两种方式：
![图片上传方式](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/7.PNG)
在图片上传后、表单其他内容未确认提交时，商家可以预览自己上传的图片
![图片预览](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/8.PNG)

②商家修改菜品信息界面
![修改菜品界面] (https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/snapshot/5.PNG)
在输入框内可以看到提示信息菜品应的当前信息，商家可根据自己需求判断是否需要更改。如果不需要更改菜品信息，不输入则默认使用原有的菜品信息。
菜品图片也是如此，如果商家需要更改图片，点击现在的图片就可以选择自己想要更新的图片，同样也是可以预览效果的；如果不需要更改图片，直接提交修改即可。
