-- CreateEnum
CREATE TYPE "PageTemplate" AS ENUM ('STANDARD', 'ABOUT', 'DEV_RITUALS');

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "template" "PageTemplate" NOT NULL DEFAULT 'STANDARD';
