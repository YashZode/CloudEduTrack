-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: user_auth_db
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `question_id` bigint NOT NULL AUTO_INCREMENT,
  `selected_option` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct_answer` varchar(255) DEFAULT NULL,
  `optiona` varchar(255) DEFAULT NULL,
  `optionb` varchar(255) DEFAULT NULL,
  `optionc` varchar(255) DEFAULT NULL,
  `optiond` varchar(255) DEFAULT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subject` (`subject_id`),
  CONSTRAINT `fk_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  CONSTRAINT `FKkfvh71q42645g7p9cgxjygbgc` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'a','50','10','20','80','What is 10 + 40 ?',1),(2,'b','15','25','35','45','What is 5 + 20?',1),(3,'c','18','28','38','48','What is 20 + 18?',1),(4,'a','41','85','52','44','What is 21 + 23?',1),(5,'d','23','33','43','53','What is 30 + 23?',1),(6,'b','12','22','32','42','What is 12 + 10?',1),(7,'c','34','44','54','64','What is 34 + 20?',1),(8,'a','19','29','39','49','What is 10 + 9?',1),(9,'d','16','26','36','46','What is 20 + 26?',1),(10,'b','21','31','41','51','What is 10 + 21?',1),(11,'c','6 days','3 days','7 days','4 days','How many days are there in a week?',2),(12,'b','Mars','Earth','Venus','Jupiter','Which planet is known as the Blue Planet?',2),(13,'a','Asia','Africa','Europe','Australia','Which is the largest continent?',2),(14,'c','Amazon','Nile','Yangtze','Mississippi','Which is the longest river in the world?',2),(15,'c','2','3','4','5','How many chambers does the human heart have?',2),(16,'b','Moon','Sun','Mars','Venus','What does Earth orbit around?',2),(17,'b','Jupiter','Saturn','Mars','Venus','Which planet has the most rings?',2),(18,'d','Atlantic','Indian','Arctic','Pacific','Which is the largest ocean on Earth?',2),(19,'c','Mount Kilimanjaro','K2','Mount Everest','Mont Blanc','Which is the highest mountain in the world?',2),(20,'b','Piano','Guitar','Violin','Drums','Which instrument has six strings?',2);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `total_score` int NOT NULL,
  `numberOfTimesTabSwitched` int NOT NULL DEFAULT '0',
  `number_of_times_tab_switched` int NOT NULL,
  `subject_id` bigint DEFAULT NULL,
  `quizAttempted` tinyint(1) NOT NULL DEFAULT '0',
  `quiz_attempted` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKel5u24fp61et77dpsy129e8pl` (`subject_id`),
  CONSTRAINT `FKel5u24fp61et77dpsy129e8pl` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
INSERT INTO `result` VALUES (58,9,1,20,0,0,1,0,_binary ''),(59,9,1,20,0,3,2,0,_binary ''),(60,8,2,20,0,0,1,0,_binary ''),(61,3,2,20,0,5,1,0,_binary ''),(62,8,2,20,0,5,2,0,_binary ''),(63,4,3,20,0,0,1,0,_binary ''),(64,7,3,20,0,3,2,0,_binary ''),(65,3,3,20,0,3,1,0,_binary ''),(66,2,4,20,0,1,2,0,_binary ''),(67,5,5,20,0,0,1,0,_binary ''),(68,5,5,20,0,1,1,0,_binary ''),(69,0,5,20,0,1,2,0,_binary ''),(70,1,5,20,0,0,1,0,_binary '');
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'math'),(2,'english');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90','user1'),(2,'6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3','user2'),(3,'5860faf02b6bc6222ba5aca523560f0e364ccd8b67bee486fe8bf7c01d492ccb','user3'),(4,'5269ef980de47819ba3d14340f4665262c41e933dc92c1a27dd5d01b047ac80e','user4'),(5,'5a39bead318f306939acb1d016647be2e38c6501c58367fdb3e9f52542aa2442','user5'),(6,'ecb48a1cc94f951252ec462fe9ecc55c3ef123fadfe935661396c26a45a5809d','user6'),(7,'3268151e52d97b4cacf97f5b46a5c76c8416e928e137e3b3dc447696a29afbaa','user7'),(8,'f60afa4989a7db13314a2ab9881372634b5402c30ba7257448b13fa388de1b78','user8'),(9,'0fb8d3c5dfaf81a387bf0ba439ab40e6343d2155fb4ddf6978a52d9b9ea8d0f8','user9'),(10,'5bbf1a9e0de062225a1bb7df8d8b3719591527b74950810f16b1a6bc6d7bd29b','user10'),(11,'81115e31e22a5801b197750ec12d7a51ad693aa017ecc8bca033cbd500a928b6','user11'),(12,'bd35283fe8fcfd77d7c05a8bf2adb85c773281927e12c9829c72a9462092f7c4','user12'),(13,'1834e148b518a43a37e04a4e4fbcee1eb845de6ee5a3f04fe9fb749f9695be42','user13'),(14,'daf7996f88742675acb3d0f85a8069d02fdf1c4dc2026de7f01a0ba7e65922fb','user14'),(15,'2b8b66f64b605318593982b059a08dae101c0bdf5d8cb882a0891241a704f46c','user15'),(16,'4de4153595c0977d2389d0880547bd3aa60871e906ce52a26648d8ca0a157e5c','user16'),(17,'2a60ff641c890283b1d070f827cf9c0cce004769c2a2dc7136bc6d290477275c','user17'),(18,'ebc835d1b43e63d1ba35af810da3a23e4f8a04cf680f1718c2fefb1ee77fcecf','user18'),(19,'0b6ecb3aa9b23589fb9e314b46c832d977e597228c1e358fcc564bd8ba733195','user19'),(20,'7febe54e79096749ac43dc6c2e3e5d4dc768993d1f3102889257c9cab7934ec7','user20'),(21,'8fab3a60577befd765cde83f2737cd1a9f25a72356c94052c2194e816829b331','user21'),(22,'b999205cdacd2c4516598d99b420d29786443e9908556a65f583a6fd4765ee4a','user22'),(23,'2a0fff6e36fbc6a21f7b065f24a3ffb40de209ea8cfc15d76cf786f74dd6f115','user23'),(24,'65303a0ec5984ab62d102031a5c9be89ca21812816af34a8e13c8104be240ab2','user24'),(25,'dab53605c85e2eff2f2192e08b772cbc06af317d217d09e161215901339300e0','user25'),(26,'6356b9f65e6e775b3feb7996bd3e1ba3f20c83366e4aec56f4f3979a0cfd75f5','user26'),(27,'590b1a8287729e75223a77d4f64fb13dd1bc1819f4e185fe37f81b97e436edbc','user27'),(28,'fdc86230e908634cb03015f1a016ffa16f1cd9eac9003b51fcd1c13abb799c06','user28'),(29,'df3c4035da126a48f484133358bedf2306c403af75347c8420a96e461d1709ad','user29'),(30,'601fbd496628a2a8ad6186af757273b116d9f2a7d666145827c68e0bef1ccd13','user30'),(31,'4ccb2f3b57e6de1caea8475b13fb5c968a766f78c3004034f07704ae5fd3e5dd','user31'),(32,'54a2979a455bec056285887a8137d1bfe6cbfd229e558ea4d28cd67cf81ed38e','user32'),(33,'f81e0105e6dcdf3f2e2041d119d1c87b9e66a73f8d0007d2dc505595b20d9809','user33'),(34,'4d4ec9499ab2bce1c5c8a565004ac27d90a593a360e79bc237b917b43d34c44d','user34'),(35,'3dd5329b7396fda1de5878a24ab7ca98cd47351bcbfb37138565a30771da1590','user35'),(36,'06f01542cd526fcfd7624cf9fca3e0e3899e25a9e84da65d3b8cb5ac200dda1f','user36'),(37,'9c10f9996d42387555f8008224c0b8ffcedd501108b9f6ac1159ecd87bb9f6c3','user37'),(38,'85a20bcfad4e8153d5fd624c87ed0ae685d3f70595aaeb561b5228dfbda71f51','user38'),(39,'dd69a400ddf28026fe94595eafadd0d1d7163301162a17e3cf7b36115d02e693','user39'),(40,'39a6bd68eee930e937ba05904fd4379444bb6f33c45232d93844788da336c4ee','user40'),(41,'ce063ef25241f49ef0adef10d7c2ba9108df3aca630b7f03f160d41a7e198c8e','user41'),(42,'fb44d98b9d56bbe49028eacc8574f5715178e6d3470d276a1697de3df68e7579','user42'),(43,'f02916fe22baf673a04bc322efd5efc188fa45a378d47c2fd9effaa2952b33ae','user43'),(44,'0d28f6929860381621e417f808a811e85d60442aa7d29b69a6302d8d2321c57b','user44'),(45,'435fa81d2e3e34b76e40154d878de9f7df8bdc18429d7321f14cd3cb906766a1','user45'),(46,'47a268f40a503fc100a1b3ab3413d241c1861f37228761dd2198a94fc6d06811','user46'),(47,'8a43bbd15dc9d40eb8556bc68608a3beb80a3f6903a1c55c1c1686151ea7c50c','user47'),(48,'70df126f7888b99fd00f45feae219ac1b75c09ae67f84dcf9ecc2d45d54e9f37','user48'),(49,'62752906d749b398b283bb8faa750cc4f0c40e69bef872c80580fa4ff71d65fe','user49'),(50,'59ea123c0d70b150939706c1ed9822e76f87a73d159a4a67792924a85c6f92bb','user50');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07  9:18:04
