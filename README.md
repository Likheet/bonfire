# Bonfire! A Full-Stack Discord Clone
## Overview

Bonfire is a full-featured Discord clone built with modern web technologies. It allows users to create servers, communicate via text, audio, and video channels, and manage user permissions with roles such as admin, moderator, and guest. The app also supports real-time messaging, file sharing, and video calls, making it a robust platform for online communities.

## Features

- **Server Management**: Users can create and manage their own servers, invite others to join, and organize communication through different channels.
- **Real-Time Communication**: Supports real-time messaging using WebSockets, allowing users to chat instantly in text channels.
- **Message Management**: Users can edit and delete their messages, and admins or moderators can manage all messages within their servers.
- **File Sharing**: Users can upload and share files such as PDFs and images within channels.
- **Video and Audio Channels**: Users can create and join video and audio channels for live communication. The app supports video calls, screen sharing, and text chatting within video channels.
- **User Roles and Permissions**: Admins can assign roles to users (e.g., moderator) and manage their permissions, such as the ability to delete messages or create channels.
- **Infinite Scroll with React Query**: Messages load in batches as you scroll, improving performance and user experience.
- **Dark and Light Mode**: The app includes a fully functional dark mode and light mode, providing a seamless user experience.
- **Error Handling and Fallbacks**: If the WebSocket server fails, the app falls back to polling, ensuring that users can continue to communicate without interruptions.

## Technologies Used

- **Frontend**: Next.js 13, React, Tailwind CSS, Chat UI
- **Backend**: Node.js, Prisma, MySQL (PlanetScale)
- **Real-Time Communication**: Socket.io
- **Authentication**: Clerk for user authentication and management
- **Deployment**: Railway.app for free deployment of dynamic pages( supports websockets )

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MySQL (or PlanetScale for cloud database)
- A Clerk account for authentication

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Likheet/bonfire.git
    cd bonfire
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add the following variables:

    ```makefile
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    DATABASE_URL=
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    LIVEKIT_API_KEY=
    LIVEKIT_API_SECRET=
    NEXT_PUBLIC_LIVEKIT_URL=
    ```

4. **Initialize the database**:

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Run the development server**:

    ```bash
    npm run dev
    ```

6. **Access the application**: Open your browser and navigate to http://localhost:3000.

## Project Structure

- **/app**: Contains the Next.js application routes and pages.
- **/components**: Reusable React components for the UI.
- **/lib**: Utility functions and configurations, including database setup with Prisma.
- **/pages**: Next.js page routes for server-side rendering.
- **/prisma**: Prisma schema file and migration history.
- **/styles**: Global styles using Tailwind CSS.

## Key Scripts

- **npm run dev**: Starts the development server.
- **npm run build**: Builds the application for production.
- **npm run start**: Starts the production server.
- **npx prisma studio**: Opens Prisma Studio for database management.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are reviewed actively.
