/*
Navicat MySQL Data Transfer

Source Server         : meal_order_system
Source Server Version : 50640
Source Host           : 119.23.52.67:3306
Source Database       : meal_order_system

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2018-06-27 23:10:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_guestname` char(20) NOT NULL,
  `commnet_time` datetime(6) NOT NULL,
  `comment_score` int(11) NOT NULL DEFAULT '10',
  `comment_details` char(255) NOT NULL,
  `food_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_food_id` (`food_id`),
  CONSTRAINT `comment_food_id` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', 'mzh', '2018-06-15 13:23:57.000000', '10', '好吃啊', '3');

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `food_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '' COMMENT 'food name',
  `food_class` char(20) NOT NULL DEFAULT '' COMMENT 'food_class',
  `price` int(11) NOT NULL DEFAULT '0' COMMENT 'food price',
  `detail` char(20) DEFAULT '',
  `image_path` char(60) NOT NULL DEFAULT '',
  `rating` double(2,1) NOT NULL,
  `month_sales` int(8) NOT NULL,
  `rating_count` int(8) NOT NULL,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES ('1', '鱼香肉丝', '肉类', '20', '大部分是肉', 'https://meal.mlg.kim/images/1.jpg', '4.5', '1', '0');
INSERT INTO `food` VALUES ('2', '回锅肉', '肉类', '18', '微辣', 'https://meal.mlg.kim/images/2.jpg', '4.5', '0', '0');
INSERT INTO `food` VALUES ('3', '酸菜鱼', '鱼类', '30', '酸爽', 'https://meal.mlg.kim/images/3.jpg', '5.0', '0', '0');
INSERT INTO `food` VALUES ('4', '青椒炒肉', '肉类', '28', '较辣', 'https://meal.mlg.kim/images/4.jpg', '3.7', '0', '0');
INSERT INTO `food` VALUES ('5', '水煮鱼', '鱼类', '35', '清淡', 'https://meal.mlg.kim/images/5.jpg', '4.8', '0', '0');

-- ----------------------------
-- Table structure for food_record
-- ----------------------------
DROP TABLE IF EXISTS `food_record`;
CREATE TABLE `food_record` (
  `food_num` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `statues` varchar(30) NOT NULL,
  PRIMARY KEY (`order_id`,`food_id`),
  KEY `record_food_id` (`food_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_food_id` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of food_record
-- ----------------------------
INSERT INTO `food_record` VALUES ('3', '2', '2', '制作中');
INSERT INTO `food_record` VALUES ('2', '2', '4', '等待');
INSERT INTO `food_record` VALUES ('2', '3', '1', '已完成');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `pay` tinyint(1) NOT NULL,
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(32) NOT NULL,
  `order_sum` int(11) NOT NULL DEFAULT '0',
  `order_time` datetime(6) NOT NULL,
  `order_cut` int(11) NOT NULL,
  `goods_num` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `id` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('0', '2', '1', '110', '2018-06-26 00:00:00.000000', '0', '5');
INSERT INTO `orders` VALUES ('0', '3', '1', '40', '2018-06-26 01:27:44.000000', '0', '2');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `session_key` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'test', '123', '0');
INSERT INTO `user` VALUES ('2', 'T1', '123', '0');
INSERT INTO `user` VALUES ('3', 'T2', '123', '0');
INSERT INTO `user` VALUES ('4', 'T3', '123', '0');
