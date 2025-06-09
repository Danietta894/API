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
-- Table structure for table `audit_log_geral`
--

DROP TABLE IF EXISTS `audit_log_geral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log_geral` (
  `id_audit` int NOT NULL AUTO_INCREMENT,
  `tabela_nome` varchar(100) NOT NULL,
  `operacao` varchar(10) NOT NULL,
  `data_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pk_valor` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_audit`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log_geral`
--

LOCK TABLES `audit_log_geral` WRITE;
/*!40000 ALTER TABLE `audit_log_geral` DISABLE KEYS */;
INSERT INTO `audit_log_geral` VALUES (1,'usuarios','INSERT','2025-06-08 02:47:32','35','root@localhost'),(2,'usuarios','INSERT','2025-06-08 02:52:40','36','root@localhost'),(3,'usuarios','DELETE','2025-06-08 02:57:11','36','root@localhost'),(4,'usuarios','INSERT','2025-06-08 21:49:51','37','root@localhost'),(5,'usuarios','INSERT','2025-06-08 21:51:14','38','root@localhost'),(6,'usuarios','INSERT','2025-06-08 21:54:34','40','root@localhost'),(7,'usuarios','DELETE','2025-06-08 21:55:22','40','root@localhost'),(8,'usuarios','DELETE','2025-06-08 21:56:21','38','root@localhost'),(9,'usuarios','INSERT','2025-06-08 21:58:08','41','root@localhost'),(10,'usuarios','DELETE','2025-06-08 21:59:24','41','root@localhost');
/*!40000 ALTER TABLE `audit_log_geral` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09  0:14:52
