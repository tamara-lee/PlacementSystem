/*
  Warnings:

  - You are about to drop the column `answers` on the `remarks` table. All the data in the column will be lost.
  - You are about to drop the column `cat` on the `remarks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_uid]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `faq` MODIFY `last_modified` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `placement` MODIFY `last_modified` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `remarks` DROP COLUMN `answers`,
    DROP COLUMN `cat`;

-- AlterTable
ALTER TABLE `student` MODIFY `last_modified` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_account_student_uid_key` ON `user_account`(`student_uid`);

-- RenameIndex
ALTER TABLE `student` RENAME INDEX `student_account_id_key` TO `student_account_id_unique`;
