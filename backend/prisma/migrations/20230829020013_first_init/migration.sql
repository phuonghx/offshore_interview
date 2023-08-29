/*
  Warnings:

  - You are about to drop the column `content` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `detail` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL
);
INSERT INTO "new_Todo" ("id", "status") SELECT "id", "status" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
