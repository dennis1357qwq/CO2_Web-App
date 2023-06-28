CREATE DATABASE Co2_Center_DB;
USE Co2_Center_DB;

CREATE TABLE `centers` (
	`center_id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `location` varchar(255),
    `peak_consumption` integer,
    `user_id` integer NOT NULL,
    PRIMARY KEY (`center_id`));

    INSERT INTO `centers` VALUES (1, 'Center 1', 'east', 100070);
    INSERT INTO `centers` VALUES (2, 'Center 2', 'north', 110030);
    INSERT INTO `centers` VALUES (3, 'Center 3', 'west', 120050);


CREATE TABLE `user` (
	`user_id` integer NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`));

    INSERT INTO `user` VALUES (1, 'admin', 'admin@admin.de', 'admin');
