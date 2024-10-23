CREATE TABLE Clasificacion (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

create table Producto (
id bigint unsigned auto_increment primary KEY,
nombre varchar(100) not null,
descripcion text,
precio decimal(10, 2) not null,
imagen varchar(255),
clasificacion_id bigint unsigned
);

alter table Producto add constraint fk_clasificacion foreign key (clasificacion_id) references Clasificacion(id) on delete cascade;

SELECT * FROM tienda_mascotas.producto;
insert into tienda_mascotas.clasificacion (nombre) values('perros'), ('gatos');
insert into tienda_mascotas.producto (nombre, descripcion, precio, imagen, clasificacion_id) values ('comida para perros', 'comida premium para perros', 25.99, 'png-perro.jpn', 1),('comida para perros', 'comida premium para perros', 25.99, 'png-perro.jpn', 2);

