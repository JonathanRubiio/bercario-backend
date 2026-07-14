-- Add landingConfig JSON column to business_profile table
ALTER TABLE `business_profile` ADD COLUMN IF NOT EXISTS `landingConfig` JSON DEFAULT NULL;
