CREATE DATABASE IF NOT EXISTS food_project CHARACTER SET utf8 COLLATE utf8_general_ci;

USE food_project;

CREATE TABLE restaurants (
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    restaurant varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    img varchar(255),
    price MEDIUMINT NOT NULL,
    CONSTRAINT restaurant_product_unique UNIQUE (restaurant, name)
);