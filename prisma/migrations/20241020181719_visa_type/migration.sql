/*
  Warnings:

  - You are about to drop the column `clientId` on the `services_slug` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `services_slug` DROP FOREIGN KEY `services_slug_clientId_fkey`;

-- AlterTable
ALTER TABLE `services_slug` DROP COLUMN `clientId`,
    ADD COLUMN `visa` INTEGER NULL;
