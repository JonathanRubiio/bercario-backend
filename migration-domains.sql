-- Add customDomain, subdomain, and domainVerified columns to business_profile table
ALTER TABLE `business_profile` 
  ADD COLUMN IF NOT EXISTS `customDomain` VARCHAR(255) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `subdomain` VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `domainVerified` TINYINT(1) NOT NULL DEFAULT 0;

-- Add unique indexes
ALTER TABLE `business_profile` 
  ADD UNIQUE INDEX IF NOT EXISTS `IDX_business_profile_customDomain` (`customDomain`),
  ADD UNIQUE INDEX IF NOT EXISTS `IDX_business_profile_subdomain` (`subdomain`);
