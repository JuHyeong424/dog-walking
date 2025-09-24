-- CreateTable
CREATE TABLE "public"."Walk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "distance" INTEGER NOT NULL,
    "walkTime" INTEGER NOT NULL,
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "Walk_pkey" PRIMARY KEY ("id")
);
