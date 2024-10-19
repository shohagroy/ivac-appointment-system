/*
  Warnings:

  - You are about to drop the column `allowOldAmountUntilNewDate` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `maxNotificationCount` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `newFeesAppliedFrom` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `newVisaFee` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `noticePopup` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `noticeShort` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `oldVisaFees` on the `amount_change_data` table. All the data in the column will be lost.
  - You are about to drop the column `visaFileId` on the `appointment_files` table. All the data in the column will be lost.
  - You are about to drop the column `cName` on the `center` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `center` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `center` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `center` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `center` table. All the data in the column will be lost.
  - You are about to drop the column `centerId` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `confirmTos` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `isOpen` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `ivacId` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `visaTypeId` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `webId` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `webIdRepeat` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `allowOldAmountUntilNewDate` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `appKey` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `centerInfoId` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `createdOn` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `ivacName` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `maxNotificationCount` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `newFeesAppliedFrom` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `newVisaFee` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `notificationTextBesideAmount` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `notificationTextPopup` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `notifyFeesFrom` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `oldVisaFee` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `visaFee` on the `ivac` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `visa_type` table. All the data in the column will be lost.
  - You are about to drop the `visa_files` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `allow_old_amount_until_new_date` to the `amount_change_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_notification_count` to the `amount_change_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_fees_applied_from` to the `amount_change_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_visa_fee` to the `amount_change_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_visa_fees` to the `amount_change_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `c_name` to the `center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_id` to the `info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ivac_id` to the `info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visa_type_id` to the `info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `web_id` to the `info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `web_id_repeat` to the `info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allow_old_amount_until_new_date` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `app_key` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ceated_on` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_info_id` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ivac_name` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_notification_count` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_fees_applied_from` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_visa_fee` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notify_fees_from` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_visa_fee` to the `ivac` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visa_fee` to the `ivac` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `appointment_files` DROP FOREIGN KEY `appointment_files_visaFileId_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_appointmentFileId_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_centerId_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_ivacId_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_visaTypeId_fkey`;

-- AlterTable
ALTER TABLE `amount_change_data` DROP COLUMN `allowOldAmountUntilNewDate`,
    DROP COLUMN `maxNotificationCount`,
    DROP COLUMN `newFeesAppliedFrom`,
    DROP COLUMN `newVisaFee`,
    DROP COLUMN `noticePopup`,
    DROP COLUMN `noticeShort`,
    DROP COLUMN `oldVisaFees`,
    ADD COLUMN `allow_old_amount_until_new_date` INTEGER NOT NULL,
    ADD COLUMN `max_notification_count` INTEGER NOT NULL,
    ADD COLUMN `new_fees_applied_from` DATETIME(3) NOT NULL,
    ADD COLUMN `new_visa_fee` DOUBLE NOT NULL,
    ADD COLUMN `notice_popup` VARCHAR(191) NULL,
    ADD COLUMN `notice_short` VARCHAR(191) NULL,
    ADD COLUMN `old_visa_fees` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `appointment_files` DROP COLUMN `visaFileId`,
    MODIFY `resend` VARCHAR(191) NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE `center` DROP COLUMN `cName`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `isDelete`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `c_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NULL,
    ADD COLUMN `created_by` VARCHAR(191) NULL,
    ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `info` DROP COLUMN `centerId`,
    DROP COLUMN `confirmTos`,
    DROP COLUMN `isOpen`,
    DROP COLUMN `ivacId`,
    DROP COLUMN `visaTypeId`,
    DROP COLUMN `webId`,
    DROP COLUMN `webIdRepeat`,
    ADD COLUMN `center_id` INTEGER NOT NULL,
    ADD COLUMN `confirm_tos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_open` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `ivac_id` INTEGER NOT NULL,
    ADD COLUMN `visa_type_id` INTEGER NOT NULL,
    ADD COLUMN `web_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `web_id_repeat` VARCHAR(191) NOT NULL,
    MODIFY `appointmentFileId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ivac` DROP COLUMN `allowOldAmountUntilNewDate`,
    DROP COLUMN `appKey`,
    DROP COLUMN `centerInfoId`,
    DROP COLUMN `contactNumber`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `createdOn`,
    DROP COLUMN `isDelete`,
    DROP COLUMN `ivacName`,
    DROP COLUMN `maxNotificationCount`,
    DROP COLUMN `newFeesAppliedFrom`,
    DROP COLUMN `newVisaFee`,
    DROP COLUMN `notificationTextBesideAmount`,
    DROP COLUMN `notificationTextPopup`,
    DROP COLUMN `notifyFeesFrom`,
    DROP COLUMN `oldVisaFee`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `visaFee`,
    ADD COLUMN `allow_old_amount_until_new_date` INTEGER NOT NULL,
    ADD COLUMN `app_key` VARCHAR(191) NOT NULL,
    ADD COLUMN `ceated_on` DATETIME(3) NOT NULL,
    ADD COLUMN `center_info_id` INTEGER NOT NULL,
    ADD COLUMN `contact_number` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `created_by` VARCHAR(191) NULL,
    ADD COLUMN `is_delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ivac_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `max_notification_count` INTEGER NOT NULL,
    ADD COLUMN `new_fees_applied_from` DATETIME(3) NOT NULL,
    ADD COLUMN `new_visa_fee` DOUBLE NOT NULL,
    ADD COLUMN `notification_text_beside_amount` VARCHAR(191) NULL,
    ADD COLUMN `notification_text_popup` VARCHAR(191) NULL,
    ADD COLUMN `notify_fees_from` DATETIME(3) NOT NULL,
    ADD COLUMN `old_visa_fee` DOUBLE NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    ADD COLUMN `visa_fee` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `visa_type` DROP COLUMN `isActive`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `visa_files`;

-- CreateTable
CREATE TABLE `VisaFile` (
    `id` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `appointmentFileId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisaFile` ADD CONSTRAINT `VisaFile_appointmentFileId_fkey` FOREIGN KEY (`appointmentFileId`) REFERENCES `appointment_files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_center_id_fkey` FOREIGN KEY (`center_id`) REFERENCES `center`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_ivac_id_fkey` FOREIGN KEY (`ivac_id`) REFERENCES `ivac`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_visa_type_id_fkey` FOREIGN KEY (`visa_type_id`) REFERENCES `visa_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_appointmentFileId_fkey` FOREIGN KEY (`appointmentFileId`) REFERENCES `appointment_files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
