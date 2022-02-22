import axios from 'axios'
import mockSensors from './mockSensors'

export function * getSensors () {
  const config = { headers: { 'Content-Type': 'application/json', 'Authorization': 'secret' } }
  const res = yield axios.post(`https://it4735-group6-server.herokuapp.com/api/v1/admin/device`, {
    type: "read",
  }, config)
  var ret = {
    temperatureSensors: [],
    windowSensors: [],
    windowBlinds: [],
    stoveSensors: [],
    smokeSensors: [],
    lights: []
  }
  const devices = res.data.devices
  for (var i = 0; i < devices.length; ++i) {
    var obj = devices[i]
    if (obj.type == 0 || obj.sensorType == "stoveSensor") {
      ret.stoveSensors.push({
        ...obj,
        type: "stoveSensor",
        timer: !!obj.timer ? obj.timer : { 
          hour: 0, 
          min: 0  
        }, 
        temperature: !!obj.temperature ? obj.temperature : 0, 
        watt: !!obj.watt ? obj.watt : 0, 
        uptime: !!obj.uptime ? obj.uptime : 0, 
        power: !!obj.power ? obj.power : false, 
        level: !!obj.level ? obj.level : 0, 
        mode: !!obj.mode ? obj.mode : "None", 
        overheat: !!obj.overheat ? obj.overheat : false
      })
    }
    else if (obj.sensorType == "TEMPERATURE_SENSOR") {
      ret.temperatureSensors.push({
        ...obj,
        type: "TEMPERATURE_SENSOR",
        value: !!obj.value ? obj.value : 0
      })
    }
    else if (obj.sensorType == "windowSensor") {
      ret.temperatureSensors.push({
        ...obj,
        type: "windowSensor",
        status: !!obj.status ? obj.status : "close"
      })
    }
    else if (obj.sensorType == "smokeSensor") {
      ret.temperatureSensors.push({
        ...obj,
        type: "smokeSensor",
        isSmokeDetected: !!obj.isSmokeDetected ? obj.isSmokeDetected : false
      })
    }
  }
  return ret
  //return mockSensors
}

export function * refreshSensors () {
  const config = { headers: { 'Content-Type': 'application/json', 'Authorization': 'secret' } }
  const res = yield axios.post(`https://it4735-group6-server.herokuapp.com/api/v1/admin/device`, {
    type: "read",
  }, config)
  var ret = {
    temperatureSensors: [],
    windowSensors: [],
    windowBlinds: [],
    stoveSensors: [],
    smokeSensors: [],
    lights: []
  }
  const devices = res.data.devices
  for (var i = 0; i < devices.length; ++i) {
    var obj = devices[i]
    if (obj.type == 0 || obj.sensorType == "stoveSensor") {
      ret.stoveSensors.push({
        ...obj,
        type: "stoveSensor",
        timer: !!obj.timer ? obj.timer : { 
          hour: 0, 
          min: 0  
        }, 
        temperature: !!obj.temperature ? obj.temperature : 0, 
        watt: !!obj.watt ? obj.watt : 0, 
        uptime: !!obj.uptime ? obj.uptime : 0, 
        power: !!obj.power ? obj.power : false, 
        level: !!obj.level ? obj.level : 7, 
        mode: !!obj.mode ? obj.mode : "Hot Pot", 
        overheat: !!obj.overheat ? obj.overheat : false
      })
    }
    else if (obj.sensorType == "TEMPERATURE_SENSOR") {
      ret.temperatureSensors.push({
        ...obj,
        type: "TEMPERATURE_SENSOR",
        value: !!obj.value ? obj.value : 0
      })
    }
    else if (obj.sensorType == "windowSensor") {
      ret.temperatureSensors.push({
        ...obj,
        type: "windowSensor",
        status: !!obj.status ? obj.status : "close"
      })
    }
    else if (obj.sensorType == "smokeSensor") {
      ret.temperatureSensors.push({
        ...obj,
        type: "smokeSensor",
        isSmokeDetected: !!obj.isSmokeDetected ? obj.isSmokeDetected : false
      })
    }
  }
  return ret
  //return mockSensors
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

export function * changeStoveDetails (stoveSensorDetails) {
  const config = { headers: { 'Content-Type': 'application/json', 'Authorization': 'secret' } }
  const res = yield axios.post(`https://it4735-group6-server.herokuapp.com/api/v1/admin/device`, {
    type: "write",
    devices: [stoveSensorDetails]
  }, config)
  return res
  //return mockSensors
}
