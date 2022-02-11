-- CreateTable
CREATE TABLE `student` (
    `student_uid` VARCHAR(10) NOT NULL,
    `english_name` VARCHAR(64) NOT NULL,
    `acad_year` VARCHAR(4) NOT NULL,
    `course_year` TINYINT NOT NULL,
    `curriculum` VARCHAR(30) NOT NULL,
    `placement_status` ENUM('NA', 'Waiting', 'Incomplete', 'Approved') NOT NULL,
    `modified_by` VARCHAR(8) NOT NULL,
    `last_modified` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`student_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_account` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_uid` VARCHAR(10) NULL,
    `username` VARCHAR(64) NOT NULL,
    `password` VARCHAR(20) NOT NULL,

    INDEX `student_uid`(`student_uid`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_account` ADD CONSTRAINT `user_account_ibfk_1` FOREIGN KEY (`student_uid`) REFERENCES `student`(`student_uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
