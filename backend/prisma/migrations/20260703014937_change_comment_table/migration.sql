-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('ARTICLE_COMMENT', 'PRODUCT_COMMENT');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentType" "CommentType" NOT NULL DEFAULT 'ARTICLE_COMMENT',
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
