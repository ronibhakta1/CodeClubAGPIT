-- Create Visitor table
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- Create unique index
CREATE UNIQUE INDEX "Visitor_page_key" ON "Visitor"("page");

-- Create update trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_visitor_updated_at
BEFORE UPDATE ON "Visitor"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();