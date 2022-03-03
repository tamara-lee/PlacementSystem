/*
  Warnings:

  - You are about to alter the column `username` on the `user_account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(64)` to `VarChar(8)`.
  - A unique constraint covering the columns `[username]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user_account` MODIFY `username` VARCHAR(8) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_account_username_key` ON `user_account`(`username`);
