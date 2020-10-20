create database if not exists bws;

use bws;

create table if not exists brokers (
	id int not null primary key auto_increment,
	name varchar(50) not null,
	address_line1 varchar(50),
	address_line2 varchar(50),
	city varchar(50),
	contact_number varchar(50)
	/* primary key(`id`, `name`) */
);

create table if not exists sales_summary (
	sales_id int not null primary key auto_increment,
	broker_id int not null,	
	bill_num varchar(20) not null,
	bill_dt datetime not null,
	bill_qty decimal(9,3) not null,
	bill_amt decimal(12,2) not null,
	foreign key (`broker_id`) references `brokers`(`id`)
);

create table if not exists config (
	id int not null primary key auto_increment,
	config_fld varchar(10) not null,
	from_amt decimal(12,2) not null,
	to_amt decimal(12,2) not null,
	config_pct decimal(5,2) not null
);

create table if not exists calc (
	id int not null primary key auto_increment,
	calc_fld varchar(10) not null,
	calc_dt date not null,
	broker_id int not null,
	calc_amt decimal(12,2) not null,
	foreign key (broker_id) references brokers(id)
);

create table if not exists payment (
	id int not null primary key auto_increment,
	pymt_fld varchar(10) not null,
	pymt_dt date not null,
	broker_id int not null,
	pymt_amt decimal(12,2) not null,
	foreign key (broker_id) references brokers(id)
);
