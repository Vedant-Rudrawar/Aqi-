🌍 Air Quality Index (AQI) – Full Stack Application
React (Vite) Frontend + Spring Boot Backend

This project provides real-time Air Quality Index (AQI) information for any city using a modern, clean, responsive UI and a high-performance backend API built with Spring Boot.

The frontend includes a professionally designed circular AQI indicator, pollutant cards, and a smooth user experience.
The backend integrates with the WAQI API to fetch real-time AQI data.

🚀 Features
🔎 Real-time AQI Search

Search any city worldwide

Clean and simple search interface

Responsive and fast

🌈 Circular AQI Gauge

Beautiful dotted circular gauge (AccuWeather-style)

Dynamic color levels based on AQI

Category text (Good, Moderate, Unhealthy, etc.)

🍃 Pollutant Breakdown

PM2.5, PM10, CO, SO2, NO2, O3

Clean card-based grid layout

⚡ Fast & Modern

Built with Vite for blazing-fast loading

Minimal bundle size

Smooth animations and clean modern UI

🔗 Fully Connected Backend

Spring Boot application with REST API

WAQI integrated

Clean response format used by the frontend

📦 Technologies Used
Frontend

React + Vite

Modern CSS

JSX

Axios

JavaScript ES2023

Backend

Spring Boot 3

Java 17+

RestTemplate

WAQI API

Caffeine cache

📂 Project Structure
aqi-frontend/
│
├── public/
├── src/
│   ├── components/
│   │     └── AqiSearch.jsx
│   ├── services/
│   │     └── aqiService.js
│   ├── styles/
│   │     └── main.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md

aqi-backend/
│
├── src/main/java/
│      ├── controller/
│      ├── service/
│      ├── model/
│      └── AqiBackendApplication.java
│
├── src/main/resources/
│      └── application.properties
└── pom.xml

🛠️ Installation & Setup Guide (COMPLETE)

This section explains every step required to run the project from start to finish.

✔ 1. Clone the repository
git clone https://github.com/your-username/aqi-project.git
cd aqi-project

✔ 2. Setup Backend (Spring Boot)
2.1 Open backend folder
cd aqi-backend

2.2 Configure API Token (WAQI)

In application.properties:

aqi.api.token=YOUR_WAQI_TOKEN
aqi.api.url=https://api.waqi.info/feed

2.3 Run Backend

If using Maven:

mvn spring-boot:run


Or from IDE (STS / IntelliJ):
Run AqiBackendApplication.java

Backend will start on:

http://localhost:8600

2.4 Backend test endpoints

Test health:

GET http://localhost:8600/api/health


Test AQI:

GET http://localhost:8600/api/city/pune

✔ 3. Setup Frontend (React + Vite)
3.1 Go to frontend folder
cd ../aqi-frontend

3.2 Install node modules
npm install

3.3 Start development server
npm run dev


Vite will display something like:

Local: http://localhost:5173


Open it in your browser.

✔ 4. Vite Proxy Configuration

Your vite.config.js proxy should be:

server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8600',
      changeOrigin: true,
      secure: false
    }
  }
}


This allows frontend to call backend like:

/api/city/pune


Without CORS issues.

✔ 5. Final File Locations
Main UI Component
src/components/AqiSearch.jsx

Stylesheets
src/styles/main.css
src/index.css

API Service
src/services/aqiService.js

👨‍💻 How It Works (Technical Overview)
Frontend

User types a city

fetchAqiByCity(city) sends request to /api/city/{city}

Circular AQI UI updates dynamically

Pollutants displayed in grid cards

Backend

Receives request /api/city/{city}

Calls WAQI API:

https://api.waqi.info/feed/{city}/?token=XXXX


Parses response into AqiResponse

Returns JSON to frontend

Uses Caffeine caching for speed

🧪 Testing
Test Backend
curl http://localhost:8600/api/city/delhi

Test Frontend

Open browser →

http://localhost:5173

🐛 Troubleshooting
❌ Frontend loads blank page

Run:

npm install
npm run dev

❌ CORS error

Backend must allow:

@CrossOrigin(origins = "http://localhost:5173")

❌ API error "invalid token"

Your WAQI token is wrong. Get a new one:
👉 https://aqicn.org/data-platform/token/

❌ Backend not reachable

Ensure it runs on port 8600.

📦 Production Build
Build frontend:
npm run build

Build output located at:
aqi-frontend/dist/


Serve with any static file host (Nginx, Apache, Netlify, Vercel).
