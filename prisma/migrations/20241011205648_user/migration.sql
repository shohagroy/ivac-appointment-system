/*
  Warnings:

  - You are about to drop the column `addressId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_addressId_fkey`;

-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `addressId`,
    DROP COLUMN `gender`;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
