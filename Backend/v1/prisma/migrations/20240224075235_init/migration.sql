-- CreateTable: Admin
CREATE TABLE "Admin" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT
);

-- CreateTable: Staff
CREATE TABLE "Staff" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "adminId" UUID NOT NULL,
    CONSTRAINT "Staff_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable: Visitor
CREATE TABLE "Visitor" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "ipAddress" TEXT NOT NULL,
    "visitDate" TIMESTAMP NOT NULL,
    "pageVisited" TEXT NOT NULL,
    "browserInfo" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "userId" INTEGER,
    "staffId" UUID,
    "adminId" UUID,
    "staffRelationId" TEXT,
    CONSTRAINT "Visitor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Visitor_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable: Event
CREATE TABLE "Event" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "unsignedId" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "registrationDate" TIMESTAMP NOT NULL,
    "startTime" TIMESTAMP NOT NULL,
    "endTime" TIMESTAMP NOT NULL,
    "location" TEXT NOT NULL,
    "role" TEXT,
    "capability" INTEGER,
    "speaker" TEXT,
    "moderator" TEXT,
    "registrationDeadline" TIMESTAMP NOT NULL,
    "meetingLink" TEXT,
    "type" TEXT,
    "status" TEXT NOT NULL,
    "approvedBy" TEXT,
    "approvedById" UUID,
    CONSTRAINT "Event_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable: EventRegistration
CREATE TABLE "EventRegistration" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "uniqueId" TEXT NOT NULL UNIQUE,
    "userId" UUID NOT NULL,
    "staffId" UUID,
    "eventId" UUID NOT NULL,
    "registeredAt" TIMESTAMP NOT NULL,
    "waitingList" INTEGER NOT NULL,
    "eventType" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    CONSTRAINT "EventRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventRegistration_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable: Payment
CREATE TABLE "Payment" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "staffId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "paymentDate" TIMESTAMP NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL UNIQUE,
    "paymentMethod" TEXT NOT NULL,
    CONSTRAINT "Payment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "EventRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
