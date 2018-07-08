/*
Navicat MySQL Data Transfer

Source Server         : meal_order_system
Source Server Version : 50640
Source Host           : 119.23.52.67:3306
Source Database       : meal_order_system

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2018-07-08 17:46:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_guestname` char(20) NOT NULL,
  `comment_time` datetime(6) NOT NULL,
  `comment_score` int(11) NOT NULL DEFAULT '10',
  `comment_detail` char(255) NOT NULL,
  `food_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_food_id` (`food_id`),
  CONSTRAINT `comment_food_id` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

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
  `rating` double(2,1) NOT NULL DEFAULT '0.0',
  `month_sales` int(8) NOT NULL DEFAULT '0',
  `rating_count` int(8) NOT NULL DEFAULT '0',
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for food_record
-- ----------------------------
DROP TABLE IF EXISTS `food_record`;
CREATE TABLE `food_record` (
  `food_num` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `statues` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`,`food_id`),
  KEY `record_food_id` (`food_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_food_id` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `pay` tinyint(1) NOT NULL DEFAULT '0',
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(32) NOT NULL,
  `order_sum` int(11) NOT NULL DEFAULT '0',
  `order_time` datetime(6) NOT NULL,
  `order_cut` int(11) NOT NULL DEFAULT '0',
  `goods_num` int(11) NOT NULL DEFAULT '0',
  `desk_num` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`),
  KEY `id` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
