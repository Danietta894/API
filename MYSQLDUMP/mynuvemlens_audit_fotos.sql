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
-- Table structure for table `audit_fotos`
--

DROP TABLE IF EXISTS `audit_fotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_fotos` (
  `id_audit` int NOT NULL AUTO_INCREMENT,
  `operacao` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `foto_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `data_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `campo_antigo` text,
  `campo_novo` text,
  `usuario_who` varchar(50) NOT NULL,
  PRIMARY KEY (`id_audit`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_fotos`
--

LOCK TABLES `audit_fotos` WRITE;
/*!40000 ALTER TABLE `audit_fotos` DISABLE KEYS */;
INSERT INTO `audit_fotos` VALUES (1,'DELETE',37,28,'2025-06-04 00:44:59','tipo=Virgas.; descricao=Tipo de nuvem.',NULL,'root@localhost'),(2,'INSERT',38,28,'2025-06-04 01:29:49',NULL,'tipo=; descricao=....','root@localhost'),(3,'UPDATE',38,28,'2025-06-06 15:33:01','tipo=; descricao=....','tipo=; descricao=....','root@localhost'),(4,'UPDATE',39,32,'2025-06-06 15:33:03','tipo=; descricao=...','tipo=; descricao=...','root@localhost'),(5,'UPDATE',40,32,'2025-06-06 15:33:06','tipo=; descricao=,,,,','tipo=; descricao=,,,,','root@localhost'),(6,'UPDATE',41,32,'2025-06-06 15:33:09','tipo=; descricao=...','tipo=; descricao=...','root@localhost'),(7,'UPDATE',42,32,'2025-06-06 16:25:12','tipo=; descricao=Que tipo de nuvem é essa?','tipo=Cumulonimbus; descricao=Que tipo de nuvem é essa?','root@localhost'),(8,'UPDATE',43,30,'2025-06-06 17:26:50','tipo=; descricao=Linda nuvem!','tipo=Cirrus; descricao=Linda nuvem!','root@localhost'),(9,'UPDATE',44,28,'2025-06-06 23:15:19','tipo=; descricao=Q','tipo=Cirrus; descricao=Q','root@localhost'),(10,'UPDATE',45,28,'2025-06-06 23:15:27','tipo=; descricao=.','tipo=Stratus; descricao=.','root@localhost'),(11,'UPDATE',46,28,'2025-06-06 23:15:41','tipo=; descricao=.','tipo=Cumulus; descricao=.','root@localhost'),(12,'UPDATE',47,32,'2025-06-08 02:29:46','tipo=; descricao=.','tipo=Altostratus; descricao=.','root@localhost');
/*!40000 ALTER TABLE `audit_fotos` ENABLE KEYS */;
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
