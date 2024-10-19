/*
  Warnings:

  - You are about to drop the column `typeName` on the `visa_type` table. All the data in the column will be lost.
  - Added the required column `type_name` to the `visa_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `visa_type` DROP COLUMN `typeName`,
    ADD COLUMN `type_name` VARCHAR(191) NOT NULL;
