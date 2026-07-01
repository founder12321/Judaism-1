-- AlterTable
ALTER TABLE "Provider" ADD COLUMN "meetingLink" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Provider" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "denomination" TEXT NOT NULL,
    "ordinationBody" TEXT,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "gender" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "specialties" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'America/New_York',
    "photoUrl" TEXT,
    "stripeAccountId" TEXT,
    "meetingLink" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Provider" ("id", "userId", "slug", "title", "bio", "denomination", "ordinationBody", "tier", "status", "gender", "languages", "specialties", "timezone", "photoUrl", "stripeAccountId", "featured", "rating", "reviewCount", "createdAt", "updatedAt") SELECT "id", "userId", "slug", "title", "bio", "denomination", "ordinationBody", "tier", "status", "gender", "languages", "specialties", "timezone", "photoUrl", "stripeAccountId", "featured", "rating", "reviewCount", "createdAt", "updatedAt" FROM "Provider";
DROP TABLE "Provider";
ALTER TABLE "new_Provider" RENAME TO "Provider";
CREATE UNIQUE INDEX "Provider_userId_key" ON "Provider"("userId");
CREATE UNIQUE INDEX "Provider_slug_key" ON "Provider"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
