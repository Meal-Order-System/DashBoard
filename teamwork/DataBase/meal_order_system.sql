/*
Navicat MySQL Data Transfer

Source Server         : MealDB
Source Server Version : 50640
Source Host           : 119.23.52.67:3306
Source Database       : meal_order_system

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2018-06-20 22:39:29
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
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `food_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_name` char(20) NOT NULL DEFAULT '' COMMENT 'food name',
  `food_class` char(20) NOT NULL DEFAULT '' COMMENT 'food_class',
  `food_price` int(11) NOT NULL DEFAULT '0' COMMENT 'food price',
  `food_details` char(20) DEFAULT '',
  `food_img_link` char(20) DEFAULT '',
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for food_record
-- ----------------------------
DROP TABLE IF EXISTS `food_record`;
CREATE TABLE `food_record` (
  `food_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_record_time` datetime(6) NOT NULL,
  `food_record_guestname` char(255) NOT NULL,
  `food_record_num` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  PRIMARY KEY (`food_record_id`),
  KEY `order_id` (`order_id`),
  KEY `record_food_id` (`food_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_food_id` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_guestname` char(255) NOT NULL,
  `order_sum` int(11) NOT NULL DEFAULT '0',
  `order_time` time(6) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
