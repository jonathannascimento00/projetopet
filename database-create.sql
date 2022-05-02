create database bancoPet;

use bancoPet;

create table Dono(
	id_dono int primary key auto_increment,
	cpf varchar(11) unique not null,
	nome varchar(100) not null,
	telefone varchar(11) not null
);

create table Especie(
	id_especie int primary key auto_increment,
	nome_especie varchar(50) not null
);

insert into Especie(nome_especie) values
('Cachorro'),
('Gato');

create table Raca(
	id_raca int primary key auto_increment,
	nome_raca varchar(50) unique not null,
	fk_id_especie int not null,
	constraint foreign key(fk_id_especie) references Especie(id_especie)
    on update cascade
	on delete cascade
);

create table Animal(
	id_animal int primary key auto_increment,
	nome_animal varchar(50) not null,
	idade_animal int not null,
	fk_id_raca int not null,
	fk_id_dono int not null,	
	constraint foreign key(fk_id_raca) references Raca(id_raca)
    on delete cascade
    on update cascade,
	constraint foreign key(fk_id_dono) references Dono(id_dono)
	on delete cascade
    on update cascade
);

