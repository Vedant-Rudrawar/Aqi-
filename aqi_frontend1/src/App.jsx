import React from 'react'
import AqiSearch from './components/AqiSearch.jsx'
import './index.css'
import './styles/main.css'

export default function App() {
  return (
    <div className="app-root">
      <div className="app-wrap">
        <header className="topbar">
          <div className="brand">
            <div className="logo">AQI</div>
            <div className="brand-text">
              <div className="brand-sub">Real-time Air Quality</div>
            </div>
          </div>
        </header>

        <main>
          <AqiSearch />
        </main>

        <footer className="footer">
          <small>Built with WAQI · Backend on :8600</small>
        </footer>
      </div>
    </div>
  )
}
