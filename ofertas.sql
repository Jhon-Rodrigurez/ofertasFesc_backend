DROP DATABASE IF EXISTS ofertas;
CREATE DATABASE ofertas;

USE ofertas;

CREATE TABLE `rol` (
    `idRol` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
    `nombre`varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `area` (
    `idArea` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
    `nombre`varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `usuario` (
    `id` bigint(20) NOT NULL,
    `idUsuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `celular` varchar(50) COLLATE utf8mb4_unicode_ci,
    `descripcionExperiencia` varchar(500) COLLATE utf8mb4_unicode_ci,
    `urlLinkedin` varchar(50) COLLATE utf8mb4_unicode_ci,
    `urlCv` BLOB,
    `passwordEncriptada` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `idArea` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
    `idRol` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `oferta` (
    `id` bigint(20) NOT NULL,
    `idOferta` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `titulo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `descripcion` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `idArea` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
    `idUsuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `fechaExpiracion` date COLLATE utf8mb4_unicode_ci NOT NULL,
    `ciudad` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `pais` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `descripcionExperiencia` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `tiempoExperiencia` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
    `creado` datetime COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `respuesta` (
    `id` bigint(20) NOT NULL,
    `idRespuesta` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `idOferta` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `idUsuario` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `experienciaDescripcion` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `experienciaTiempo` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `fechaAplicado` datetime COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `rol`
    ADD PRIMARY KEY (`idRol`);

ALTER TABLE `area`
    ADD PRIMARY KEY (`idArea`);

ALTER TABLE `usuario`
    ADD PRIMARY KEY (`idUsuario`),
    ADD KEY `id` (`id`);

ALTER TABLE `oferta`
    ADD PRIMARY KEY (`idOferta`),
    ADD KEY `id` (`id`);

ALTER TABLE `respuesta`
    ADD PRIMARY KEY (`idRespuesta`),
    ADD KEY `id` (`id`);

ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `oferta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `respuesta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `usuario`
    ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idArea`) REFERENCES `area` (`idArea`),
    ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);

ALTER TABLE `oferta`
    ADD CONSTRAINT `oferta_ibfk_2` FOREIGN KEY (`idArea`) REFERENCES `area` (`idArea`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `oferta_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `respuesta`
    ADD CONSTRAINT `respuesta_ibfk_2` FOREIGN KEY (`idOferta`) REFERENCES `oferta` (`idOferta`) ON DELETE CASCADE,
    ADD CONSTRAINT `respuesta_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);