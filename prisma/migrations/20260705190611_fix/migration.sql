/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArticleToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToTags" DROP CONSTRAINT "_ArticleToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTags" DROP CONSTRAINT "_ArticleToTags_B_fkey";

-- AlterTable
ALTER TABLE "Tags" ADD COLUMN     "articles" TEXT[];

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "_ArticleToTags";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
