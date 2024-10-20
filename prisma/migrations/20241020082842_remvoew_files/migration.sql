/*
  Warnings:

  - You are about to drop the column `client` on the `visafile` table. All the data in the column will be lost.
  - You are about to drop the `amount_change_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointment_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `center` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ivac` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visa_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appointmentFile` to the `VisaFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `VisaFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_amountChangeDataId_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_appointmentFileId_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_center_id_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_ivac_id_fkey`;

-- DropForeignKey
ALTER TABLE `info` DROP FOREIGN KEY `info_visa_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `visafile` DROP FOREIGN KEY `VisaFile_appointmentFileId_fkey`;

-- AlterTable
ALTER TABLE `visafile` DROP COLUMN `client`,
    ADD COLUMN `appointmentFile` JSON NOT NULL,
    ADD COLUMN `clientId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `amount_change_data`;

-- DropTable
DROP TABLE `appointment_files`;

-- DropTable
DROP TABLE `center`;

-- DropTable
DROP TABLE `info`;

-- DropTable
DROP TABLE `ivac`;

-- DropTable
DROP TABLE `visa_type`;

-- AddForeignKey
ALTER TABLE `VisaFile` ADD CONSTRAINT `VisaFile_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
