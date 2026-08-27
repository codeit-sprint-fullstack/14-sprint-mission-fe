-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local',
ALTER COLUMN "encryptedPassword" DROP NOT NULL;
