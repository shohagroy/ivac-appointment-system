/*
  Warnings:

  - You are about to drop the `visafile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `appointment_files` DROP FOREIGN KEY `appointment_files_visaFileId_fkey`;

-- DropTable
DROP TABLE `visafile`;

-- CreateTable
CREATE TABLE `visa_files` (
    `id` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointment_files` ADD CONSTRAINT `appointment_files_visaFileId_fkey` FOREIGN KEY (`visaFileId`) REFERENCES `visa_files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
