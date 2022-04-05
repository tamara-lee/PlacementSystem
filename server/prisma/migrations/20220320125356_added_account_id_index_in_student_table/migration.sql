-- DropIndex
DROP INDEX `student_uid` ON `user_account`;

-- AlterTable
ALTER TABLE `student` MODIFY `placement_status` ENUM('NA', 'Waiting', 'Incomplete', 'Approved') NOT NULL DEFAULT 'NA';

-- CreateIndex
CREATE INDEX `account_id` ON `student`(`account_id`);
