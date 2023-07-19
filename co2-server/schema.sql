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
    
    CREATE TABLE `user` (
	`user_id` integer NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`));

CREATE TABLE `centers` (
	`center_id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `peak_consumption` integer,
    `lattitude` FLOAT NOT NULL,
    `longitude` FLOAT NOT NULL,
    `outer_postcode` varchar(255),
    `adress_id` integer,
    `user_id` integer NOT NULL,
    PRIMARY KEY (`center_id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`user_id`),
    FOREIGN KEY (`adress_id`) REFERENCES adresses(`adress_id`));


CREATE TABLE `scenario` (
    `scenario_id` integer NOT NULL AUTO_INCREMENT,
    `user_id` integer NOT NULL,
    PRIMARY KEY (`scenario_id`),
    FOREIGN KEY (user_id) REFERENCES user(`user_id`)
    );
    
CREATE TABLE `center_scenario` (
	`scenario_id` integer NOT NULL,
    `center_id` integer NOT NULL,
    FOREIGN KEY (`scenario_id`) REFERENCES scenario(scenario_id),
    FOREIGN KEY (`center_id`) REFERENCES centers(center_id),
    CONSTRAINT `pk_scen` PRIMARY KEY (`scenario_id`, `center_id`)
);

INSERT INTO `user` VALUES (1, 'admin', 'admin@admin.de', 'admin');

INSERT INTO adresses(`adress_id`, `unit_number`, `adress_line_1`, `city`, `region`, `postal_code`, `country`) 
VALUES (1, 77, 'Kingswell Terrace', 'Perth', 'Scotland', 'M16 7AL', 'United Kingdom');

INSERT INTO adresses(`adress_id`, `unit_number`, `adress_line_1`, `city`, `region`, `postal_code`, `country`) 
VALUES (2, 14, 'Penlan St', 'Pwllheli', 'Wales', 'LL53 5DE', 'United Kingdom');

INSERT INTO `centers` VALUES (1, 'Perth Center', 100070, 56.4011, -3.45818, 'PH1', 1, 1);

INSERT INTO `centers` VALUES (1, 'Penlan Center', 100071, 52.8889, -4.41725, 'LL53', 2, 1);


