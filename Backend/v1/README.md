# Code Club AGPIT Backend v1

This directory contains the backend server for Code Club AGPIT built with Hono and Prisma.

## Setup Instructions

### Installation

```bash
# Navigate to the v1 directory
cd Backend/v1

# Install dependencies
npm i
```

### Running the Development Server

```bash
# Start the development server
npm run dev
```

## Prisma Setup

We've created an initial schema.prisma file and a .env file with your DATABASE_URL environment variable already set.

### Next Steps for Prisma

1. **Define your database schema**
   
   Open the `schema.prisma` file and define your models. Check the [documentation](https://pris.ly/ppg-init) if you need inspiration.

2. **Apply migrations**
   
   Run the following command to create and apply a migration:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Manage your data**
   
   View and edit your data locally by running:
   ```bash
   npx prisma studio
   ```
   
   ...or online in [Prisma Console](https://console.prisma.io/cm9k0jqpd01hrf153wctovguz/cm9k0kcn401htf153xq5bjy0s/cm9k0kcn501huf153v3dbuwfr/studio)

4. **Send queries from your app**
   
   To access your database from a JavaScript/TypeScript app, you need to use Prisma ORM. 
   Visit [the documentation](https://pris.ly/ppg-init) for step-by-step instructions.

