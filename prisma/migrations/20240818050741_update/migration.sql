/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `access_token` LONGTEXT NULL,
    ADD COLUMN `address` VARCHAR(300) NULL,
    ADD COLUMN `avatar` VARCHAR(256) NULL,
    ADD COLUMN `avatar_original` VARCHAR(256) NULL,
    ADD COLUMN `balance` DOUBLE NOT NULL DEFAULT 0.00,
    ADD COLUMN `banned` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `city` VARCHAR(30) NULL,
    ADD COLUMN `country` VARCHAR(30) NULL,
    ADD COLUMN `created_at` TIMESTAMP(0) NULL,
    ADD COLUMN `customer_package_id` INTEGER NULL,
    ADD COLUMN `device_token` VARCHAR(255) NULL,
    ADD COLUMN `email_verified_at` TIMESTAMP(0) NULL,
    ADD COLUMN `new_email_verificiation_code` TEXT NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(20) NULL,
    ADD COLUMN `postal_code` VARCHAR(20) NULL,
    ADD COLUMN `provider` VARCHAR(255) NULL,
    ADD COLUMN `provider_id` VARCHAR(50) NULL,
    ADD COLUMN `referral_code` VARCHAR(255) NULL,
    ADD COLUMN `referred_by` INTEGER NULL,
    ADD COLUMN `refresh_token` TEXT NULL,
    ADD COLUMN `remaining_uploads` INTEGER NULL DEFAULT 0,
    ADD COLUMN `remember_token` VARCHAR(100) NULL,
    ADD COLUMN `state` VARCHAR(30) NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NULL,
    ADD COLUMN `user_type` VARCHAR(20) NOT NULL DEFAULT 'customer',
    ADD COLUMN `verification_code` TEXT NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `addons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `unique_identifier` VARCHAR(255) NULL,
    `version` VARCHAR(255) NULL,
    `activated` INTEGER NOT NULL DEFAULT 1,
    `image` VARCHAR(1000) NULL,
    `purchase_code` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `address` VARCHAR(255) NULL,
    `country_id` INTEGER NULL,
    `state_id` INTEGER NOT NULL,
    `city_id` INTEGER NULL,
    `longitude` FLOAT NULL,
    `latitude` FLOAT NULL,
    `postal_code` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `set_default` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(1000) NULL,
    `value` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `guest_id` INTEGER NULL,
    `referred_by_user` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `order_id` BIGINT NULL,
    `order_detail_id` BIGINT NULL,
    `affiliate_type` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NULL,
    `details` LONGTEXT NULL,
    `percentage` DOUBLE NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `affiliate_user_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `payment_details` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_stats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `affiliate_user_id` INTEGER NOT NULL,
    `no_of_click` INTEGER NOT NULL DEFAULT 0,
    `no_of_order_item` INTEGER NOT NULL DEFAULT 0,
    `no_of_delivered` INTEGER NOT NULL DEFAULT 0,
    `no_of_cancel` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paypal_email` VARCHAR(255) NULL,
    `bank_information` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `informations` TEXT NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0.00,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `affiliate_withdraw_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lang` VARCHAR(10) NULL,
    `lang_key` VARCHAR(255) NULL,
    `lang_value` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `attribute_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute_id` INTEGER NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `color_code` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auction_product_bids` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_categories` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blogs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `short_description` TEXT NULL,
    `description` LONGTEXT NULL,
    `banner` INTEGER NULL,
    `meta_title` VARCHAR(255) NULL,
    `meta_img` INTEGER NULL,
    `meta_description` TEXT NULL,
    `meta_keywords` TEXT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `brand_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `logo` VARCHAR(100) NULL,
    `top` INTEGER NOT NULL DEFAULT 0,
    `slug` VARCHAR(255) NULL,
    `meta_title` VARCHAR(255) NULL,
    `meta_description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(30) NOT NULL,
    `value` LONGTEXT NULL,
    `lang` VARCHAR(30) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carrier_range_prices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carrier_id` INTEGER NOT NULL,
    `carrier_range_id` INTEGER NOT NULL,
    `zone_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carrier_ranges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carrier_id` INTEGER NOT NULL,
    `billing_type` VARCHAR(20) NOT NULL,
    `delimiter1` DOUBLE NOT NULL,
    `delimiter2` DOUBLE NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carriers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `logo` INTEGER NULL,
    `transit_time` VARCHAR(255) NOT NULL,
    `free_shipping` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `temp_user_id` VARCHAR(255) NULL,
    `address_id` INTEGER NOT NULL DEFAULT 0,
    `product_id` INTEGER NULL,
    `variation` TEXT NULL,
    `price` DOUBLE NULL DEFAULT 0.00,
    `tax` DOUBLE NULL DEFAULT 0.00,
    `shipping_cost` DOUBLE NOT NULL DEFAULT 0.00,
    `shipping_type` VARCHAR(30) NOT NULL DEFAULT '',
    `pickup_point` INTEGER NULL,
    `carrier_id` INTEGER NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0.00,
    `product_referral_code` VARCHAR(255) NULL,
    `coupon_code` VARCHAR(255) NULL,
    `coupon_applied` TINYINT NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(50) NOT NULL,
    `order_level` INTEGER NOT NULL DEFAULT 0,
    `commision_rate` DOUBLE NOT NULL DEFAULT 0.00,
    `banner` VARCHAR(100) NULL,
    `icon` VARCHAR(100) NULL,
    `cover_image` VARCHAR(100) NULL,
    `featured` INTEGER NOT NULL DEFAULT 0,
    `top` INTEGER NOT NULL DEFAULT 0,
    `digital` INTEGER NOT NULL DEFAULT 0,
    `slug` VARCHAR(255) NULL,
    `meta_title` VARCHAR(255) NULL,
    `meta_description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `category_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `state_id` INTEGER NOT NULL,
    `cost` DOUBLE NOT NULL DEFAULT 0.00,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `lang` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NULL,
    `code` VARCHAR(10) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `combined_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `shipping_address` TEXT NULL,
    `grand_total` DOUBLE NOT NULL DEFAULT 0.00,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commission_histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `order_detail_id` INTEGER NOT NULL,
    `seller_id` INTEGER NOT NULL,
    `admin_commission` DOUBLE NOT NULL,
    `seller_earning` DOUBLE NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `title` VARCHAR(1000) NULL,
    `sender_viewed` INTEGER NOT NULL DEFAULT 1,
    `receiver_viewed` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(2) NOT NULL DEFAULT '',
    `name` VARCHAR(100) NOT NULL DEFAULT '',
    `zone_id` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupon_usages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `coupon_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NOT NULL,
    `discount` DOUBLE NOT NULL,
    `discount_type` VARCHAR(100) NOT NULL,
    `start_date` INTEGER NULL,
    `end_date` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `symbol` VARCHAR(255) NOT NULL,
    `exchange_rate` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `code` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_package_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `customer_package_id` INTEGER NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `payment_details` LONGTEXT NOT NULL,
    `approval` INTEGER NOT NULL,
    `offline_payment` INTEGER NOT NULL,
    `reciept` VARCHAR(150) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_package_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `customer_package_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `amount` DOUBLE NULL,
    `product_upload` INTEGER NULL,
    `logo` VARCHAR(150) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_product_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `customer_product_id` BIGINT NOT NULL,
    `name` VARCHAR(200) NULL,
    `unit` VARCHAR(20) NULL,
    `description` LONGTEXT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `published` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 0,
    `added_by` VARCHAR(50) NULL,
    `user_id` INTEGER NULL,
    `category_id` INTEGER NULL,
    `subcategory_id` INTEGER NULL,
    `subsubcategory_id` INTEGER NULL,
    `brand_id` INTEGER NULL,
    `photos` VARCHAR(255) NULL,
    `thumbnail_img` VARCHAR(150) NULL,
    `conditon` VARCHAR(50) NULL,
    `location` TEXT NULL,
    `video_provider` VARCHAR(100) NULL,
    `video_link` VARCHAR(200) NULL,
    `unit` VARCHAR(200) NULL,
    `tags` VARCHAR(255) NULL,
    `description` MEDIUMTEXT NULL,
    `unit_price` DOUBLE NULL DEFAULT 0.00,
    `meta_title` VARCHAR(200) NULL,
    `meta_description` VARCHAR(500) NULL,
    `meta_img` VARCHAR(150) NULL,
    `pdf` VARCHAR(200) NULL,
    `slug` VARCHAR(200) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `firebase_notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `text` TEXT NULL,
    `item_type` VARCHAR(255) NOT NULL,
    `item_type_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_deal_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flash_deal_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `discount` DOUBLE NULL DEFAULT 0.00,
    `discount_type` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_deal_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `flash_deal_id` BIGINT NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_deals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `start_date` INTEGER NULL,
    `end_date` INTEGER NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `featured` INTEGER NOT NULL DEFAULT 0,
    `background_color` VARCHAR(255) NULL,
    `text_color` VARCHAR(255) NULL,
    `banner` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `follow_sellers` (
    `user_id` BIGINT NOT NULL,
    `shop_id` BIGINT NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `subsubcategories` VARCHAR(1000) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(100) NOT NULL,
    `app_lang_code` VARCHAR(255) NULL DEFAULT 'en',
    `rtl` INTEGER NOT NULL DEFAULT 0,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manual_payment_methods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NULL,
    `heading` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `bank_info` TEXT NULL,
    `photo` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `measurement_points` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversation_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `message` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(191) NOT NULL,
    `batch` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model_has_permissions` (
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `model_type` VARCHAR(191) NOT NULL,
    `model_id` BIGINT UNSIGNED NOT NULL,

    INDEX `model_has_permissions_model_id_model_type_index`(`model_id`, `model_type`),
    PRIMARY KEY (`permission_id`, `model_id`, `model_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model_has_roles` (
    `role_id` BIGINT UNSIGNED NOT NULL,
    `model_type` VARCHAR(191) NOT NULL,
    `model_id` BIGINT UNSIGNED NOT NULL,

    INDEX `model_has_roles_model_id_model_type_index`(`model_id`, `model_type`),
    PRIMARY KEY (`role_id`, `model_id`, `model_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` CHAR(36) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `notifiable_type` VARCHAR(191) NOT NULL,
    `notifiable_id` BIGINT UNSIGNED NOT NULL,
    `data` TEXT NOT NULL,
    `read_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `notifications_notifiable_type_notifiable_id_index`(`notifiable_type`, `notifiable_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `seller_id` INTEGER NULL,
    `product_id` INTEGER NOT NULL,
    `variation` LONGTEXT NULL,
    `price` DOUBLE NULL,
    `tax` DOUBLE NOT NULL DEFAULT 0.00,
    `shipping_cost` DOUBLE NOT NULL DEFAULT 0.00,
    `quantity` INTEGER NULL,
    `payment_status` VARCHAR(10) NOT NULL DEFAULT 'unpaid',
    `delivery_status` VARCHAR(20) NULL DEFAULT 'pending',
    `shipping_type` VARCHAR(255) NULL,
    `pickup_point_id` INTEGER NULL,
    `product_referral_code` VARCHAR(255) NULL,
    `earn_point` DOUBLE NOT NULL DEFAULT 0.00,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `combined_order_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `guest_id` INTEGER NULL,
    `seller_id` INTEGER NULL,
    `shipping_address` LONGTEXT NULL,
    `additional_info` LONGTEXT NULL,
    `shipping_type` VARCHAR(50) NOT NULL,
    `order_from` VARCHAR(20) NOT NULL DEFAULT 'web',
    `pickup_point_id` INTEGER NOT NULL DEFAULT 0,
    `carrier_id` INTEGER NULL,
    `delivery_status` VARCHAR(20) NULL DEFAULT 'pending',
    `payment_type` VARCHAR(20) NULL,
    `manual_payment` INTEGER NOT NULL DEFAULT 0,
    `manual_payment_data` TEXT NULL,
    `payment_status` VARCHAR(20) NULL DEFAULT 'unpaid',
    `payment_details` LONGTEXT NULL,
    `grand_total` DOUBLE NULL,
    `coupon_discount` DOUBLE NOT NULL DEFAULT 0.00,
    `code` MEDIUMTEXT NULL,
    `tracking_code` VARCHAR(255) NULL,
    `date` INTEGER NOT NULL,
    `viewed` INTEGER NOT NULL DEFAULT 0,
    `delivery_viewed` INTEGER NOT NULL DEFAULT 1,
    `payment_status_viewed` INTEGER NULL DEFAULT 1,
    `commission_calculated` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `page_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(50) NOT NULL,
    `title` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `content` LONGTEXT NULL,
    `meta_title` TEXT NULL,
    `meta_description` VARCHAR(1000) NULL,
    `keywords` VARCHAR(1000) NULL,
    `meta_image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    INDEX `password_resets_email_index`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payku_payments` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `start` DATE NOT NULL,
    `end` DATE NOT NULL,
    `media` VARCHAR(191) NOT NULL,
    `transaction_key` VARCHAR(255) NULL,
    `payment_key` VARCHAR(255) NULL,
    `verification_key` VARCHAR(191) NOT NULL,
    `authorization_code` VARCHAR(191) NOT NULL,
    `last_4_digits` INTEGER UNSIGNED NULL,
    `installments` VARCHAR(191) NULL,
    `card_type` VARCHAR(191) NULL,
    `additional_parameters` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `payku_payments_transaction_id_unique`(`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payku_transactions` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL,
    `order` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NULL,
    `url` TEXT NULL,
    `amount` INTEGER UNSIGNED NULL,
    `notified_at` DATETIME(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `payku_transactions_id_unique`(`id`),
    UNIQUE INDEX `payku_transactions_order_unique`(`order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seller_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0.00,
    `payment_details` LONGTEXT NULL,
    `payment_method` VARCHAR(255) NULL,
    `txn_code` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `section` VARCHAR(50) NULL,
    `guard_name` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_access_tokens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tokenable_type` VARCHAR(191) NOT NULL,
    `tokenable_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `abilities` TEXT NULL,
    `last_used_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `personal_access_tokens_token_unique`(`token`),
    INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pickup_point_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pickup_point_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` TEXT NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pickup_points` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `staff_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` MEDIUMTEXT NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `pick_up_status` INTEGER NULL,
    `cash_on_pickup_status` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_categories` (
    `product_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_queries` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `seller_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `question` LONGTEXT NOT NULL,
    `reply` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_stocks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `variant` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(255) NULL,
    `price` DOUBLE NOT NULL DEFAULT 0.00,
    `qty` INTEGER NOT NULL DEFAULT 0,
    `image` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_taxes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `tax_id` INTEGER NOT NULL,
    `tax` DOUBLE NOT NULL,
    `tax_type` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_id` BIGINT NOT NULL,
    `name` VARCHAR(200) NULL,
    `unit` VARCHAR(20) NULL,
    `description` LONGTEXT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `added_by` VARCHAR(6) NOT NULL DEFAULT 'admin',
    `user_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `brand_id` INTEGER NULL,
    `photos` VARCHAR(2000) NULL,
    `thumbnail_img` VARCHAR(100) NULL,
    `video_provider` VARCHAR(20) NULL,
    `video_link` VARCHAR(100) NULL,
    `tags` VARCHAR(500) NULL,
    `description` LONGTEXT NULL,
    `unit_price` DOUBLE NOT NULL,
    `purchase_price` DOUBLE NULL,
    `variant_product` INTEGER NOT NULL DEFAULT 0,
    `attributes` VARCHAR(1000) NOT NULL DEFAULT '[]',
    `choice_options` MEDIUMTEXT NULL,
    `colors` MEDIUMTEXT NULL,
    `variations` TEXT NULL,
    `todays_deal` INTEGER NOT NULL DEFAULT 0,
    `published` INTEGER NOT NULL DEFAULT 1,
    `approved` BOOLEAN NOT NULL DEFAULT true,
    `stock_visibility_state` VARCHAR(10) NOT NULL DEFAULT 'quantity',
    `cash_on_delivery` BOOLEAN NOT NULL DEFAULT false,
    `featured` INTEGER NOT NULL DEFAULT 0,
    `seller_featured` INTEGER NOT NULL DEFAULT 0,
    `current_stock` INTEGER NOT NULL DEFAULT 0,
    `unit` VARCHAR(20) NULL,
    `weight` DOUBLE NOT NULL DEFAULT 0.00,
    `min_qty` INTEGER NOT NULL DEFAULT 1,
    `low_stock_quantity` INTEGER NULL,
    `discount` DOUBLE NULL,
    `discount_type` VARCHAR(10) NULL,
    `discount_start_date` INTEGER NULL,
    `discount_end_date` INTEGER NULL,
    `starting_bid` DOUBLE NULL DEFAULT 0.00,
    `auction_start_date` INTEGER NULL,
    `auction_end_date` INTEGER NULL,
    `tax` DOUBLE NULL,
    `tax_type` VARCHAR(10) NULL,
    `shipping_type` VARCHAR(20) NULL DEFAULT 'flat_rate',
    `shipping_cost` DOUBLE NOT NULL DEFAULT 0.00,
    `is_quantity_multiplied` BOOLEAN NOT NULL DEFAULT false,
    `est_shipping_days` INTEGER NULL,
    `num_of_sale` INTEGER NOT NULL DEFAULT 0,
    `meta_title` MEDIUMTEXT NULL,
    `meta_description` LONGTEXT NULL,
    `meta_img` VARCHAR(255) NULL,
    `pdf` VARCHAR(255) NULL,
    `slug` MEDIUMTEXT NOT NULL,
    `refundable` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0.00,
    `barcode` VARCHAR(255) NULL,
    `digital` INTEGER NOT NULL DEFAULT 0,
    `auction_product` INTEGER NOT NULL DEFAULT 0,
    `file_name` VARCHAR(255) NULL,
    `file_path` VARCHAR(255) NULL,
    `external_link` VARCHAR(500) NULL,
    `external_link_btn` VARCHAR(255) NULL DEFAULT 'Buy Now',
    `wholesale_product` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `created_at`(`created_at`),
    INDEX `name`(`name`),
    INDEX `tags`(`tags`(255)),
    INDEX `unit_price`(`unit_price`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proxypay_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_type` VARCHAR(20) NOT NULL,
    `reference_id` VARCHAR(20) NOT NULL,
    `order_id` INTEGER NULL,
    `package_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0.00,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refund_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `order_detail_id` INTEGER NOT NULL,
    `seller_id` INTEGER NOT NULL,
    `seller_approval` INTEGER NOT NULL DEFAULT 0,
    `admin_approval` INTEGER NOT NULL DEFAULT 0,
    `refund_amount` DOUBLE NOT NULL DEFAULT 0.00,
    `reason` LONGTEXT NULL,
    `admin_seen` INTEGER NOT NULL,
    `refund_status` INTEGER NOT NULL DEFAULT 0,
    `reject_reason` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 0,
    `comment` MEDIUMTEXT NOT NULL,
    `photos` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `viewed` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_has_permissions` (
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,

    INDEX `role_has_permissions_role_id_foreign`(`role_id`),
    PRIMARY KEY (`permission_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_translations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `role_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `lang` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `guard_name` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `roles_name_guard_name_unique`(`name`, `guard_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `searches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `query` VARCHAR(1000) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seller_withdraw_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `amount` DOUBLE NULL,
    `message` LONGTEXT NULL,
    `status` INTEGER NULL,
    `viewed` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sellers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0.00,
    `num_of_reviews` INTEGER NOT NULL DEFAULT 0,
    `num_of_sale` INTEGER NOT NULL DEFAULT 0,
    `verification_status` INTEGER NOT NULL DEFAULT 0,
    `verification_info` LONGTEXT NULL,
    `cash_on_delivery_status` INTEGER NOT NULL DEFAULT 0,
    `admin_to_pay` DOUBLE NOT NULL DEFAULT 0.00,
    `bank_name` VARCHAR(255) NULL,
    `bank_acc_name` VARCHAR(200) NULL,
    `bank_acc_no` VARCHAR(50) NULL,
    `bank_routing_no` INTEGER NULL,
    `bank_payment_status` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(200) NULL,
    `logo` VARCHAR(255) NULL,
    `sliders` LONGTEXT NULL,
    `top_banner` VARCHAR(191) NULL,
    `banner_full_width_1` VARCHAR(191) NULL,
    `banners_half_width` VARCHAR(191) NULL,
    `banner_full_width_2` VARCHAR(191) NULL,
    `phone` VARCHAR(255) NULL,
    `address` VARCHAR(500) NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0.00,
    `num_of_reviews` INTEGER NOT NULL DEFAULT 0,
    `num_of_sale` INTEGER NOT NULL DEFAULT 0,
    `seller_package_id` INTEGER NULL,
    `product_upload_limit` INTEGER NOT NULL DEFAULT 0,
    `package_invalid_at` DATE NULL,
    `verification_status` INTEGER NOT NULL DEFAULT 0,
    `verification_info` LONGTEXT NULL,
    `cash_on_delivery_status` INTEGER NOT NULL DEFAULT 0,
    `admin_to_pay` DOUBLE NOT NULL DEFAULT 0.00,
    `facebook` VARCHAR(255) NULL,
    `instagram` VARCHAR(255) NULL,
    `google` VARCHAR(255) NULL,
    `twitter` VARCHAR(255) NULL,
    `youtube` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `meta_title` VARCHAR(255) NULL,
    `meta_description` TEXT NULL,
    `pick_up_point_id` TEXT NULL,
    `shipping_cost` DOUBLE NOT NULL DEFAULT 0.00,
    `delivery_pickup_latitude` FLOAT NULL,
    `delivery_pickup_longitude` FLOAT NULL,
    `bank_name` VARCHAR(255) NULL,
    `bank_acc_name` VARCHAR(200) NULL,
    `bank_acc_no` VARCHAR(50) NULL,
    `bank_routing_no` INTEGER NULL,
    `bank_payment_status` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `size_chart_details` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `size_chart_id` INTEGER NOT NULL,
    `measurement_point_id` INTEGER NOT NULL,
    `attribute_value_id` INTEGER NOT NULL,
    `inch_value` VARCHAR(191) NULL,
    `cen_value` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `size_charts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `fit_type` VARCHAR(191) NULL,
    `stretch_type` VARCHAR(191) NULL,
    `photos` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `measurement_points` VARCHAR(255) NOT NULL,
    `size_options` VARCHAR(255) NOT NULL,
    `measurement_option` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `category_id`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `states` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `country_id` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `tax_status` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_replies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `reply` LONGTEXT NOT NULL,
    `files` LONGTEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tickets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` BIGINT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `details` LONGTEXT NULL,
    `files` LONGTEXT NULL,
    `status` VARCHAR(10) NOT NULL DEFAULT 'pending',
    `viewed` INTEGER NOT NULL DEFAULT 0,
    `client_viewed` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `gateway` VARCHAR(255) NULL,
    `payment_type` VARCHAR(255) NULL,
    `additional_content` TEXT NULL,
    `mpesa_request` VARCHAR(255) NULL,
    `mpesa_receipt` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lang` VARCHAR(10) NULL,
    `lang_key` TEXT NULL,
    `lang_value` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uploads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_original_name` VARCHAR(255) NULL,
    `file_name` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,
    `file_size` INTEGER NULL,
    `extension` VARCHAR(10) NULL,
    `type` VARCHAR(15) NULL,
    `external_link` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_coupons` (
    `user_id` INTEGER NOT NULL,
    `coupon_id` INTEGER NOT NULL,
    `coupon_code` VARCHAR(255) NOT NULL,
    `min_buy` DOUBLE NOT NULL,
    `validation_days` INTEGER NOT NULL,
    `discount` DOUBLE NOT NULL,
    `discount_type` VARCHAR(20) NOT NULL,
    `expiry_date` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `payment_method` VARCHAR(255) NULL,
    `payment_details` LONGTEXT NULL,
    `approval` INTEGER NOT NULL DEFAULT 0,
    `offline_payment` INTEGER NOT NULL DEFAULT 0,
    `reciept` VARCHAR(150) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wholesale_prices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_stock_id` INTEGER NOT NULL,
    `min_qty` INTEGER NOT NULL DEFAULT 0,
    `max_qty` INTEGER NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL DEFAULT 0.00,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `model_has_permissions` ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `model_has_roles` ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `payku_payments` ADD CONSTRAINT `payku_payments_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `payku_transactions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- RedefineIndex
CREATE UNIQUE INDEX `users_email_unique` ON `user`(`email`);
DROP INDEX `User_email_key` ON `user`;
