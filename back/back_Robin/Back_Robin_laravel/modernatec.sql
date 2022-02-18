-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-02-2022 a las 20:33:27
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `modernatec`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo_cita` bigint(20) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `correo_solicitante` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo_invitado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_identificacion` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `codigo` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `numero_identificacion` bigint(20) UNSIGNED DEFAULT NULL,
  `tipo_codigo` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `id_contrato` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_02_17_190515_create_areas_table', 1),
(6, '2022_02_17_190544_create_contratos_table', 1),
(7, '2022_02_17_190618_create_tipo_contratos_table', 1),
(8, '2022_02_17_190640_create_codigos_table', 1),
(9, '2022_02_17_190658_create_tipo_codigos_table', 1),
(10, '2022_02_17_190717_create_registros_table', 1),
(11, '2022_02_17_190733_create_citas_table', 1),
(12, '2022_02_17_200821_add_areas_to_users', 1),
(13, '2022_02_17_212150_add_id_contrato_to_contratos_table', 1),
(14, '2022_02_18_182218_create_rols_table', 1),
(15, '2022_02_18_182723_add_rol_to_users_table', 1),
(16, '2022_02_18_190102_add_tipo_codigo_to_codigos_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `hora_ingreso` time NOT NULL,
  `hora_salida` time NOT NULL,
  `numero_identificacion` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_codigos`
--

CREATE TABLE `tipo_codigos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_codigo` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_contratos`
--

CREATE TABLE `tipo_contratos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre_contrato` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `numero_identificacion` bigint(20) UNSIGNED NOT NULL,
  `nombres` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `url_imagen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_area` bigint(20) UNSIGNED DEFAULT NULL,
  `id_contrato` bigint(20) UNSIGNED DEFAULT NULL,
  `rol` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `citas_numero_identificacion_foreign` (`numero_identificacion`);

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigos_codigo_unique` (`codigo`),
  ADD KEY `codigos_numero_identificacion_foreign` (`numero_identificacion`),
  ADD KEY `codigos_tipo_codigo_foreign` (`tipo_codigo`);

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contratos_id_contrato_foreign` (`id_contrato`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registros_numero_identificacion_foreign` (`numero_identificacion`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_codigos`
--
ALTER TABLE `tipo_codigos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_contratos`
--
ALTER TABLE `tipo_contratos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_numero_identificacion_unique` (`numero_identificacion`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_id_area_foreign` (`id_area`),
  ADD KEY `users_id_contrato_foreign` (`id_contrato`),
  ADD KEY `users_rol_foreign` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_codigos`
--
ALTER TABLE `tipo_codigos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_contratos`
--
ALTER TABLE `tipo_contratos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_numero_identificacion_foreign` FOREIGN KEY (`numero_identificacion`) REFERENCES `users` (`numero_identificacion`) ON DELETE SET NULL;

--
-- Filtros para la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD CONSTRAINT `codigos_numero_identificacion_foreign` FOREIGN KEY (`numero_identificacion`) REFERENCES `users` (`numero_identificacion`) ON DELETE SET NULL,
  ADD CONSTRAINT `codigos_tipo_codigo_foreign` FOREIGN KEY (`tipo_codigo`) REFERENCES `tipo_codigos` (`id`);

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_id_contrato_foreign` FOREIGN KEY (`id_contrato`) REFERENCES `tipo_contratos` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `registros`
--
ALTER TABLE `registros`
  ADD CONSTRAINT `registros_numero_identificacion_foreign` FOREIGN KEY (`numero_identificacion`) REFERENCES `users` (`numero_identificacion`) ON DELETE SET NULL;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_area_foreign` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_id_contrato_foreign` FOREIGN KEY (`id_contrato`) REFERENCES `contratos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_rol_foreign` FOREIGN KEY (`rol`) REFERENCES `rols` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
