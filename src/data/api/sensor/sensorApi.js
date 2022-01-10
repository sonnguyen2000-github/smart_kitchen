import axios from 'axios'
import mockSensors from './mockSensors'

export function * getSensors () {
  //const res = yield axios.get('/api/v1/dashboard')

  //return res.data
  return mockSensors
}

export function * refreshSensors () {
  //const res = yield axios.get('/api/v1/dashboard', { timeout: 4600 })

  //return res.data
  return mockSensors
}

export function * changeLightDetails (lightSensorDetails) {
  const config = { headers: { 'Content-Type': 'application/json' } }
  //const res = yield axios.put('/api/v1/light', lightSensorDetails, config)

  //return res.data
  return mockSensors
}

export function * changeWindowBlindsDetails (windowBlindsSensorDetails) {
  const config = { headers: { 'Content-Type': 'application/json' } }
  //const res = yield axios.put('/api/v1/blinds', windowBlindsSensorDetails, config)

  //return res.data
  return mockSensors
}

