create database tiquirent;
use tiquirent;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(255) NOT NULL UNIQUE,  
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,  
    contrasena_temp VARCHAR(255),  
    rol_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    ruta_imagen VARCHAR(255),  
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    año INT NOT NULL,
    tipo VARCHAR(50),
    placa VARCHAR(20) NOT NULL UNIQUE,
    color VARCHAR(30),
    kilometraje DECIMAL(10, 2),
    precio_diario DECIMAL(10, 2),
    tranmision VARCHAR(50),
    traccion VARCHAR(50),
    puertas INT,
    numero_asientos INT,
    estado ENUM('disponible', 'alquilado', 'mantenimiento') DEFAULT 'disponible'
);

CREATE TABLE reservaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_reserva VARCHAR(50) NOT NULL UNIQUE, 
    codigo_qr TEXT,  
    nombre VARCHAR(100) NOT NULL,  
    nacionalidad VARCHAR(50) NOT NULL,  
    tipo_id ENUM('Cédula', 'Pasaporte') NOT NULL,
    numero_identificacion VARCHAR(50) NOT NULL UNIQUE,  
    email VARCHAR(100) NOT NULL UNIQUE,  
    telefono VARCHAR(20) NOT NULL,  
    numero_licencia VARCHAR(50) NOT NULL UNIQUE,  
    ubicacion_recogida VARCHAR(100) NOT NULL,  
    ubicacion_entrega VARCHAR(100) NOT NULL,  
    fecha_inicio DATE NOT NULL, 
    fecha_fin DATE NOT NULL, 
    id_vehiculo INT NOT NULL,  
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id)  
);


