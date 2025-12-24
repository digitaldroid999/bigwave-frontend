# BigWave Casino Games Frontend

Frontend application for Casino games from aggregator. This React-based application provides a user interface for browsing and playing casino games, including slots, live casino games, and favorites management.

## Features

- 🎰 **Game Categories**: Browse games by category (New Games, Slots, Live Casino)
- ⭐ **Favorites**: Save and manage favorite games
- 👤 **User Authentication**: Login and user management
- 💰 **Balance Management**: Real-time balance updates via WebSocket
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🔔 **Notifications**: User notifications and alerts

## Technology Stack

- **React** 19.2.0
- **React Router** 7.9.4
- **Axios** 1.13.2
- **Laravel Echo** 2.2.6 (WebSocket client)
- **Pusher JS** 8.4.0
- **React Icons** 5.5.0

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bigwave-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your environment variables (see [Environment Configuration](#environment-configuration) section below).

## Development

To run the application in development mode:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000) in your browser.

The page will reload automatically when you make changes to the code.

## Building for Production

To create a production build:

```bash
npm run build
```

This command builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include hashes for cache busting.

## Deployment

For deployment, follow these steps:

1. **Build the application:**
   ```bash
   npm run build
   ```
   This will create optimized production files in the `/build` directory.

2. **Copy build files to backend:**
   Copy all files from the `/build` directory to your backend's `public` folder:
   
   ```bash
   # Example commands (adjust paths as needed):
   # On Windows (PowerShell):
   Copy-Item -Path ".\build\*" -Destination "..\backend\public\" -Recurse -Force
   
   # On Linux/Mac:
   cp -r build/* ../backend/public/
   ```

   **Important:** Ensure that the backend's `public` folder exists and is configured to serve static files. All files from the `/build` directory should be copied to maintain the application structure.

3. **Verify deployment:**
   - Ensure `index.html` is in the backend's `public` folder
   - Verify all static assets (CSS, JS, images) are properly copied
   - Test the application through the backend server

## Project Structure

```
bigwave-frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   │   ├── auth/    # Authentication components
│   │   ├── common/  # Common UI components
│   │   └── layouts/ # Layout components (Header, Footer, Landing)
│   ├── pages/       # Page components
│   │   ├── favorites/
│   │   ├── live/
│   │   ├── NewGame/
│   │   └── slot/
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Library configurations (Echo, etc.)
│   └── App.js       # Main application component
├── build/           # Production build output (generated)
└── package.json     # Project dependencies and scripts
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Environment Configuration

Create a `.env` file in the root directory of the project with the following variables:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_PUSHER_APP_KEY=your_pusher_app_key
REACT_APP_PUSHER_APP_CLUSTER=your_pusher_cluster
```

### Environment Variables

- **REACT_APP_BACKEND_URL**: The backend server URL for API calls (e.g., `http://localhost:8000` or `https://api.example.com`)
  - This variable is used throughout the application for all API endpoint calls
  - **Important:** Create React App requires the `REACT_APP_` prefix for environment variables to be accessible in client-side code
- **REACT_APP_PUSHER_APP_KEY**: Your Pusher application key for WebSocket connections
  - Required for real-time balance updates and WebSocket communication
- **REACT_APP_PUSHER_APP_CLUSTER**: Your Pusher cluster region (e.g., `ap1`, `us2`, `eu`)
  - Specifies the Pusher cluster to connect to for WebSocket connections

### Example `.env` File

```env
# Backend API Server
REACT_APP_BACKEND_URL=http://localhost:8000

# Pusher WebSocket Configuration
REACT_APP_PUSHER_APP_KEY=1234567890abcdef
REACT_APP_PUSHER_APP_CLUSTER=ap1
```

**Important Notes:** 
- The `.env` file is already included in `.gitignore` and should not be committed to version control
- After modifying `.env`, you must restart the development server for changes to take effect
- Environment variables are embedded during build time - make sure to rebuild if you change these values

## Notes

- The application uses Laravel Echo for real-time WebSocket communication
- User authentication state is managed via localStorage
- Balance updates are polled and also received via WebSocket events
- The build output should be served as static files by the backend server
