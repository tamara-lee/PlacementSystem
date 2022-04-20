-- AlterTable
ALTER TABLE `placement` MODIFY `salary` VARCHAR(11);

-- RenameIndex
ALTER TABLE `student` RENAME INDEX `student_account_id_unique` TO `student_account_id_key`;
