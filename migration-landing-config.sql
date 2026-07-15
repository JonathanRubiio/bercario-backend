-- Add landing page config columns to business_profile table
ALTER TABLE `business_profile` ADD COLUMN IF NOT EXISTS `landingConfig` JSON DEFAULT NULL;
ALTER TABLE `business_profile` ADD COLUMN IF NOT EXISTS `templateId` VARCHAR(255) DEFAULT NULL;
ALTER TABLE `business_profile` ADD COLUMN IF NOT EXISTS `globalStyles` JSON DEFAULT NULL;
ALTER TABLE `business_profile` ADD COLUMN IF NOT EXISTS `niche` VARCHAR(255) DEFAULT 'Servicios Profesionales';
