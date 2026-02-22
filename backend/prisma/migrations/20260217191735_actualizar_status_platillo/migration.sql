-- AlterTable
ALTER TABLE `auth` MODIFY `rol` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `platillo` MODIFY `status` INTEGER NOT NULL DEFAULT 1;
