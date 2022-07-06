CREATE TABLE sq_roles(
    id int PRIMARY KEY IDENTITY,
    descripcion varchar(50)

)

CREATE TABLE sq_users(
    id int PRIMARY KEY IDENTITY,
    email varchar(50),
    password varchar(50),
    role_id int FOREIGN key references sq_roles(id),
    fecha_creacion datetime default  GETDATE(),
    fecha_ultima_modificacion datetime,
)

CREATE TAble sq_estado(
    id int PRIMARY KEY IDENTITY,
    descripcion varchar(50),

);
INSERT INTO sq_estado(descripcion) values ('pendiente')
INSERT INTO sq_estado(descripcion) values ('cerrada')

CREATE TABLE sq_ventas_boleta_cabecera(
    id int PRIMARY KEY IDENTITY,
    id_local int,
    nro_caja int,
    tipo_doc int,
    nro_boleta int,
    id_vendedor int,
    fecha_caja datetime,
    electronica smallint,
    traspasado smallint,
    total int,
    efectivo int,
    cheque int,
    venta_nula int,
    cigarros int,
    depositos int,
    estado int foreign key references sq_estado(id),
    fecha_creacion datetime default  GETDATE(),
    fecha_ultima_modificacion datetime,
    --FOREIGN KEY (id_local, nro_caja,tipo_doc, nro_boleta, id_vendedor,fecha_caja, electronica, traspasado) references ventas_boleta_cabecera(id_local, nro_caja, tipo_doc, nro_boleta, id_vendedor, fecha, electronica, traspasado)

);

CREATE TABLE sq_sodexo(
    id int PRIMARY KEY IDENTITY,
    monto int,
    id_cliente int,
)

CREATE TABLE sq_deposito(
    id int PRIMARY KEY IDENTITY,
    monto int,
    id_cliente int,
    fecha_creacion datetime default  GETDATE(),
    fecha_deposito datetime,
    banco int,
)
CREATE TABLE sq_bancos(
    id int PRIMARY KEY IDENTITY,
        descripcion varchar(50),
)