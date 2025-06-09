CREATE DATABASE  IF NOT EXISTS `mynuvemlens` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mynuvemlens`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mynuvemlens
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `validacao`
--

DROP TABLE IF EXISTS `validacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `validacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `foto_id` int NOT NULL,
  `status` enum('pendente','aprovada','recusada') NOT NULL,
  `observacao` text,
  `data_validacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `moderador_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foto_id` (`foto_id`),
  CONSTRAINT `validacao_ibfk_1` FOREIGN KEY (`foto_id`) REFERENCES `fotos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `validacao`
--

LOCK TABLES `validacao` WRITE;
/*!40000 ALTER TABLE `validacao` DISABLE KEYS */;
INSERT INTO `validacao` VALUES (27,42,'aprovada',NULL,'2025-06-06 16:24:41',NULL),(28,43,'aprovada',NULL,'2025-06-06 17:26:37',NULL),(29,44,'aprovada',NULL,'2025-06-06 22:18:46',NULL),(30,45,'aprovada',NULL,'2025-06-06 22:19:10',NULL),(31,46,'aprovada',NULL,'2025-06-06 23:14:41',NULL),(32,47,'aprovada',NULL,'2025-06-07 18:13:44',NULL);
/*!40000 ALTER TABLE `validacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09  0:14:53
