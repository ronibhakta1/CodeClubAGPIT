# Code Club AGPIT

## Description
Code Club AGPIT is a dynamic platform dedicated to the coding club of our college. It is designed to foster a strong coding community by providing a centralized space for club members to collaborate, manage events, and share knowledge. The platform aims to promote coding culture, improve technical skills, and create a supportive learning environment for students of all levels.

## Features
- **Club Member Management:**
   - Displays profiles of all club members, including their roles and skills.
   - Provides contact information for easier collaboration.
- **Event Management:**
   - Showcases upcoming coding events, hackathons, and workshops.
   - Provides detailed event information including dates, topics, and guest speakers.
- **Resource Sharing:**
   - Hosts coding challenges, project ideas, and study materials to support learning.
- **Real-Time Updates:**
   - Integrates with Cloudflare for enhanced performance and real-time content delivery.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Zod
- **Backend:** Express.js, Node.js
- **Database:** MongoDB, PostgreSQL, Prisma ORM
- **Deployment:** Cloudflare, Vercel

## Installation
To set up the project locally, follow these steps:

1. **Fork the Repository**
   - Go to the repository's GitHub page.
   - Click the **Fork** button in the top-right corner.

2. **Open the Project in GitHub Desktop**
   - Click the **Code** button on the forked repository page.
   - Select **Open with GitHub Desktop**.
   - In GitHub Desktop, click **Clone** to download the repository.

3. **Open the Project in Visual Studio Code**
   - In GitHub Desktop, click the **Open in Visual Studio Code** button to launch the project directly.

4. **Install Dependencies**
   - Open the **Terminal** in Visual Studio Code by clicking **Terminal → New Terminal**.
   - Change the working directory to the `frontend` folder by running:
     ```bash
     cd frontend
     ```
   - Install the required Node.js dependencies by running:
     ```bash
     npm install
     ```

5. **Run the Frontend**
   - Start the development server with the following command:
     ```bash
     npm run dev
     ```
   - The terminal will display a **local development URL** (e.g., `http://localhost:3000`).
   - **CTRL + Click** on the displayed link to open the website in your browser.

6. **Access the Hosted Website**
   - Click on the provided **host link** (replace `'url'` with the appropriate link) to access the deployed website.

7. **Add Remote URL**
   - Open your terminal in Visual Studio Code.
   - Run this command to add the upstream URL:
     ```bash
     git remote add upstream <original-repository-link>
     ```

8. **Verify Remote URLs**
   To ensure everything is configured correctly, run:
   ```bash
   git remote -v
   ```
   This should display both the `origin` and `upstream` URLs.

## Environment Setup

1. Copy `.env.example` to `.env`:
```sh
cp Backend/v1/.env.example Backend/v1/.env
```

2. Fill in your environment variables in `.env`:
- `DATABASE_URL`: Your Prisma database URL
- `DIRECT_URL`: Your Prisma direct connection URL

3. Never commit `.env` files or files containing secrets!

## Contribution Guidelines
- Fork the repository before contributing.
- Follow proper coding standards and conventions.
- Submit pull requests with clear descriptions of the changes made.
- Engage in discussions on issues before making significant changes.

## Contact
For queries, contributions, or support, feel free to reach out via GitHub or through our college's official channels. We welcome all enthusiasts to join and contribute to the club's growth.

## Liscense 
 MIT

---
