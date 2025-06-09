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
-- Table structure for table `audit_comentarios`
--

DROP TABLE IF EXISTS `audit_comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_comentarios` (
  `id_audit` int NOT NULL AUTO_INCREMENT,
  `operacao` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `comentario_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `data_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `texto_antigo` text,
  `texto_novo` text,
  `usuario_who` varchar(50) NOT NULL,
  PRIMARY KEY (`id_audit`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_comentarios`
--

LOCK TABLES `audit_comentarios` WRITE;
/*!40000 ALTER TABLE `audit_comentarios` DISABLE KEYS */;
INSERT INTO `audit_comentarios` VALUES (1,'INSERT',43,28,'2025-06-04 00:34:14',NULL,'Este é um comentário de teste','root@localhost'),(2,'INSERT',44,28,'2025-06-04 00:37:42',NULL,'Comentário original','root@localhost'),(3,'UPDATE',44,28,'2025-06-04 00:38:23','Comentário original','Comentário editado','root@localhost'),(4,'INSERT',57,28,'2025-06-04 01:38:15',NULL,'Teste de auditoria INSERT','root@localhost'),(5,'UPDATE',57,28,'2025-06-04 01:40:16','Teste de auditoria INSERT','Teste de auditoria UPDATE','root@localhost'),(6,'DELETE',57,28,'2025-06-04 01:40:56','Teste de auditoria UPDATE',NULL,'root@localhost'),(7,'INSERT',58,28,'2025-06-04 01:41:14',NULL,'....','root@localhost'),(8,'INSERT',59,28,'2025-06-04 01:44:30',NULL,'Esse comentário. ','root@localhost'),(9,'UPDATE',59,28,'2025-06-04 01:48:01','Esse comentário. ','Esse comentário.... ','root@localhost'),(10,'DELETE',59,28,'2025-06-04 01:48:24','Esse comentário.... ',NULL,'root@localhost'),(11,'INSERT',60,32,'2025-06-04 13:31:52',NULL,'comentário.','root@localhost'),(12,'UPDATE',60,32,'2025-06-04 13:32:33','comentário.','comentários.','root@localhost'),(13,'DELETE',60,32,'2025-06-04 13:32:43','comentários.',NULL,'root@localhost'),(14,'INSERT',61,32,'2025-06-07 18:15:02',NULL,'Essa cumulonimbus é muito bonita.','root@localhost'),(15,'DELETE',61,32,'2025-06-07 20:54:40','Essa cumulonimbus é muito bonita.',NULL,'root@localhost'),(16,'INSERT',62,32,'2025-06-07 20:54:55',NULL,'Linda nuvem!','root@localhost'),(17,'UPDATE',62,32,'2025-06-07 20:55:35','Linda nuvem!','Linda nuvem!!!','root@localhost'),(18,'DELETE',62,32,'2025-06-07 20:56:15','Linda nuvem!!!',NULL,'root@localhost'),(19,'INSERT',63,32,'2025-06-08 02:27:24',NULL,'Linda cumulonimbus.','root@localhost'),(20,'UPDATE',63,32,'2025-06-08 02:28:33','Linda cumulonimbus.','Linda cumulonimbus.. É uma incus?','root@localhost'),(21,'DELETE',63,32,'2025-06-08 02:28:49','Linda cumulonimbus.. É uma incus?',NULL,'root@localhost');
/*!40000 ALTER TABLE `audit_comentarios` ENABLE KEYS */;
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
