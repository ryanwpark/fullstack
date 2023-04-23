CREATE DATABASE  IF NOT EXISTS `main` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `main`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: cosc3360-med.mysql.database.azure.com    Database: main
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `appoinment`
--

DROP TABLE IF EXISTS `appoinment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appoinment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `appt_Patient_id` int NOT NULL DEFAULT '1111111',
  `appt_Doctor_id` int NOT NULL DEFAULT '9999999' COMMENT '(doctor ID’s will be 9 digits starting with )\\\\\\\\n(Patient ID’s will be 9 digits starting with 1)',
  `appt_office_id` int NOT NULL DEFAULT '0',
  `ref_id` int DEFAULT '0',
  `appt_date` date NOT NULL DEFAULT '2023-01-01',
  `appt_time` time NOT NULL,
  PRIMARY KEY (`appointment_id`),
  UNIQUE KEY `appoinment_id_UNIQUE` (`appointment_id`),
  UNIQUE KEY `ref_id_UNIQUE` (`ref_id`),
  KEY `doctor_id_idx` (`appt_Doctor_id`),
  KEY `fk_appt_patient_id` (`appt_Patient_id`),
  KEY `fk_appt_office_id` (`appt_office_id`),
  KEY `fk_ref_id_idx` (`ref_id`),
  CONSTRAINT `fk_appt_doctor_id` FOREIGN KEY (`appt_Doctor_id`) REFERENCES `doctor` (`doctor_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_appt_office_id` FOREIGN KEY (`appt_office_id`) REFERENCES `office` (`office_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_appt_patient_id` FOREIGN KEY (`appt_Patient_id`) REFERENCES `patient` (`patient_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ref_id` FOREIGN KEY (`ref_id`) REFERENCES `referrals` (`ref_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=359 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appoinment`
--

LOCK TABLES `appoinment` WRITE;
/*!40000 ALTER TABLE `appoinment` DISABLE KEYS */;
INSERT INTO `appoinment` (`appointment_id`, `appt_Patient_id`, `appt_Doctor_id`, `appt_office_id`, `ref_id`, `appt_date`, `appt_time`) VALUES (265,21,32,1,NULL,'2022-12-15','12:00:00'),(266,21,32,1,NULL,'2022-12-27','12:30:00'),(267,21,32,1,NULL,'2023-01-05','08:45:00'),(268,21,32,1,NULL,'2023-03-10','11:30:00'),(270,33,35,2,NULL,'2023-04-04','12:30:00'),(271,33,35,2,NULL,'2023-04-05','12:30:00'),(272,33,35,2,NULL,'2023-04-06','12:45:00'),(273,34,37,3,NULL,'2023-04-04','16:00:00'),(274,34,37,3,NULL,'2023-04-05','16:00:00'),(275,34,37,3,NULL,'2023-04-06','14:30:00'),(330,21,32,1,NULL,'2023-09-22','01:30:00'),(346,21,32,1,NULL,'2023-08-17','11:30:00'),(350,21,32,1,NULL,'2023-04-11','14:30:00'),(352,21,32,1,NULL,'2023-04-13','14:00:00'),(358,21,33,1,304,'2023-04-26','14:30:00');
/*!40000 ALTER TABLE `appoinment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`darionle96`@`%`*/ /*!50003 TRIGGER `chk_valid` BEFORE INSERT ON `appoinment` FOR EACH ROW BEGIN
  DECLARE spec_refer INT;
  DECLARE referral INT;
  DECLARE general_doc INT;
  DECLARE office_st_hrs TIME;
  DECLARE office_ed_hrs TIME;
  DECLARE appt_count INT;
  DECLARE doctor_spec varchar(25);
  
SELECT doctor_specialization INTO doctor_spec FROM doctor where doctor_ID = NEW.appt_Doctor_id;

SELECT 
    speacialist_referred
INTO spec_refer FROM
    Referrals
WHERE
    Referrals.ref_ID = NEW.ref_id;

SELECT 
    patient_ref_ID
INTO referral FROM
    Patient
WHERE
    patient_ID = NEW.appt_Patient_id;
    
SELECT 
    patient_prime_doctor
INTO general_doc FROM
    Patient
WHERE
    patient_ID = NEW.appt_Patient_id;
    
SELECT 
    start_time
INTO office_st_hrs FROM
    availability
WHERE
    (office_id = NEW.appt_office_id)
        AND is_available = '1';
SELECT 
    end_time
INTO office_ed_hrs FROM
    availability
WHERE
    (office_id = NEW.appt_office_id)
        AND is_available = '1';

 -- trigger to check for referral and specialist
  IF general_doc = NEW.appt_Doctor_id THEN
		SET referral = '0';
-- making an appt w/SD but no referral under acct
  ELSEIF (general_doc != NEW.appt_Doctor_id) AND (referral IS NULL) THEN
        SIGNAL SQLSTATE '45000' SET message_text = 'You do not have the required referral to see this physician. Please contact your PCP if you believe this is a mistake.';
-- making an appt when you have a ref but you are putting in the wrong SD
  ELSEIF spec_refer != NEW.appt_Doctor_id THEN
        SIGNAL SQLSTATE '45000' SET message_text = 'You are not referred to this specialist. Please check the referral and try again.';
-- making an appt with the wrong general doc
  ELSEIF (doctor_spec = 'General') AND (general_doc != NEW.appt_doctor_id) AND (NEW.ref_ID IS NULL) THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'This is not your assigned primary care physician.';
-- making an appt with SD and not putting in a ref_ID
ELSEIF (doctor_spec != 'General') AND (general_doc != NEW.appt_doctor_id) AND (NEW.ref_ID IS NULL) THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'You did not put in a referral ID for this specialist. Please check your referral and try again.';
  END IF;
  
  -- trigger to check valid appointment date and time
  -- appt cannot be made before the current date
  IF NEW.appt_date < CURDATE() THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "You cannot create an appointment before today's date.";
  -- appt cannot be made on a weekend
  ELSEIF DAYOFWEEK(NEW.appt_date) IN (1,7) = TRUE THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "The office is closed on the weekends. Please choose another date.";
  -- appt cannot be made outside of office hours
  ELSEIF (DAYOFWEEK(NEW.appt_date) BETWEEN 2 AND 6 = TRUE) AND (NEW.appt_time < office_st_hrs OR NEW.appt_time > office_ed_hrs) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "The office is closed during these hours. Please choose a different time for the appointment.";
  END IF;
  
  -- trigger to make sure duplicate appointments cannot be made
  SET appt_count = (SELECT COUNT(*) FROM appoinment where appt_Patient_id = NEW.appt_Patient_id AND appt_date = NEW.appt_date AND appt_time = NEW.appt_time);
  IF appt_count > 0 THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An appointment has already been booked for this time.';
  END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `office_id` int NOT NULL,
  `start_time` time NOT NULL DEFAULT '00:00:00',
  `end_time` time NOT NULL DEFAULT '00:00:00',
  `is_available` tinyint(1) NOT NULL DEFAULT '0',
  `day_of_week` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `office_id` (`office_id`),
  CONSTRAINT `Availability_ibfk_1` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_ID`),
  CONSTRAINT `Availability_ibfk_2` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` (`id`, `office_id`, `start_time`, `end_time`, `is_available`, `day_of_week`) VALUES (1,1,'00:00:00','00:00:00',0,1),(2,2,'00:00:00','00:00:00',0,1),(3,3,'00:00:00','00:00:00',0,1),(4,1,'08:00:00','17:30:00',1,2),(5,2,'08:00:00','17:30:00',1,2),(6,3,'08:00:00','17:30:00',1,2),(11,1,'00:00:00','00:00:00',0,7),(12,2,'00:00:00','00:00:00',0,7),(13,3,'00:00:00','00:00:00',0,7);
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`darionle96`@`%`*/ /*!50003 TRIGGER `weekend_change` BEFORE INSERT ON `availability` FOR EACH ROW BEGIN
IF NEW.day_of_week = '1' OR '7' THEN
	SET NEW.is_available = '0';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `blood_cbc_test`
--

DROP TABLE IF EXISTS `blood_cbc_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_cbc_test` (
  `blood_ID` int NOT NULL AUTO_INCREMENT,
  `blo_type` varchar(10) NOT NULL,
  `blo_RBC` int NOT NULL,
  `blo_WBC` int NOT NULL,
  `blo_hemoglobin` int NOT NULL,
  `blo_Hematocrit_percent` int NOT NULL,
  `blo_platelets` int NOT NULL,
  `patient_ID` int NOT NULL,
  PRIMARY KEY (`blood_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_cbc_test`
--

LOCK TABLES `blood_cbc_test` WRITE;
/*!40000 ALTER TABLE `blood_cbc_test` DISABLE KEYS */;
INSERT INTO `blood_cbc_test` (`blood_ID`, `blo_type`, `blo_RBC`, `blo_WBC`, `blo_hemoglobin`, `blo_Hematocrit_percent`, `blo_platelets`, `patient_ID`) VALUES (1,'O+',5,6,13,40,120,21),(13,'O+',5,6,12,39,119,21),(14,'O+',5,5,13,38,117,21),(15,'O+',4,6,11,36,115,21),(16,'O+',4,4,12,35,110,21),(17,'O+',3,4,9,30,95,21),(18,'B',5,8,13,45,250,33),(19,'B',5,8,12,43,245,33),(20,'B',4,7,10,42,240,33),(21,'AB',5,8,14,46,265,34),(22,'AB',4,7,15,43,245,34),(23,'AB',3,8,14,45,255,34),(25,'b+',12,10,23,12,20,21),(26,'O+',34,13,42,32,11,21),(27,'O+',5,6,12,45,200,21),(28,'O+',20,20,20,30,20,21),(29,'B+',19,1,12,29,11,21);
/*!40000 ALTER TABLE `blood_cbc_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis`
--

DROP TABLE IF EXISTS `diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis` (
  `diag_id` int NOT NULL AUTO_INCREMENT,
  `patient_ID` int NOT NULL,
  `doctor_ID` int NOT NULL,
  `diag_checkup_ID` int NOT NULL,
  `diag_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`diag_id`),
  UNIQUE KEY `diag_id_UNIQUE` (`diag_id`),
  KEY `Diagnosis_ibfk_1` (`patient_ID`),
  KEY `Diagnosis_ibfk_2` (`doctor_ID`),
  KEY `Diagnosis_ibfk_3` (`diag_checkup_ID`),
  CONSTRAINT `Diagnosis_ibfk_1` FOREIGN KEY (`patient_ID`) REFERENCES `patient` (`patient_ID`) ON UPDATE CASCADE,
  CONSTRAINT `Diagnosis_ibfk_2` FOREIGN KEY (`doctor_ID`) REFERENCES `doctor` (`doctor_ID`) ON UPDATE CASCADE,
  CONSTRAINT `Diagnosis_ibfk_3` FOREIGN KEY (`diag_checkup_ID`) REFERENCES `general_checkup` (`checkup_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
INSERT INTO `diagnosis` (`diag_id`, `patient_ID`, `doctor_ID`, `diag_checkup_ID`, `diag_desc`) VALUES (1,21,35,1001,'Aplastic Anemia'),(6,33,35,1009,'Acidosis'),(7,34,37,1012,'Anemia');
/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_ID` int NOT NULL AUTO_INCREMENT,
  `log_username` varchar(255) NOT NULL DEFAULT 'DEFAULT',
  `office_ID` int NOT NULL DEFAULT '0',
  `doctor_name` varchar(255) NOT NULL DEFAULT 'NULL',
  `doctor_address` varchar(255) NOT NULL DEFAULT 'NULL',
  `state` varchar(28) NOT NULL DEFAULT 'XX',
  `city` varchar(255) NOT NULL DEFAULT 'NULL',
  `zip` int NOT NULL DEFAULT '11111',
  `doctor_email` varchar(255) NOT NULL DEFAULT 'NULL',
  `doctor_phone_num` varchar(10) NOT NULL DEFAULT '1111111111',
  `doctor_DOB` date NOT NULL DEFAULT '2023-01-01',
  `doctor_specialization` varchar(255) NOT NULL DEFAULT '"NULL"',
  `salary` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`doctor_ID`),
  UNIQUE KEY `doctor_ID_UNIQUE` (`doctor_ID`),
  UNIQUE KEY `log_username_UNIQUE` (`log_username`),
  KEY `fk_doct_office_id` (`office_ID`),
  CONSTRAINT `doctor_log_username_foreign` FOREIGN KEY (`log_username`) REFERENCES `login` (`log_username`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_doct_office_id` FOREIGN KEY (`office_ID`) REFERENCES `office` (`office_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` (`doctor_ID`, `log_username`, `office_ID`, `doctor_name`, `doctor_address`, `state`, `city`, `zip`, `doctor_email`, `doctor_phone_num`, `doctor_DOB`, `doctor_specialization`, `salary`) VALUES (32,'jsmith',1,'John Smith','123 Main St','California','Los Angeles',90001,'johnsmith@example.com','5551234567','1980-01-01','General',150000),(33,'jdoe',1,'Jane Doe','456 Maple Ave','New York','New York City',10001,'janedoe@example.com','5552345678','1975-05-10','Radiology',120000),(34,'jlee',3,'Jimin Lee','789 Oak St','Texas','Houston',77001,'michaeljohnson@example.com','5553456789','1990-07-15','Gastroentology',180000),(35,'jjones',2,'Joseph Jones','890 Cedar Rd','Georgia','Atlanta',30301,'emilyjones@example.com','5556789012','1982-03-30','General',140000),(36,'msmith',2,'Mary Smith','1234 Walnut Blvd','California','San Francisco',94101,'robertgarcia@example.com','5557890123','1988-06-05','Cardiology',160000),(37,'amiller',3,'Alice Miller','9012 Oakwood Ave','Texas','Dallas',75201,'danielmiller@example.com','5559012345','1983-10-16','General',190000),(38,'jgreen',1,'Jacob Green','3456 Pineapple St','Florida','Tampa',33601,'oliviawilson@example.com','5550123456','1992-12-31','General',135000);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_ID` int NOT NULL DEFAULT '7777777',
  `office_ID` int NOT NULL DEFAULT '0',
  `doctor_ID` int DEFAULT '0',
  `employee_address` varchar(255) NOT NULL DEFAULT 'NULL',
  `city` varchar(255) NOT NULL DEFAULT 'NULL',
  `state` varchar(2) NOT NULL DEFAULT 'XX',
  `zip` int NOT NULL DEFAULT '11111',
  `log_username` varchar(255) NOT NULL DEFAULT 'DEFAULT',
  `employee_title` varchar(255) NOT NULL DEFAULT 'NULL',
  `employee_Name` varchar(255) NOT NULL DEFAULT 'NULL',
  `employee_email` varchar(255) NOT NULL DEFAULT 'NULL',
  `employee_DOB` date NOT NULL DEFAULT '2023-01-01',
  `employee_phone` int NOT NULL DEFAULT '1111111111',
  `employee_salary` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`employee_ID`),
  KEY `fk_employees_log_username_foreign` (`log_username`),
  KEY `fk_employees_doctor_id_foreign` (`doctor_ID`),
  KEY `fk_emply_office_id` (`office_ID`),
  CONSTRAINT `fk_empl_doct_id` FOREIGN KEY (`doctor_ID`) REFERENCES `doctor` (`doctor_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_empl_log_username` FOREIGN KEY (`log_username`) REFERENCES `login` (`log_username`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_empl_office_id` FOREIGN KEY (`office_ID`) REFERENCES `office` (`office_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`employee_ID`, `office_ID`, `doctor_ID`, `employee_address`, `city`, `state`, `zip`, `log_username`, `employee_title`, `employee_Name`, `employee_email`, `employee_DOB`, `employee_phone`, `employee_salary`) VALUES (101,1,NULL,'567 Oak St','Houston','TX',77002,'h.wang','Admin','Wang Xinyi','xinyi.wang@email.com','1993-01-01',456780123,90000),(102,1,35,'890 Cedar St','Austin','TX',78702,'y.chen','Nurse','Chen Yan','yan.chen@email.com','1991-05-20',567801234,70000),(103,3,NULL,'234 Elm St','Dallas','TX',75202,'t.nguyen','Staff','Nguyen Thi','thi.nguyen@email.com','1998-11-11',679012345,55000),(104,2,32,'678 Oak St','Austin','TX',78703,'j.park','Nurse','Park Ji-min','jimin.park@email.com','1992-03-30',801234567,68000);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`darionle96`@`%`*/ /*!50003 TRIGGER `chk_salary` AFTER INSERT ON `employees` FOR EACH ROW BEGIN
DECLARE doctor_salary decimal(10,2);
SELECT salary INTO doctor_salary
FROM Doctor
WHERE doctor_ID = NEW.doctor_ID;

IF NEW.employee_salary > doctor_salary THEN
	SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Employee salary cannot be greater than that of their attending Docotor';
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `general_checkup`
--

DROP TABLE IF EXISTS `general_checkup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `general_checkup` (
  `checkup_ID` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `gc_medical_hist` int DEFAULT NULL,
  `gc_blood_test_ID` int DEFAULT NULL,
  `gc_Height` double(8,2) DEFAULT NULL,
  `gc_weight` double(8,2) DEFAULT NULL,
  `checkup_date` date DEFAULT NULL,
  PRIMARY KEY (`checkup_ID`),
  KEY `fk_patient_id_idx` (`patient_id`),
  KEY `fk_doctor_id_idx` (`doctor_id`),
  KEY `fk_med_history` (`gc_medical_hist`),
  KEY `fk_blo_id_idx` (`gc_blood_test_ID`),
  CONSTRAINT `fk_blo_id` FOREIGN KEY (`gc_blood_test_ID`) REFERENCES `blood_cbc_test` (`blood_ID`),
  CONSTRAINT `fk_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_med_history` FOREIGN KEY (`gc_medical_hist`) REFERENCES `medical_history` (`med_h_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_checkup`
--

LOCK TABLES `general_checkup` WRITE;
/*!40000 ALTER TABLE `general_checkup` DISABLE KEYS */;
INSERT INTO `general_checkup` (`checkup_ID`, `patient_id`, `doctor_id`, `gc_medical_hist`, `gc_blood_test_ID`, `gc_Height`, `gc_weight`, `checkup_date`) VALUES (1001,21,35,1,1,5.70,160.00,'2023-12-20'),(1002,21,32,1,13,5.70,160.00,'2022-12-15'),(1003,21,32,1,14,5.70,158.00,'2022-12-27'),(1004,21,32,1,15,5.70,150.00,'2023-01-05'),(1005,21,32,1,16,5.70,140.00,'2023-03-10'),(1006,21,32,1,17,5.70,135.00,'2023-04-20'),(1007,33,35,6,18,5.90,140.00,'2023-04-04'),(1008,33,35,6,19,5.90,150.00,'2023-04-05'),(1009,33,35,6,20,5.90,150.00,'2023-04-06'),(1010,34,37,7,21,5.50,135.00,'2023-04-04'),(1011,34,37,7,22,5.50,135.00,'2023-04-05'),(1012,34,37,7,23,5.50,135.00,'2023-04-06');
/*!40000 ALTER TABLE `general_checkup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `cost` double(8,2) NOT NULL DEFAULT '0.00',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(255) NOT NULL DEFAULT 'specify payment menthod',
  `isPaid` tinyint(1) NOT NULL DEFAULT '0',
  `is_insured` tinyint(1) NOT NULL DEFAULT '0',
  `insurance_discount` double(8,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`invoice_id`),
  KEY `fk_emply_ID` (`employee_id`),
  KEY `fk_patient_ID` (`patient_id`),
  CONSTRAINT `Invoice_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_ID`) ON UPDATE CASCADE,
  CONSTRAINT `Invoice_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` (`invoice_id`, `employee_id`, `patient_id`, `cost`, `date_created`, `payment_method`, `isPaid`, `is_insured`, `insurance_discount`) VALUES (1,101,21,775.00,'2023-03-01 10:30:00','Card',1,0,0.00),(3,101,33,240.00,'2023-04-05 22:54:44','Card',0,1,60.00),(4,101,34,0.00,'2023-04-05 22:57:04','Card',0,1,300.00),(5,101,34,0.00,'2023-04-05 22:58:00','Card',1,1,300.00),(6,101,21,300.00,'2023-12-15 16:45:00','Card',1,0,0.00),(7,101,21,250.00,'2023-12-27 17:00:00','Card',1,0,0.00),(8,101,21,350.00,'2023-01-05 15:00:00','Card',1,0,0.00),(9,101,21,275.00,'2023-03-10 15:00:00','Card',0,0,0.00),(12,101,21,240.00,'2023-02-21 13:40:00','Card',0,1,60.00);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`darionle96`@`%`*/ /*!50003 TRIGGER `insurance_discount` BEFORE INSERT ON `invoice` FOR EACH ROW BEGIN
DECLARE provider varchar(255);

SELECT insurance_provider INTO provider FROM Patient WHERE Patient.patient_ID = NEW.patient_id;

IF provider IS NOT NULL THEN
	SET NEW.is_insured = 1;
END IF;

IF NEW.is_insured = 1 AND provider = 'Medicare' THEN
	SET NEW.insurance_discount = (NEW.cost * .20);
    SET NEW.cost = (NEW.cost - NEW.insurance_discount);
END IF;

IF NEW.is_insured = 1 AND provider = 'Ambetter Value' THEN
	SET NEW.insurance_discount = NEW.cost;
    SET NEW.cost = (NEW.cost - NEW.insurance_discount);
    SET NEW.isPaid = 1;
END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `log_username` varchar(255) NOT NULL,
  `log_pass` varchar(255) NOT NULL DEFAULT 'DEFAULT',
  `role` int DEFAULT '0',
  PRIMARY KEY (`log_username`),
  UNIQUE KEY `log_username_UNIQUE` (`log_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` (`log_username`, `log_pass`, `role`) VALUES ('aalvarez','aria123',1),('admin','root1234',0),('amiller','qwertyuiop',3),('bbanks','brody123',0),('ccruz','callie123',0),('ddavidson','darian123',0),('eespinoza','ezra123',0),('ffischer','fallon123',0),('ggomez','giselle123',0),('h.wang','password456',2),('hhernandez','holden123',0),('iibarra','imani123',0),('j.park','secret123',2),('jdoe','password123',3),('jgreen','letmein',3),('jjenkins','jaxon123',0),('jjones','jjones123',3),('jlee','abcdefg',3),('jsmith','12345678',3),('msmith','password123',3),('ron.wesly','levioosa',1),('saikodelica','snoopisdope420',1),('t.nguyen','securePass',2),('wade123','password',1),('y.chen','securepassword',2);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_history`
--

DROP TABLE IF EXISTS `medical_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_history` (
  `med_h_ID` int NOT NULL AUTO_INCREMENT,
  `patient_ID` int NOT NULL DEFAULT '1111111',
  `med_h_isAnswered` tinyint(1) NOT NULL,
  `med_h_smoker` tinyint(1) NOT NULL,
  `med_h_heart_disease` tinyint(1) NOT NULL,
  `med_h_diabetes` tinyint(1) NOT NULL,
  `med_h_current_meds` varchar(55) DEFAULT NULL,
  `med_h_cancer` tinyint(1) NOT NULL,
  `med_h_pregnant` tinyint(1) NOT NULL,
  `med_h_sexual_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`med_h_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_history`
--

LOCK TABLES `medical_history` WRITE;
/*!40000 ALTER TABLE `medical_history` DISABLE KEYS */;
INSERT INTO `medical_history` (`med_h_ID`, `patient_ID`, `med_h_isAnswered`, `med_h_smoker`, `med_h_heart_disease`, `med_h_diabetes`, `med_h_current_meds`, `med_h_cancer`, `med_h_pregnant`, `med_h_sexual_active`) VALUES (1,21,1,0,0,0,'Metformin, Aspirin, Acetaminophene',0,1,1),(6,33,1,1,1,0,NULL,0,0,0),(7,34,1,1,0,1,NULL,1,0,1);
/*!40000 ALTER TABLE `medical_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `office_ID` int NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  PRIMARY KEY (`office_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` (`office_ID`, `street_address`, `city`, `state`, `country`, `zip`) VALUES (1,'301 Milam St','Houston','TX','US','77002'),(2,'4001 N Lamar Blvd','Austin','TX','US','78756'),(3,'8525 Garland Rd','Dallas','TX','US','75218');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_ID` int NOT NULL AUTO_INCREMENT,
  `log_username` varchar(25) DEFAULT 'NULL',
  `patient_address` varchar(255) NOT NULL DEFAULT 'NULL',
  `patient_prime_doctor` int DEFAULT NULL,
  `city` varchar(255) NOT NULL DEFAULT 'NULL',
  `state` varchar(2) NOT NULL DEFAULT 'XX',
  `zip` int NOT NULL DEFAULT '11111',
  `patient_first_name` varchar(150) NOT NULL DEFAULT 'defaultFirstName',
  `patient_last_name` varchar(150) NOT NULL DEFAULT 'defaultLastName',
  `patient_ref_ID` int DEFAULT NULL,
  `patient_sex` varchar(10) NOT NULL DEFAULT 'NULL',
  `patient_email` varchar(255) NOT NULL DEFAULT 'defaultEmail',
  `patient_phone_num` int NOT NULL DEFAULT '1111111111',
  `patient_dob` date NOT NULL DEFAULT '2023-01-01',
  `patient_diagnosis` varchar(255) DEFAULT NULL,
  `insurance_provider` varchar(255) DEFAULT NULL,
  `insurance_policy_number` int DEFAULT NULL,
  `SSN` int NOT NULL DEFAULT '111111111',
  PRIMARY KEY (`patient_ID`,`SSN`),
  UNIQUE KEY `patient_ID_UNIQUE` (`patient_ID`),
  UNIQUE KEY `patient_email_UNIQUE` (`patient_email`),
  UNIQUE KEY `patient_phone_num_UNIQUE` (`patient_phone_num`),
  UNIQUE KEY `SSN_UNIQUE` (`SSN`),
  UNIQUE KEY `log_username_UNIQUE` (`log_username`),
  UNIQUE KEY `patient_ref_ID_UNIQUE` (`patient_ref_ID`),
  KEY `foreign_patient_prime_doct` (`patient_prime_doctor`),
  CONSTRAINT `fk_ref` FOREIGN KEY (`patient_ref_ID`) REFERENCES `referrals` (`ref_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `foreign_log_username` FOREIGN KEY (`log_username`) REFERENCES `login` (`log_username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `foreign_patient_prime_doct` FOREIGN KEY (`patient_prime_doctor`) REFERENCES `doctor` (`doctor_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` (`patient_ID`, `log_username`, `patient_address`, `patient_prime_doctor`, `city`, `state`, `zip`, `patient_first_name`, `patient_last_name`, `patient_ref_ID`, `patient_sex`, `patient_email`, `patient_phone_num`, `patient_dob`, `patient_diagnosis`, `insurance_provider`, `insurance_policy_number`, `SSN`) VALUES (21,'aalvarez','1234 Street',32,'Houson','TX',77002,'Ryan','Coog',304,'F','shasta123@example.com',281223333,'1990-01-01',NULL,'Medicare',12354768,123456789),(33,'saikodelica','4290 Highview Dr',35,'Houston','TX',77295,'Saiki','Kusou',NULL,'M','saikiK@psychmail.com',420509169,'1999-06-09',NULL,'Medicare',1337,420691337),(34,'ron.wesly','500 Gryffindor Ln',37,'Dallas','TX',98765,'Ronald','Weasley',NULL,'M','ronleviosa@magica.com',102938475,'1988-08-24',NULL,'Ambetter Value',7862220,98765432);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescription_id` int NOT NULL AUTO_INCREMENT,
  `patient_ID` int NOT NULL DEFAULT '1111111',
  `doctor_ID` int NOT NULL DEFAULT '9999999',
  `pres_name` varchar(255) NOT NULL DEFAULT 'Prescription',
  `pres_refills` int NOT NULL DEFAULT '0',
  `med_strength` varchar(50) NOT NULL DEFAULT '0 mg',
  `med_NDC` varchar(13) NOT NULL DEFAULT '00000-0000-00',
  PRIMARY KEY (`prescription_id`),
  UNIQUE KEY `prescription_id_UNIQUE` (`prescription_id`),
  KEY `patient_ID_idx` (`patient_ID`),
  KEY `doctor_ID_idx` (`doctor_ID`),
  CONSTRAINT `doctor_ID` FOREIGN KEY (`doctor_ID`) REFERENCES `doctor` (`doctor_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `patient_ID` FOREIGN KEY (`patient_ID`) REFERENCES `patient` (`patient_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` (`prescription_id`, `patient_ID`, `doctor_ID`, `pres_name`, `pres_refills`, `med_strength`, `med_NDC`) VALUES (1,21,35,'Lipitor',3,'10mg','00071-0155'),(12,21,32,'Tylenol',4,'250mg','123123'),(13,21,32,'Ibruprofen',4,'250mg','123123'),(14,21,32,'Ibruprofen',1,'250mg','123123'),(15,21,32,'Ibruprofen',1,'50mg','123123'),(33,21,32,'ryan',1,'1mg','123'),(34,21,32,'ryan',1,'1mg','123'),(44,21,32,'ryan',1,'1mg','123'),(45,21,32,'ryan',1,'1mg','123'),(50,21,32,'lala',1,'1mg','123'),(54,21,32,'newpres',30,'120mg','1230321'),(58,21,32,'zzquil',20,'10mg','999111'),(59,21,32,'Tylenal',2,'120mg','123123'),(60,21,32,'Acetaminophen',2,'25mg','49483'),(61,21,32,'Acetaminophen',2,'25mg','49483'),(62,21,32,'Ibuprofren',3,'10mg','123-321');
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referrals` (
  `ref_ID` int NOT NULL AUTO_INCREMENT,
  `speacialist_referred` int NOT NULL,
  `referring_doc` int NOT NULL,
  `doctor_specialization` varchar(255) NOT NULL DEFAULT '"NULL"',
  `patient_id` int NOT NULL,
  PRIMARY KEY (`ref_ID`),
  KEY `fk_doct_spec_idx` (`doctor_specialization`),
  KEY `fk_referring_doc` (`referring_doc`),
  KEY `fk_speacialist` (`speacialist_referred`),
  KEY `fk_patient_idx` (`patient_id`),
  CONSTRAINT `fk_referring_doc` FOREIGN KEY (`referring_doc`) REFERENCES `doctor` (`doctor_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_speacialist` FOREIGN KEY (`speacialist_referred`) REFERENCES `doctor` (`doctor_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referrals`
--

LOCK TABLES `referrals` WRITE;
/*!40000 ALTER TABLE `referrals` DISABLE KEYS */;
INSERT INTO `referrals` (`ref_ID`, `speacialist_referred`, `referring_doc`, `doctor_specialization`, `patient_id`) VALUES (304,33,32,'Radiology',21),(331,33,32,'Radiology',21);
/*!40000 ALTER TABLE `referrals` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`darionle96`@`%`*/ /*!50003 TRIGGER `chk_specialization` BEFORE INSERT ON `referrals` FOR EACH ROW BEGIN
declare specialization varchar(255);

SELECT 
    doctor_specialization
INTO specialization FROM
    doctor
WHERE
    doctor_ID = NEW.speacialist_referred;

if specialization != NEW.doctor_specialization then
	signal sqlstate '45000' set message_text = 'This physician is not under the intended specialization that you are referring your patient to.';
end if;
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

-- Dump completed on 2023-04-23 17:46:16
