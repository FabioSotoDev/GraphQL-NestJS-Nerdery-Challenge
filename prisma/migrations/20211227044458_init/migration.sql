/*
  Warnings:

  - You are about to alter the column `price` on the `books` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2);
