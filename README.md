# Simple Weather App

A simple weather app. This project is a WIP. Some features are buggy, don't work at all, or haven't been implemented yet.

## Features

### Currently Implemented
- **Current Weather**: Real-time weather conditions with location detection
- **5-Day Forecast**: Weather prediction for 5 days ahead.
- **Location Services**: Automatic weather detection using device location
- **Dark/Light Mode**: Automatic theme switching with manual controls

### Not working / Not Implemented
- **Search Functionality**: Find weather for any city worldwide
- **Search History**: Automatically saves recent city searches
- **Offline Support**: Service worker for cached content
- **Responsive Design**
- **Progressive Web App**

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: TanStack Query for server state
- **Backend**: Express.js with TypeScript
- **API**: OpenWeatherMap for weather data
- **PWA**: Service Worker, Web App Manifest

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- OpenWeatherMap API key (free at [OpenWeatherMap](https://openweathermap.org))

### Quick Start

1. **Install**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. **Start Development Server**
   
   For UNIX system
   ```bash
   npm run dev
   ```

   For Windows system
   ```
   start-windows.bat
   ```
   or use
   ```bash
   set NODE_ENV=development
   npx tsx server/index.ts
   ```

   App will be available at `http://localhost:5000`

### Getting Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org)
2. Sign up for a free account
3. Generate an API key from your dashboard
4. Add the key to your `.env` file

## Usage

### Basic Navigation
- **Weather Tab**: Current conditions and location search
- **Forecast Tab**: 5-day weather predictions
- **History Tab**: Recent search history with quick access
- **Settings Tab**: Theme controls and app information

### Search Features
- Type city name in the search bar
- Tap the location icon for GPS-based weather
- Select from search history for quick access
- Clear history when needed

### Progressive Web App
- Visit the app in your mobile browser
- Tap "Add to Home Screen" when prompted
- Access like a native app with offline support

## Development

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main application pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and API functions
│   │   └── types/        # TypeScript type definitions
│   └── public/       # Static assets and PWA files
├── server/           # Backend Express server
├── shared/           # Shared TypeScript types
└── README.md
```

### Key Components
- **WeatherCard**: Main weather display with gradients
- **ForecastCard**: 5-day forecast with daily breakdown
- **SearchBar**: City search with location detection
- **SettingsPanel**: Theme controls and app settings
- **ThemeProvider**: Dark/light mode management

### API Endpoints
- `GET /api/weather/current/:lat/:lon` - Current weather by coordinates
- `GET /api/weather/current/city/:city` - Current weather by city name
- `GET /api/weather/forecast/:lat/:lon` - 5-day forecast
- `GET /api/search-history` - Retrieve search history
- `POST /api/search-history` - Add to search history

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Icons from [Lucide React](https://lucide.dev)
- UI components from [Radix UI](https://radix-ui.com)