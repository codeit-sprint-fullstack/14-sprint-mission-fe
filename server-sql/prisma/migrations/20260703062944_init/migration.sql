/*
  Warnings:

  - A unique constraint covering the columns `[tagName]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagName_key" ON "Tag"("tagName");
