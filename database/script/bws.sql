create database if not exists bws;

use bws;

create table if not exists brokers (
	Id int not null primary key auto_increment,
	BrokerName varchar(50) not null,
	AddressLine1 varchar(50),
	AddressLine2 varchar(50),
	City varchar(50),
	ContactNumber varchar(50)
	/* primary key(`id`, `name`) */
);

create table if not exists sales_summary (
	Id int not null primary key auto_increment,
	BrokerId int not null,	
	BillNumber varchar(20) not null,
	BillDate datetime not null,
	BillQuantity decimal(9,3) not null,
	BillAmount decimal(12,2) not null,
	foreign key (`BrokerId`) references `brokers`(`Id`)
);

create table if not exists config (
	Id int not null primary key auto_increment,
	ConfigField varchar(10) not null,
	FromAmount decimal(12,2) not null,
	ToAmount decimal(12,2) not null,
	ConfigPercentage decimal(5,2) not null
);

create table if not exists calc (
	Id int not null primary key auto_increment,
	CalcField varchar(10) not null,
	CalcDate date not null,
	BrokerId int not null,
	CalcAmount decimal(12,2) not null,
	TotalSales decimal(12,2),
	CalcPercenrage decimal(12,2),
	Changed bit(1),
	foreign key (BrokerId) references brokers(Id)
);

create table if not exists payment (
	Id int not null primary key auto_increment,
	PaymentField varchar(10) not null,
	PaymentDate date not null,
	BrokerId int not null,
	PaymentAmount decimal(12,2) not null,
	foreign key (BrokerId) references brokers(Id)
);
