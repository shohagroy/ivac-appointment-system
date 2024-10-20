/*
  Warnings:

  - You are about to drop the `serviceslug` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `serviceslug` DROP FOREIGN KEY `ServiceSlug_asignUserId_fkey`;

-- DropForeignKey
ALTER TABLE `serviceslug` DROP FOREIGN KEY `ServiceSlug_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `visafile` DROP FOREIGN KEY `VisaFile_slugId_fkey`;

-- DropTable
DROP TABLE `serviceslug`;

-- CreateTable
CREATE TABLE `services_slug` (
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
ALTER TABLE `VisaFile` ADD CONSTRAINT `VisaFile_slugId_fkey` FOREIGN KEY (`slugId`) REFERENCES `services_slug`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services_slug` ADD CONSTRAINT `services_slug_asignUserId_fkey` FOREIGN KEY (`asignUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services_slug` ADD CONSTRAINT `services_slug_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
