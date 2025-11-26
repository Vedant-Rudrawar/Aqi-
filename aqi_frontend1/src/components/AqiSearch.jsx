import React, { useState } from 'react'
import { fetchAqiByCity } from '../services/aqiService.js'

function getAqiColor(aqi) {
  if (aqi == null) return '#9CA3AF' // muted gray
  const n = Number(aqi)
  if (n <= 50) return '#16a34a'     // green
  if (n <= 100) return '#f59e0b'    // amber
  if (n <= 200) return '#f97316'    // orange
  if (n <= 300) return '#ef4444'    // red
  return '#7c2d12'                  // dark red
}

export default function AqiSearch() {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const search = async () => {
    const trimmed = city.trim()
    if (!trimmed) {
      setError('Please enter a city')
      return
    }
    setError('')
    setLoading(true)
    setData(null)

    try {
      const resp = await fetchAqiByCity(trimmed)
      setData(resp)
    } catch {
      setError('Unable to fetch data. Try another city.')
    } finally {
      setLoading(false)
    }
  }

  const aqiValue = data?.data?.aqi ?? null
  const aqiColor = getAqiColor(aqiValue)

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search city — e.g. Pune"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            aria-label="City"
          />
          <button className="search-btn" onClick={search} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="badge-row">
          <div className="badge-card">
            <div className="badge-title">Air Quality Index</div>

            <div className="aqi-ring-wrap">
              <svg className="aqi-ring" viewBox="0 0 120 120" role="img" aria-label={`AQI ${aqiValue ?? 'N/A'}`}>
                <defs>
                  <filter id="ringShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b1220" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* subtle background ring */}
                <circle cx="60" cy="60" r="44" stroke="#eef2ff" strokeWidth="10" fill="none" />

                {/* dotted ring: smaller dots, spaced evenly */}
                <circle
                  cx="60"
                  cy="60"
                  r="44"
                  stroke={aqiColor}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="1.5 6"  /* small dot + gap */
                  style={{ filter: 'url(#ringShadow)' }}
                />
              </svg>

              <div className="aqi-center">
                <div
                  className="aqi-number"
                  style={{
                    background: aqiColor,
                    color: '#fff'
                  }}
                >
                  {aqiValue ?? '—'}
                </div>
                <div className="aqi-text">
                  {aqiValue == null
                    ? '—'
                    : aqiValue <= 50
                    ? 'Good'
                    : aqiValue <= 100
                    ? 'Moderate'
                    : aqiValue <= 200
                    ? 'Unhealthy (S)'
                    : aqiValue <= 300
                    ? 'Unhealthy'
                    : 'Very Unhealthy'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {data && (
          <div className="results-area">
            <div className="results-left">
              <div className="location-row">
                <div className="loc-label">Location</div>
                <div className="loc-name">{data?.data?.city?.name ?? ''}</div>
              </div>

              <h4 className="section-title">Pollutants</h4>

              <div className="pollutant-grid">
                {Object.entries(data.data.iaqi || {}).map(([k, v]) => (
                  <div key={k} className="pollutant-item">
                    <div className="pollutant-key">{k.toUpperCase()}</div>
                    <div className="pollutant-val">{v?.v ?? '—'}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="results-right">
              <div className="mini-card">
                <div className="mini-title">Quick</div>
                <div className="mini-row"><strong>AQI:</strong> {aqiValue ?? '—'}</div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
