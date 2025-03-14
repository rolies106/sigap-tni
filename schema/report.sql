CREATE TABLE `report` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `phone_number` varchar(20) DEFAULT NULL,
    `cmd` varchar(10) DEFAULT NULL,
    `content_type` varchar(10) DEFAULT NULL,
    `raw_request` varchar(255) DEFAULT NULL,
    `transcribe` text DEFAULT NULL,
    `device_type` varchar(10) DEFAULT NULL,
    `response` text DEFAULT NULL,
    `report_type` varchar(50) DEFAULT NULL,
    `report_location` varchar(255) DEFAULT NULL,
    `category` varchar(50) DEFAULT NULL,
    `severity` varchar(50) DEFAULT NULL,
    `status` varchar(50) DEFAULT NULL,    
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `device_type` (`device_type`),
    KEY `report_type` (`report_type`),
    KEY `category` (`category`),
    KEY `severity` (`severity`),
    KEY `status` (`status`)
) DEFAULT CHARSET=utf8;

