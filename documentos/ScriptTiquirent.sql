drop database tiquirent;

CREATE DATABASE tiquirent;
USE tiquirent;

-- Tabla de roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Tabla de estados
CREATE TABLE estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estados_reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de tipos de identificación
CREATE TABLE tipos_identificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(255) NOT NULL UNIQUE,  
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,  
    contrasena_temp VARCHAR(255),  
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_id INT,
    ruta_imagen VARCHAR(255),
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    FOREIGN KEY (estado_id) REFERENCES estados(id)
);
-- Tabla de vehículos
CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    año INT NOT NULL,
    tipo VARCHAR(50),
    placa VARCHAR(20) NOT NULL UNIQUE,
    color VARCHAR(30),
    ruta_imagen VARCHAR(255),
    precio_diario DECIMAL(10, 2),
    transmision VARCHAR(50),
    traccion VARCHAR(50),
    puertas INT,
    numero_asientos INT,
    estado_id INT,
    FOREIGN KEY (estado_id) REFERENCES estados(id)
);

-- Tabla de reservaciones
CREATE TABLE reservaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_reserva VARCHAR(50) NOT NULL UNIQUE,
    codigo_qr TEXT,
    nombre VARCHAR(100) NOT NULL,  
    nacionalidad VARCHAR(50) NOT NULL,  
    tipo_id INT NOT NULL,  
    numero_identificacion VARCHAR(50) NOT NULL UNIQUE,  
    email VARCHAR(100) NOT NULL UNIQUE,  
    telefono VARCHAR(20) NOT NULL,  
    numero_licencia VARCHAR(50) NOT NULL UNIQUE,  
    ubicacion_recogida VARCHAR(100) NOT NULL,  
    ubicacion_entrega VARCHAR(100) NOT NULL,  
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_estado_reserva INT NOT NULL,
    id_aprobador INT,
    id_vehiculo INT NOT NULL,  
    FOREIGN KEY (tipo_id) REFERENCES tipos_identificacion(id),
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id),
    FOREIGN KEY (id_estado_reserva) REFERENCES estados_reserva(id),
    FOREIGN KEY (id_aprobador) REFERENCES usuarios(id)
);