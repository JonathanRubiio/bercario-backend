CREATE TABLE IF NOT EXISTS `membership_package` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `maxCatalogImages` INT NOT NULL DEFAULT 5,
  `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `membership_package` (`id`, `name`, `maxCatalogImages`) 
VALUES ('de305d54-75b4-431b-adb2-eb6b9e546014', 'Free', 5)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `maxCatalogImages`=VALUES(`maxCatalogImages`);

-- Add column to user table
ALTER TABLE `user` ADD COLUMN IF NOT EXISTS `membershipPackageId` VARCHAR(36) DEFAULT 'de305d54-75b4-431b-adb2-eb6b9e546014';

-- Ensure all current users have the Free package assigned
UPDATE `user` SET `membershipPackageId` = 'de305d54-75b4-431b-adb2-eb6b9e546014' WHERE `membershipPackageId` IS NULL OR `membershipPackageId` = '';
