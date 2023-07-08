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
VALUES (1, 18, 'Zinzendorfstr.', 'Berlin', 'Berlin', '10555', 'Germany');

INSERT INTO `centers` VALUES (1, 'Center 1', 100070, 52.5226, 13.3314, 'RG10', 1, 1);

INSERT INTO `scenario` VALUES (1, 1);

INSERT INTO `center_scenario` VALUES(1, 1); 