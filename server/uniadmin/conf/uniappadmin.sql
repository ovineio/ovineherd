
-- ----------------------------
-- Table structure for attributes
-- ----------------------------
DROP TABLE IF EXISTS `attributes`;
CREATE TABLE `attributes` (
  `id` bigint(20) unsigned NOT NULL,
  `source_id` bigint(20) unsigned NOT NULL COMMENT '目标id',
  `type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '自定义字段',
  `language` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'zh-CN' COMMENT '语言',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字段名备注',
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '字段',
  `format` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '数据类型',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_name_source_id` (`type`,`name`,`source_id`) USING BTREE COMMENT 'source_id_key_language'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for authorizations
-- ----------------------------
DROP TABLE IF EXISTS `authorizations`;
CREATE TABLE `authorizations` (
  `id` bigint(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `resource` varchar(255) DEFAULT NULL COMMENT '资源',
  `entity` varchar(255) DEFAULT NULL COMMENT '实体',
  `operation` varchar(255) DEFAULT NULL COMMENT '操作权限',
  `relation1` varchar(255) NOT NULL DEFAULT '',
  `relation2` varchar(255) NOT NULL DEFAULT '',
  `relation3` varchar(255) NOT NULL DEFAULT '',
  `relation4` varchar(255) NOT NULL DEFAULT '',
  `relation5` varchar(255) NOT NULL DEFAULT '',
  `relation6` varchar(255) NOT NULL DEFAULT '',
  `relation1_type` varchar(64) NOT NULL DEFAULT '',
  `relation2_type` varchar(64) NOT NULL DEFAULT '',
  `relation3_type` varchar(64) NOT NULL DEFAULT '',
  `relation4_type` varchar(64) NOT NULL DEFAULT '',
  `relation5_type` varchar(64) NOT NULL DEFAULT '',
  `relation6_type` varchar(64) NOT NULL DEFAULT '',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL COMMENT 'id',
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父ID',
  `level` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '层级',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relation1` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `relation2` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `relation3` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `relation4` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `relation5` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `relation6` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  `relation1_type` varchar(64) NOT NULL DEFAULT '',
  `relation2_type` varchar(64) NOT NULL DEFAULT '',
  `relation3_type` varchar(64) NOT NULL DEFAULT '',
  `relation4_type` varchar(64) NOT NULL DEFAULT '',
  `relation5_type` varchar(64) NOT NULL DEFAULT '',
  `relation6_type` varchar(64) NOT NULL DEFAULT '',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_parent_id_index` (`parent_id`),
  KEY `categories_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for configurations
-- ----------------------------
DROP TABLE IF EXISTS `configurations`;
CREATE TABLE `configurations` (
  `id` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `relation1` varchar(255) NOT NULL DEFAULT '',
  `relation2` varchar(255) NOT NULL DEFAULT '',
  `relation3` varchar(255) NOT NULL DEFAULT '',
  `relation4` varchar(255) NOT NULL DEFAULT '',
  `relation5` varchar(255) NOT NULL DEFAULT '',
  `relation6` varchar(255) NOT NULL DEFAULT '',
  `relation1_type` varchar(64) NOT NULL DEFAULT '',
  `relation2_type` varchar(64) NOT NULL DEFAULT '',
  `relation3_type` varchar(64) NOT NULL DEFAULT '',
  `relation4_type` varchar(64) NOT NULL DEFAULT '',
  `relation5_type` varchar(64) NOT NULL DEFAULT '',
  `relation6_type` varchar(64) NOT NULL DEFAULT '',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` bigint(20) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `relation1` varchar(255) NOT NULL DEFAULT '',
  `relation2` varchar(255) NOT NULL DEFAULT '',
  `relation3` varchar(255) NOT NULL DEFAULT '',
  `relation4` varchar(255) NOT NULL DEFAULT '',
  `relation5` varchar(255) NOT NULL DEFAULT '',
  `relation6` varchar(255) NOT NULL DEFAULT '',
  `relation1_type` varchar(64) NOT NULL DEFAULT '',
  `relation2_type` varchar(64) NOT NULL DEFAULT '',
  `relation3_type` varchar(64) NOT NULL DEFAULT '',
  `relation4_type` varchar(64) NOT NULL DEFAULT '',
  `relation5_type` varchar(64) NOT NULL DEFAULT '',
  `relation6_type` varchar(64) NOT NULL DEFAULT '',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for relations
-- ----------------------------
DROP TABLE IF EXISTS `relations`;
CREATE TABLE `relations` (
  `id` bigint(20) DEFAULT NULL,
  `type` varchar(64) DEFAULT NULL,
  `source_id` bigint(20) DEFAULT NULL COMMENT '如产品id ',
  `target_id` bigint(20) DEFAULT NULL COMMENT '如分类id',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `type_source_id_target_id` (`type`,`source_id`,`target_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for specifications
-- ----------------------------
DROP TABLE IF EXISTS `specifications`;
CREATE TABLE `specifications` (
  `id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL COMMENT '商品id',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `relation1` varchar(255) NOT NULL DEFAULT '',
  `relation2` varchar(255) NOT NULL DEFAULT '',
  `relation3` varchar(255) NOT NULL DEFAULT '',
  `relation4` varchar(255) NOT NULL DEFAULT '',
  `relation5` varchar(255) NOT NULL DEFAULT '',
  `relation6` varchar(255) NOT NULL DEFAULT '',
  `relation1_type` varchar(64) NOT NULL DEFAULT '',
  `relation2_type` varchar(64) NOT NULL DEFAULT '',
  `relation3_type` varchar(64) NOT NULL DEFAULT '',
  `relation4_type` varchar(64) NOT NULL DEFAULT '',
  `relation5_type` varchar(64) NOT NULL DEFAULT '',
  `relation6_type` varchar(64) NOT NULL DEFAULT '',
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ----------------------------
-- Insert Init Data
-- ----------------------------

INSERT INTO users
( username, password, type) VALUES
( "rootadmin", "admin123", "ovine_system_user");


INSERT INTO configurations
( type) VALUES
( "ovine_system");