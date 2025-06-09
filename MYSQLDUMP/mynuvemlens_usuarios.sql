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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil_id` int NOT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bio` text,
  `interesses` text,
  `projetos` text,
  `localizacao` varchar(100) DEFAULT NULL,
  `quantidade_observacoes` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `perfil_id` (`perfil_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfis` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (28,'Daniella Nunes Tenório','usuario@example.com','$2b$10$RqyEKpqeeQSlXqa.hlklou5qW0dTAix18RTBIOLX9zxwfojYN5rJe',3,'2025-04-29 21:21:15','Apaixonada pela natureza, observadora de nuvens e entusiasta de ciência cidadã. Estudante de Desenvolvimento de Software Multiplataforma na FATEC, com interesse especial em dados ambientais, genealogia e cultura popular.','Meteorologia, geologia, ciência de dados, astronomia, linguagens de programação, cultura nordestina, nuvens.','My NuvemLens – plataforma de observação de nuvens; minissérie sobre influências árabes e sefarditas na cultura nordestina; pesquisa genealógica histórica.','Cotia, São Paulo.',9),(29,'administrador da silva','administrador@example.com','$2b$10$aOQ9fmo2ZDricrG6FdLRF.zogwkuF50RAC9IkAC9nUb0X6B7Rf6xK',1,'2025-04-29 21:21:34','fffee','Observação de nuvens, Meteorologia, Natureza','Análise de Padrões de Tempestades','Cotia, São Paulooo',0),(30,'Mariano Ferreira','moderador@example.com','$2b$10$geWpD15tnkWTANncHQadLeQm4PGoztACNU/heGLbfPZSUT2/4ja6.',4,'2025-04-29 21:21:44','Apaixonado por meteorologia, observação do céu e classificação de nuvens. Trabalho como moderador da plataforma NuvenLens, ajudando a manter a comunidade organizada e científica.','Nuvens, meteorologia, fotografia do céu, fenômenos atmosféricos, ciência cidadã.',' Validação de fotos, organização de desafios sazonais, apoio na construção da enciclopédia de nuvens.','São Paulo - SP',1),(32,'Daniella Eta Orionis','daniella.etaorionisn@gmail.com','$2b$10$NHcty9LeWXgh0oD8e.msEOHJCS8J1kQd6rrKArk4fJqYzbBNO8BM2',3,'2025-05-24 18:07:01',NULL,NULL,NULL,NULL,5),(33,'Daniella Nunes Tenorio','daniella.nunestenorio@discente.univasf.edu.br','$2b$10$KD68kUaA8VuO1OPSHXQxMubvchtb8EfRMaorRiZNwMM/LsLIM3BDO',3,'2025-05-24 18:14:02',NULL,NULL,NULL,NULL,0),(34,'Maria Santos','maria@exemplo.com','$2b$10$y9k03O0PszxmV8NTjy6VZ.la15MJ9yxC.8CpdZrEhLLzhfPosTXg2',3,'2025-05-28 14:47:57',NULL,NULL,NULL,NULL,0),(35,'Teste','t@t.com','123',1,'2025-06-08 05:47:32',NULL,NULL,NULL,NULL,0),(37,'João Nunes Gomes','joao@ex.com','123123',4,'2025-06-09 00:49:51',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_usuarios_validar_data` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
  IF NEW.data_cadastro > NOW() THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'data_cadastro nao pode ser maior que o horario atual';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_audit_insert_usuarios` AFTER INSERT ON `usuarios` FOR EACH ROW BEGIN
  INSERT INTO Audit_Log_Geral
    (tabela_nome, operacao, pk_valor, usuario)
  VALUES
    ('usuarios','INSERT', NEW.id, CURRENT_USER());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_usuarios_validar_data_upd` BEFORE UPDATE ON `usuarios` FOR EACH ROW BEGIN
  IF NEW.data_cadastro > NOW() THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'data_cadastro nao pode ser maior que o horario atual';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_audit_update_usuarios` AFTER UPDATE ON `usuarios` FOR EACH ROW BEGIN
  INSERT INTO Audit_Log_Geral
    (tabela_nome, operacao, pk_valor, usuario)
  VALUES
    ('usuarios','UPDATE', NEW.id, CURRENT_USER());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_audit_delete_usuarios` AFTER DELETE ON `usuarios` FOR EACH ROW BEGIN
  INSERT INTO Audit_Log_Geral
    (tabela_nome, operacao, pk_valor, usuario)
  VALUES
    ('usuarios','DELETE', OLD.id, CURRENT_USER());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09  0:14:53
