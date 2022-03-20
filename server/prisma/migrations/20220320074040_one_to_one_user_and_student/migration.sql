/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_account` DROP FOREIGN KEY `user_account_ibfk_1`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `account_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `student_account_id_key` ON `student`(`account_id`);

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `user_account`(`account_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
