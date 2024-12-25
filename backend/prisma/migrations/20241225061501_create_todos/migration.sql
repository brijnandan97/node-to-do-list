/*
  Warnings:

  - You are about to drop the column `is_completer` on the `Todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "is_completer",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;
