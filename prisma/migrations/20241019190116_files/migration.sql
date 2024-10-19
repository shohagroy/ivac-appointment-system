-- CreateTable
CREATE TABLE `VisaFile` (
    `id` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment_files` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `resend` INTEGER NOT NULL DEFAULT 0,
    `visaFileId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `appointment_files_visaFileId_key`(`visaFileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `info` (
    `id` VARCHAR(191) NOT NULL,
    `webId` VARCHAR(191) NOT NULL,
    `webIdRepeat` VARCHAR(191) NOT NULL,
    `passport` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `captcha` VARCHAR(191) NULL,
    `isOpen` BOOLEAN NOT NULL DEFAULT false,
    `centerId` INTEGER NOT NULL,
    `ivacId` INTEGER NOT NULL,
    `amountChangeDataId` INTEGER NOT NULL,
    `visaTypeId` INTEGER NOT NULL,
    `confirmTos` BOOLEAN NOT NULL DEFAULT false,
    `appointmentFileId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `center` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cName` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createdBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ivac` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `centerInfoId` INTEGER NOT NULL,
    `ivacName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL,
    `createdOn` DATETIME(3) NOT NULL,
    `visaFee` DOUBLE NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NULL,
    `appKey` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NULL,
    `charge` DOUBLE NOT NULL,
    `newVisaFee` DOUBLE NOT NULL,
    `oldVisaFee` DOUBLE NOT NULL,
    `newFeesAppliedFrom` DATETIME(3) NOT NULL,
    `notifyFeesFrom` DATETIME(3) NOT NULL,
    `maxNotificationCount` INTEGER NOT NULL,
    `allowOldAmountUntilNewDate` INTEGER NOT NULL,
    `notificationTextBesideAmount` VARCHAR(191) NULL,
    `notificationTextPopup` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amount_change_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `allowOldAmountUntilNewDate` INTEGER NOT NULL,
    `maxNotificationCount` INTEGER NOT NULL,
    `oldVisaFees` DOUBLE NOT NULL,
    `newFeesAppliedFrom` DATETIME(3) NOT NULL,
    `notice` BOOLEAN NOT NULL DEFAULT false,
    `noticeShort` VARCHAR(191) NULL,
    `noticePopup` VARCHAR(191) NULL,
    `newVisaFee` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visa_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointment_files` ADD CONSTRAINT `appointment_files_visaFileId_fkey` FOREIGN KEY (`visaFileId`) REFERENCES `VisaFile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_centerId_fkey` FOREIGN KEY (`centerId`) REFERENCES `center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_ivacId_fkey` FOREIGN KEY (`ivacId`) REFERENCES `ivac`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_amountChangeDataId_fkey` FOREIGN KEY (`amountChangeDataId`) REFERENCES `amount_change_data`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_visaTypeId_fkey` FOREIGN KEY (`visaTypeId`) REFERENCES `visa_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_appointmentFileId_fkey` FOREIGN KEY (`appointmentFileId`) REFERENCES `appointment_files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
