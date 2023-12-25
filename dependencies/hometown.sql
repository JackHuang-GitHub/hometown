/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : localhost:3306
 Source Schema         : hometown

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 23/12/2023 20:53:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `message_text` text NOT NULL,
  `message_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of messages
-- ----------------------------
BEGIN;
INSERT INTO `messages` (`id`, `user_name`, `message_text`, `message_time`) VALUES (7, 'r', '1', '2023-12-23 20:31:18');
INSERT INTO `messages` (`id`, `user_name`, `message_text`, `message_time`) VALUES (8, 'r', '2', '2023-12-23 20:32:32');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
