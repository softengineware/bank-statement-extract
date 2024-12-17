# Bank Statement Extractor

A unified solution for extracting, analyzing, and storing data from various bank statements at scale.
Combine OCR engines, LLMs, and vector databases to streamline data analysis and retrieval.

## Quick Start

### Prerequisites:
* Python 3.8+
* Node.js 18+
* (Optional) Docker for containerization
* Supabase account & project credentials
* Airtable account & API key
* Pinecone account & API key

### Backend (FastAPI) Setup:
1. cd backend/
2. Create and activate a Python virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend:
```bash
uvicorn app.main:app --reload --port 8001
```

### Frontend (Next.js) Setup:
1. cd frontend/
2. Install dependencies:
```bash
npm install
```

3. Create frontend/.env.local:
```env
NEXT_PUBLIC_AIRTABLE_API_KEY=your_key_here
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id
NEXT_PUBLIC_AIRTABLE_TABLE_NAME=Table 1

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_PINECONE_API_KEY=your_pinecone_api_key
NEXT_PUBLIC_PINECONE_ENVIRONMENT=your_pinecone_env
NEXT_PUBLIC_PINECONE_INDEX=your_pinecone_index
```

4. Start the development server:
```bash
npm start
```

At this point:
* Backend runs on http://localhost:8001
* Frontend runs on http://localhost:3000

Upload a single statement, multiple files (bulk folder upload), or provide a shared folder link (Google Drive, OneDrive, etc.) for batch processing.

## Key Features
* Multi-Format Support: PDF, XLS/XLSX, CSV, TXT, and images.
* OCR & NLP Integration: Amazon Textract, Google Document AI, ChatGPT, and Claude 3.5 Sonnet.
* Redundancy & Accuracy: Use ensemble logic across OCR and LLMs.
* Data Storage:
  * Supabase for chat history, application logs, and structured data.
  * Airtable for curated final outputs.
* Vector Embeddings & Search:
  * Push processed data to Pinecone after normalization.
  * Upsert combined metadata from Airtable and Supabase into Pinecone for semantic LLM queries.
* Scalable Architecture:
  * FastAPI backend for asynchronous tasks.
  * Next.js frontend for a user-friendly interface.
* Bulk Input Options:
  * Upload folders containing hundreds of files.
  * Paste a link to a shared folder (e.g., Google Drive, OneDrive) for batch processing and crawling.

## Detailed Setup & Configuration

### Environment Variables

#### Frontend:
Create frontend/.env.local:
```env
NEXT_PUBLIC_AIRTABLE_API_KEY=your_airtable_key
NEXT_PUBLIC_AIRTABLE_BASE_ID=your_airtable_base_id
NEXT_PUBLIC_AIRTABLE_TABLE_NAME=Table 1

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_PINECONE_API_KEY=your_pinecone_api_key
NEXT_PUBLIC_PINECONE_ENVIRONMENT=your_pinecone_env
NEXT_PUBLIC_PINECONE_INDEX=your_pinecone_index
```

#### Backend & Additional Services:
* Configure backend/.env for backend services, including Supabase service roles, Pinecone keys, and any other sensitive credentials:
```env
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_URL=your_supabase_url

PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_env
PINECONE_INDEX=your_pinecone_index
```

* Adjust database credentials, Airtable keys, and OCR/LLM API keys as needed.

### Optional Docker Setup
* Future enhancements may include docker-compose files.
* For now, run backend and frontend as described above.

## Usage Workflow
1. File Input Options:
   * Single File Upload: Choose a single file from local storage.
   * Bulk Folder Upload: Drag and drop or select an entire folder with hundreds of statements.
   * Shared Folder Link: Paste a link to a Google Drive, OneDrive, or another shared folder. The system will crawl and process all supported files.
2. Data Extraction & Analysis:
   * OCR with Textract & Document AI.
   * NLP refinement with ChatGPT and Claude 3.5 Sonnet.
   * Normalization and validation of dates, amounts, and metadata.
3. Storage & Indexing:
   * Supabase: Store chat history (LLM interactions), raw extraction logs, and preliminary structured data.
   * Airtable: Store curated, final transaction data.
   * Pinecone: Embed finalized text snippets, metadata, and transaction summaries for semantic search and LLM-driven queries.
4. View & Interact:
   * From the frontend UI, inspect extracted transactions, metadata, and logs.
   * Perform semantic searches against Pinecone to quickly find transactions or patterns.
5. Upsert & Embedding Process:
   * After final validation, data is pushed to Airtable.
   * A merged dataset from Airtable and Supabase (including chat/context data) is embedded into Pinecone.
   * Use these embeddings for downstream LLM queries (e.g., "Find all transactions from January that match this pattern.")

## Current Status (as of Dec 17, 2024)

### Completed:
* FastAPI + Next.js scaffolding
* File upload (single and multiple)
* Basic Airtable and Supabase integration
* Pinecone environment set up
* OCR and NLP pipeline skeleton
* Folder upload & link-based fetching skeleton

### Next Steps:
1. Complete database integration testing with Supabase for chat history.
2. Implement automated crawling for shared folder links.
3. Improve error handling, data validation, and user authentication.
4. Enhance transaction categorization and export formats.
5. Add comprehensive unit and integration tests.

## Architecture Overview
* Backend: FastAPI for orchestrating OCR, NLP, and ETL logic.
* Frontend: Next.js + Chakra UI for user-friendly interactions.
* Databases:
  * Supabase (Postgres): For logs, chat history, structured intermediate data.
  * Airtable: For curated, finalized financial transaction records.
  * Vector Database: Pinecone for embedding representations of text data for LLM-based queries.
* OCR & NLP:
  * OCR: Amazon Textract & Google Document AI.
  * NLP: ChatGPT & Claude 3.5 Sonnet for data refinement and redundancy checks.
  * Document Processing: PDF parsing (pdfminer-six), flexible parsing templates, and Hugging Face Document AI transformers.

## Supported Bank Statement Formats
* PDF: Large variety (Wells Fargo, Chase, Bank of America, HSBC, etc.)
* Spreadsheets: XLS, XLSX, CSV, TXT with standard transaction columns.
* Images: JPG, PNG, TIFF, GIF processed via OCR.

### Customizable Mappings:
Use regex and positional rules per bank or provide a UI/admin panel for quick adaptation to new statement formats.

## Data Handling & Formats

### Normalization & Validation:
* Standardize dates, amounts, and descriptions.
* Validate data against known schemas and patterns.

### Internal JSON Schema (Pre-Export):
```json
{
  "metadata": {
    "bank_name": "string",
    "account_holder": "string",
    "account_number": "string",
    "account_type": "string",
    "statement_start_date": "YYYY-MM-DD",
    "statement_end_date": "YYYY-MM-DD",
    "currency": "string",
    "processing_timestamp": "YYYY-MM-DDThh:mm:ssZ",
    "confidence_scores": {
      "ocr": { "textract": 0.0, "docai": 0.0 },
      "nlp": { "chatgpt": 0.0, "claude_sonnet": 0.0 }
    },
    "audit_id": "string"
  },
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": "string",
      "amount": 0.0,
      "category": "string",
      "notes": "string",
      "confidence": 0.0
    }
  ]
}
```

### Airtable & Supabase Integration:
* Supabase: Store raw logs, chat exchanges, intermediate JSON outputs.
* Airtable: Store the final cleaned and validated data for easy access and manual editing.
* After final confirmation, push a combined dataset (metadata + chat context) into Pinecone as embeddings.

## Vector Embeddings & Pinecone Integration
* Combine relevant metadata (from Airtable) and contextual data (from Supabase logs/chat) into a single text corpus.
* Generate embeddings and upsert into Pinecone.
* Enable LLM-driven semantic queries (e.g., "Show all transactions with suspicious patterns in Q1 2024").

## Redundancy & Accuracy Strategy
* OCR Redundancy: Compare Textract and Document AI outputs.
* NLP Arbitration:
  * Use ChatGPT and Claude 3.5 Sonnet to resolve discrepancies.
  * If unresolved, flag for manual review.

### Validation Layer:
* Check data formats (dates, amounts), known bank patterns, and expected fields.
* Transactions failing validation are stored in Supabase as "Needs Review" before they reach Airtable and Pinecone.

## Bulk Processing & Shared Folder Support
1. Folder Upload: Drag and drop a folder with hundreds of statements. The system queues them for asynchronous processing.
2. Shared Folder Link: Paste a link (Google Drive, OneDrive, etc.). The system fetches file listings, downloads them, and processes each file similarly to a local upload.

### Performance & Scaling:
* Asynchronous task queues (e.g., Celery or FastAPI background tasks).
* Real-time progress updates via WebSockets or polling.

## Monitoring, Logging & Auditing
* Logs and chat history stored in Supabase for full audit trails.
* Detailed logging at each step: upload → OCR → NLP → Pinecone embed.
* Audit IDs track documents end-to-end.

## Testing & QA
* Unit Tests: For parsing logic and validation functions.
* Integration Tests: For full pipeline (upload → extract → store → embed).
* End-to-End Tests: Bulk uploads, shared folder ingestion, and LLM-based querying tests.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit and push changes
4. Submit a Pull Request for review

Get started today:
* Upload a single statement or a batch of files from a folder or a shared link.
* Leverage OCR + NLP for maximum accuracy.
* Store, view, and query your data at scale with Supabase, Airtable, and Pinecone.
