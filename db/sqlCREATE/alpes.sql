CREATE TABLE sqb_roles(
    id int PRIMARY KEY IDENTITY,
    descripcion varchar(50)
)

insert into sqb_roles (descripcion) values ('Administrador')
insert into sqb_roles (descripcion) values ('Cuadratura sin deposito')
insert into sqb_roles (descripcion) values ('Cuadratura con deposito')
insert into sqb_roles (descripcion) values ('Cuadratura en Central')

CREATE TABLE sqb_users(
    id int PRIMARY KEY IDENTITY,
    email varchar(50),
    password varchar(50),
    role_id int FOREIGN key references sqb_roles(id),
    fecha_creacion date default  GETDATE(),
)

insert into sqb_users(email, password, role_id) values ('jck.sender@gmail.com', 'test',1)
insert into sqb_users(email, password, role_id) values ('test@test.cl', 'test',1)


CREATE TAble sqb_estado(
    id int PRIMARY KEY IDENTITY,
    descripcion varchar(50),

);

CREATE TABLE sqb_empresa(
    id int PRIMARY KEY IDENTITY,
    descripcion varchar(50),
)

INSERT INTO sqb_estado(descripcion) values ('en curso')
INSERT INTO sqb_estado(descripcion) values ('cerrada')
INSERT INTO sqb_empresa(descripcion) values ('Sypra')
INSERT INTO sqb_empresa(descripcion) values ('La estrella')

CREATE TABLE sqb_cuadre(
    local_id int   ,
    numero_caja int   ,
    vendedor_id int   ,
    fecha_caja date   ,
    empresa int foreign key references sqb_empresa(id),
    total int,
    efectivo_cuadre int,
    efectivo_real int,
    cigarros_cuadre int,
    cigarros_real int,
    debito_cuadre int,
    debito_real int,
    credito_cuadre int,
    credito_real int,
    estado int foreign key references sqb_estado(id),
    primary key (local_id, numero_caja, vendedor_id,fecha_caja)
);

CREATE TABLE sqb_bancos(
    id int PRIMARY KEY IDENTITY,
    descripcion varchar(50),
);

CREATE TABLE sqb_deposito(
    id int PRIMARY KEY IDENTITY,
    monto int,
    id_cliente int,
    fecha_creacion date default  GETDATE(),
    fecha_deposito date,
    banco int foreign  key references sqb_bancos(id),
    local_id int null ,
    numero_caja int null ,
    vendedor_id int null ,
    fecha_caja date null ,
    foreign key (local_id, numero_caja, vendedor_id, fecha_caja) references sqb_cuadre(local_id, numero_caja, vendedor_id, fecha_caja)
);

CREATE TABLE sqb_sodexo(
    id int PRIMARY KEY IDENTITY,
    cantidad int,
    monto int,
    cliente_id int,
    local_id int ,
    numero_caja int ,
    vendedor_id int,
    fecha_caja date,
    foreign key (vendedor_id, local_id, numero_caja, fecha_caja) references sqb_cuadre(vendedor_id, local_id, numero_caja, fecha_caja)
);

