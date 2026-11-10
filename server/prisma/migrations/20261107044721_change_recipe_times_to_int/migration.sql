/*
  Warnings:

  - Changed the type of `prepTime` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bakeTime` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- Convert prepTime from text to integer minutes
ALTER TABLE "Recipe"
ALTER COLUMN "prepTime" TYPE INTEGER
USING (
  CASE "prepTime"
    WHEN '12–18 hours' THEN 900
    WHEN '8–12 hours' THEN 600
    ELSE "prepTime"::INTEGER
  END
);

-- Convert bakeTime from text to integer minutes
ALTER TABLE "Recipe"
ALTER COLUMN "bakeTime" TYPE INTEGER
USING (
  CASE "bakeTime"
    WHEN '25–30 minutes' THEN 30
    WHEN '45 minutes' THEN 45
    ELSE "bakeTime"::INTEGER
  END
);