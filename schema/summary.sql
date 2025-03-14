CREATE TABLE `summary` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `phone_number` varchar(20) DEFAULT NULL,
    `cmd` varchar(10) DEFAULT NULL,
    `raw_request` text DEFAULT NULL,
    `content_type` varchar(10) DEFAULT NULL,
    `device_type` varchar(10) DEFAULT NULL,
    `key_points` text DEFAULT NULL,
    `action_plan` text DEFAULT NULL,
    `status` varchar(50) DEFAULT NULL,    
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `device_type` (`device_type`),
    KEY `status` (`status`)
) DEFAULT CHARSET=utf8;

