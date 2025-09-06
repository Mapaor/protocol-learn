# Learning Paths Structure

This directory contains individual learning paths for different protocol categories. Each learning path has its own page that provides a focused view of protocols within that specific category.

## Available Learning Paths

### `/learn/paths/web-fundamentals`
- **Category**: Web protocols
- **Description**: Start with HTTP, HTTPS, AJAX, and web protocols
- **Color Theme**: Blue gradient

### `/learn/paths/file-transfer`
- **Category**: File transfer protocols
- **Description**: Learn FTP, SFTP, SCP, and secure file sharing
- **Color Theme**: Green gradient

### `/learn/paths/email-systems`
- **Category**: Email protocols
- **Description**: Master SMTP, IMAP, POP3, and email protocols
- **Color Theme**: Purple gradient

### `/learn/paths/security-protocols`
- **Category**: Security protocols
- **Description**: Understand SSH, TLS, SSL, mTLS, and security fundamentals
- **Color Theme**: Red gradient

### `/learn/paths/network-foundations`
- **Category**: Network and Transport protocols
- **Description**: DNS, DHCP, TCP, and core networking protocols
- **Color Theme**: Indigo gradient

### `/learn/paths/apis-services`
- **Category**: API protocols
- **Description**: REST, GraphQL, gRPC, and modern API design
- **Color Theme**: Gray gradient

### `/learn/paths/data-formats`
- **Category**: Data protocols
- **Description**: JSON, XML, and data interchange formats
- **Color Theme**: Teal gradient

### `/learn/paths/realtime-communication`
- **Category**: Real-time protocols
- **Description**: WebSockets, MQTT, and real-time protocols
- **Color Theme**: Pink gradient

### `/learn/paths/messaging-systems`
- **Category**: Messaging protocols
- **Description**: AMQP, NATS, and message queuing protocols
- **Color Theme**: Orange gradient

### `/learn/paths/authentication-identity`
- **Category**: Authentication protocols
- **Description**: OAuth 2.0, SPIFFE, SPIRE, and identity protocols
- **Color Theme**: Yellow gradient

### `/learn/paths/infrastructure-cloud`
- **Category**: Infrastructure protocols
- **Description**: RADOS and distributed system protocols
- **Color Theme**: Slate gradient

## Features

Each learning path page includes:

- **Progress Tracking**: Shows completion percentage and number of completed protocols
- **Difficulty Grouping**: Protocols are organized by Beginner, Intermediate, and Advanced levels
- **Interactive Protocol Cards**: Click on any protocol to go to its detailed page
- **Statistics Overview**: Quick stats showing completed, remaining, and total protocols
- **Visual Progress Bars**: Animated progress indicators for overall path and difficulty sections
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Navigation

- From the main `/learn` page, click on any learning path card to navigate to its dedicated page
- Each learning path page has a "Back to Learning Paths" link in the header
- Protocol cards within each path link directly to individual protocol pages

## Components

- **LearningPathLayout**: Shared layout component used by all learning path pages
- **ProtocolSection**: Component for grouping protocols by difficulty level
- Progress tracking is handled by the `useProgress` hook

## Adding New Learning Paths

To add a new learning path:

1. Create a new directory under `/learn/paths/` with a kebab-case name
2. Add a `page.tsx` file using the `LearningPathLayout` component
3. Update the `learningPaths` array in `/learn/page.tsx` with the new path configuration
4. Choose appropriate icon, color theme, and gradient for the visual design
