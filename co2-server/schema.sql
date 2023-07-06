CREATE DATABASE Co2_Center_DB;
USE Co2_Center_DB;

CREATE TABLE `adresses` (
    `adress_id` integer NOT NULL AUTO_INCREMENT,
    `unit_number` varchar(255) NOT NULL,
    `adress_line_1` varchar(255) NOT NULL,
    `adress_line_2` varchar(255),
    `city` varchar(255) NOT NULL,
    `region` varchar(255),
    `postal_code` varchar(255) NOT NULL,
    `country` varchar(255) NOT NULL,
    PRIMARY KEY (`adress_id`));

CREATE TABLE `centers` (
	`center_id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `peak_consumption` integer,
    `lattitude` FLOAT NOT NULL,
    `longitude` FLOAT NOT NULL,
    `outer_postcode` varchar(255),
    `adress_id` integer,
    PRIMARY KEY (`center_id`),
    FOREIGN KEY (`adress_id`) REFERENCES adresses(`adress_id`));


CREATE TABLE `users` (
	`user_id` integer NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`));



INSERT INTO `users` VALUES (1, 'admin', 'admin@admin.de', 'admin');

INSERT INTO adresses(`adress_id`, `unit_number`, `adress_line_1`, `city`, `region`, `postal_code`, `country`) 
VALUES (1, 18, 'Zinzendorfstr.', 'Berlin', 'Berlin', '10555', 'Germany');

INSERT INTO `centers` VALUES (1, 'Center 1', 100070, 52.5226, 13.3314, 'RG10', 1);

