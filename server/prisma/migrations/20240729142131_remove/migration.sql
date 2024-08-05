/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "payee" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "accountId" INTEGER,
    "categoryId" INTEGER,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "categoryId", "date", "id", "notes", "payee", "userId") SELECT "accountId", "amount", "categoryId", "date", "id", "notes", "payee", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
