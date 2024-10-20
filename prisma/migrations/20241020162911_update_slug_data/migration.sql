-- AlterTable
ALTER TABLE `services_slug` ADD COLUMN `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `services_slug` ADD CONSTRAINT `services_slug_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
