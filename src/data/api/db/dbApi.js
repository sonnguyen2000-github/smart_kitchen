import axios from 'axios'

export function * addMapPoint (sensor) {
  const config = { headers: { 'Content-Type': 'application/json', 'Authorization': 'secret' } }
  const res = yield axios.post(`https://it4735-group6-server.herokuapp.com/api/v1/admin/device`, {
    type: "write",
    devices: [
      {
        id: sensor._id,
        sensorType: sensor.sensorType,
        mapPosition: sensor.mapPosition
      }
    ]
  }, config)
  return res
}

export function * removeMapPoint (sensor) {
  const config = { headers: { 'Content-Type': 'application/json', 'Authorization': 'secret' } }
  const res = yield axios.post(`https://it4735-group6-server.herokuapp.com/api/v1/admin/device`, {
    type: "write",
    devices: [
      {
        id: sensor._id,
        sensorType: sensor.sensorType,
        mapPosition: {}
      }
    ]
  }, config)
  return res
}
