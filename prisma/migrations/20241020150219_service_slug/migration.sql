/*
  Warnings:

  - You are about to drop the column `appointmentFileId` on the `visafile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `VisaFile_appointmentFileId_fkey` ON `visafile`;

-- AlterTable
ALTER TABLE `visafile` DROP COLUMN `appointmentFileId`,
    ADD COLUMN `slugId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ServiceSlug` (
    `id` VARCHAR(191) NOT NULL,
    `center` INTEGER NOT NULL,
    `ivac` INTEGER NOT NULL,
    `phone` VARCHAR(191) NULL,
    `otp` VARCHAR(191) NULL,
    `dateSlot` VARCHAR(191) NULL,
    `timeSlot` JSON NULL,
    `asignUserId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `clientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisaFile` ADD CONSTRAINT `VisaFile_slugId_fkey` FOREIGN KEY (`slugId`) REFERENCES `ServiceSlug`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceSlug` ADD CONSTRAINT `ServiceSlug_asignUserId_fkey` FOREIGN KEY (`asignUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceSlug` ADD CONSTRAINT `ServiceSlug_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
