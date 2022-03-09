/*
  Warnings:

  - You are about to alter the column `username` on the `user_account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(8)`.
  - A unique constraint covering the columns `[username]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user_account` MODIFY `username` VARCHAR(8) NOT NULL;

-- CreateTable
CREATE TABLE `placement` (
    `placement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(8) NOT NULL,
    `student_uid` VARCHAR(10) NOT NULL,
    `placement_year` VARCHAR(4) NOT NULL,
    `appointment_letter` TEXT NULL,
    `feedback_form` TEXT NULL,
    `feedback_comment` VARCHAR(200) NULL,
    `company_name` VARCHAR(100) NULL,
    `job_title` VARCHAR(40) NULL,
    `job_nature` TEXT NULL,
    `employment_duration` VARCHAR(60) NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `working_location` VARCHAR(60) NULL,
    `salary` DECIMAL(8, 2) NULL,
    `payment_type` ENUM('paid', 'unpaid', 'honorarium') NULL,
    `supervisor_name` VARCHAR(60) NULL,
    `supervisor_telephone` VARCHAR(20) NULL,
    `supervisor_email` VARCHAR(60) NULL,
    `modified_by` VARCHAR(8) NOT NULL,
    `last_modified` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(10) NOT NULL,
    `creation_time` DATETIME(0) NOT NULL,
    `consent_form` TEXT NULL,

    UNIQUE INDEX `placement_id`(`placement_id`),
    UNIQUE INDEX `placement_username_key`(`username`),
    INDEX `student_uid`(`student_uid`),
    INDEX `username`(`username`),
    PRIMARY KEY (`placement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `faq_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `questions` TEXT NULL,
    `answers` TEXT NULL,
    `last_modified` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cat` VARCHAR(20) NULL,

    INDEX `account_id`(`account_id`),
    PRIMARY KEY (`faq_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `remarks` (
    `remarks_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `placement_id` INTEGER NOT NULL,
    `remark` TEXT NULL,
    `answers` TEXT NULL,
    `cat` VARCHAR(20) NULL,
    `sent_on` DATETIME(0) NOT NULL,
    `sent_to` VARCHAR(10) NOT NULL,

    INDEX `account_id`(`account_id`),
    INDEX `placement_id`(`placement_id`),
    PRIMARY KEY (`remarks_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test_acad_year` (
    `acad_test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `acad_test_year` INTEGER NULL,

    PRIMARY KEY (`acad_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test_placement_year` (
    `placement_test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `placement_test_year` INTEGER NULL,

    PRIMARY KEY (`placement_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_account_username_key` ON `user_account`(`username`);

-- AddForeignKey
ALTER TABLE `placement` ADD CONSTRAINT `placement_ibfk_1` FOREIGN KEY (`student_uid`) REFERENCES `student`(`student_uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `placement` ADD CONSTRAINT `placement_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user_account`(`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `faq` ADD CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user_account`(`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `remarks` ADD CONSTRAINT `remarks_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user_account`(`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `remarks` ADD CONSTRAINT `remarks_ibfk_2` FOREIGN KEY (`placement_id`) REFERENCES `placement`(`placement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
