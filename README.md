# videoFlow

## Overview

This project is an AI-powered learning tool designed to help students learn more effectively from YouTube videos and lectures. It provides an interactive experience that enhances note-taking, comprehension, and retention by leveraging artificial intelligence.

## Try it out

You can try it out at [videoFlow](https://videoflow.onrender.com).

## Key Features

- **Watch YouTube Videos & Take Notes:**

  - Watch YouTube videos directly in the app and take notes that are automatically linked to video timestamps for easy reference.

- **Clean Video Transcript:**

  - View a clean, searchable transcript of the video to quickly find and review important information.

- **AI-Generated Table of Contents:**

  - The AI automatically creates a structured table of contents for each video, making navigation simple and efficient.

- **Quiz Questions & Flashcards:**

  - The AI generates quiz questions and flashcards based on the video content to help reinforce learning and test your understanding.

- **Personalized Experience:**
  - Sign in with your email to save your videos and notes. Your learning materials are always accessible and securely stored.

## Who Is This For?

- Students looking to get more out of online lectures and educational videos
- Lifelong learners who want to organize and retain knowledge from YouTube
- Anyone seeking to make their video learning more interactive and effective

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm (package manager)
- Gemini API key
- Stytch API key
- MongoDB URI

### Why pnpm?

pnpm is a fast, disk space efficient, and secure package manager that provides a more efficient way to manage dependencies in a monorepo. It uses a single global store for all dependencies, which reduces the amount of disk space used and speeds up the installation process. pnpm also provides features like deduplication and zero-installs, which can improve the performance of your development workflow.

Also, this project uses pnpm workspace, which allows you to manage dependencies across multiple packages in a monorepo. for more information, check the [pnpm workspace documentation](https://pnpm.io/workspaces).

### Environment Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   - Create `.env` and `.env.docker` files in `/apps/backend` :

     ```
     BACKEND_PORT= (number of the port to use, this is optional, by default 4000)
     STYTCH_PROJECT_ID= (your stytch project id)
     STYTCH_SECRET= (your stytch secret)
     DB_URL= (URL of the database)
     TOKEN_KEY= (your token)
     GEMINI_API_KEY= (your gemini api key)
     NEXT_PUBLIC_API_URL= (URL of the API)
     ```

### Running the Application

- Start both applications:

  ```bash
  pnpm run dev
  ```

- Start backend:

  ```bash
  pnpm run dev:backend
  ```

- Start frontend:

  ```bash
  pnpm run dev:frontend
  ```

### Linter, formatter, and type checker

This project uses biome for linting and formatting.

- To **fix** fixable errors and **show details** of not fixable errors you can use:

  - Check (format and lint):

    ```bash
    pnpm run check
    ```

  - Format:

    ```bash
    pnpm run format
    ```

  - Lint:

    ```bash
    pnpm run lint
    ```

- To **show details** of errors you can use:

  - Check (format and lint):

    ```bash
    pnpm run check:detailed
    ```

  - Lint:

    ```bash
    pnpm run lint:detailed
    ```

  - Format:

    ```bash
    pnpm run format:detailed
    ```

- To run biome on the frontend or the backend add `:backend` or `:frontend` to the command:

  ```bash
  pnpm run check:detailed:backend
  pnpm run lint:frontend
  ```
