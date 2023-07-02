CREATE DATABASE Co2_Center_DB;
USE Co2_Center_DB;

CREATE TABLE `user` (
	`user_id` integer NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`));

CREATE TABLE `centers` (
	`center_id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `location` varchar(255),
    `peak_consumption` integer,
    `user_id` integer NOT NULL,
    PRIMARY KEY (`center_id`),
    FOREIGN KEy (user_id) REFERENCES user(user_id)
    );

CREATE TABLE `scenario` (
    `scenario_id` integer NOT NULL AUTO_INCREMENT,
    `user_id` integer NOT NULL,
    PRIMARY KEY (`scenario_id`),
    FOREIGN KEY (user_id) REFERENCES user(`user_id`)
    );
    
CREATE TABLE `includes` (
	`scenario_id` integer NOT NULL,
    `center_id` integer NOT NULL,
    FOREIGN KEY (`scenario_id`) REFERENCES scenario(scenario_id),
    FOREIGN KEY (`center_id`) REFERENCES centers(center_id),
    CONSTRAINT `pk_scen` PRIMARY KEY (`scenario_id`, `center_id`)
);

INSERT INTO `user` VALUES (1, 'admin', 'admin@admin.de', 'admin');

INSERT INTO `centers` VALUES (1, 'Center 1', 'east', 100070, 1);
INSERT INTO `centers` VALUES (2, 'Center 2', 'north', 110030, 1);
INSERT INTO `centers` VALUES (3, 'Center 3', 'west', 120050, 1);
INSERT INTO `centers` VALUES (4, "HEWO", "G41", 12, 1);

INSERT INTO `scenario` VALUES (1, 1);

INSERT INTO `includes` VALUES(1, 1); 
INSERT INTO `includes` VALUES(1, 2);
