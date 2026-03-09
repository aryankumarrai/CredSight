# CredSight - AI-Assisted Credit Appraisal Platform

CredSight is a professional, enterprise-grade AI-assisted credit appraisal platform designed to streamline financial document processing, due diligence, and automated credit recommendations for credit officers.

## Core Features

- **Financial Document Ingestion**: Securely upload and process complex documents (GST filings, ITRs, bank statements) using Vision Language Models (VLM).
- **AI-Driven Risk Assessment**: Real-time risk scoring that dynamically adjusts based on officer observations and external intelligence.
- **External Intelligence Integration**: Automated crawling of news and legal portals (e.g., e-Courts) to identify potential legal and sector risks.
- **Officer Workspace**: A centralized hub for active due diligence, primary research notes, and live intelligence feeds.
- **Automated Credit Appraisal Memo (CAM)**: Generation of "Five Cs of Credit" assessments and professional exportable PDF reports.
- **Security & Privacy**: Integrated PII (Personally Identifiable Information) redaction to ensure data sensitivity and compliance.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI, Lucide Icons.
- **Backend**: Node.js, Express.
- **Database**: PostgreSQL with Drizzle ORM.
- **State Management**: TanStack Query (React Query) for efficient data fetching and caching.
- **Routing**: Wouter for lightweight frontend routing.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Database Setup**:
    Ensure your PostgreSQL database is configured. The application uses Drizzle ORM for schema management.

3.  **Run the Application**:
    ```bash
    npm run dev
    ```

## Project Structure

- `client/src/pages/`: Contains the main application views (Ingestion, Workspace, Output).
- `client/src/components/`: Reusable UI components and layout structures.
- `server/`: Express backend logic and storage interfaces.
- `shared/`: Shared schemas and types between frontend and backend.

## License

Enterprise Proprietary - All Rights Reserved.
