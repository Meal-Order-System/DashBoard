## Software Architecture Document

| 版本 | 日期 | 描述 | 作者|
| -- | -- | -- | -- |
| 草案 | 2018.6.27 | 主要从架构问题、解决方案说明、逻辑视图、物理视图这四个方面进行描述 | 15331241毛 |

### 架构设计

前后端分离开发，前端使用微信小程序框架，后端使用Node.js + MySQL进行开发。

### 解决方案说明

问题：服务器响应性能较差。

解决方案：优化查询语句，建立索引，减少获得结果需要的查询语句个数。

动机：提高性能。

问题：服务器无崩溃处理。

解决方案：建立备份阵列，建立崩溃恢复机制。

动机：提高健壮性。




### 逻辑视图

![逻辑视图](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/img/SAD.png)

### 物理视图

![物理视图](https://github.com/Meal-Order-System/DashBoard/blob/master/teamwork/img/phy_img.png)