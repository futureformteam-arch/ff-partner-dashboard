# FutureForm Partner Dashboard (`ff-partner-dashboard`)

Partner-facing portal for completing trust assessments.

## Overview
This dashboard allows invited partners to:
- Accept assessment invitations
- Answer assessment questions
- Upload supporting evidence
- Submit completed assessments

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **API**: Core API integration
- **Icons**: Lucide React

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3001](http://localhost:3001).

## Features

### Invitation Flow
- Token-based access (no login required)
- Accept/decline invitations
- View assessment details

### Assessment Workspace
- Question-by-question navigation
- Progress tracking
- Auto-save functionality
- Multiple question types (text, number, textarea, select)

### Submission
- Review all responses
- Final confirmation
- Success notification

## Pages

- `/invite/[token]` - Invitation acceptance
- `/assessment/[id]` - Assessment workspace
- `/assessment/[id]/review` - Review & submit
- `/assessment/[id]/success` - Success confirmation
- `/declined` - Declined confirmation

## Configuration

**Environment Variables**:
- `NEXT_PUBLIC_API_URL` - Core API URL (default: http://localhost:8000)

## Integration

Partners receive an email with an invitation link:
```
https://partner.futureform.com/invite/[token]
```

The token grants access to the specific assessment without requiring authentication.
