// src/services/aqiService.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',   // Vite proxy forwards /api -> your backend (see vite.config.js)
  timeout: 10000
})

// Named export must match the import in AqiSearch.jsx
export async function fetchAqiByCity(city) {
  if (!city) throw new Error('City is required')
  const encoded = encodeURIComponent(city)
  const res = await api.get(`/city/${encoded}`)
  // return the whole response body (the controller returns AqiResponse)
  return res.data
}
