import React from 'react'

import LightSensorIcon from './SensorGraphics/LightSensorIcon'
import StoveSensorIcon from './SensorGraphics/StoveSensorIcon'
import SmokeSensorIcon from './SensorGraphics/SmokeSensorIcon'
import TemperatureSensorValue from './SensorGraphics/TemperatureSensorValue'
import WindowBlindsSensorIcon from './SensorGraphics/WindowBlindsSensorIcon'
import WindowSensorIcon from './SensorGraphics/WindowSensorIcon'
import TemperatureSensorIcon from './SensorGraphics/TemperatureSensorIcon'
import UnknownSensorIcon from './SensorGraphics/UnknownSensorIcon'

export function drawSensorGraphicComponent (sensorType, sensorData) {
  const SensorGraphicComponent = {
    TEMPERATURE_SENSOR: <TemperatureSensorValue temperature={sensorData && sensorData.value} />,
    windowSensor: <WindowSensorIcon status={sensorData && sensorData.status} />,
    windowBlind: <WindowBlindsSensorIcon position={sensorData && sensorData.position} />,
    stoveSensor: <StoveSensorIcon />,
    smokeSensor: <SmokeSensorIcon isSmokeDetected={sensorData && sensorData.isSmokeDetected} />,
    LED_CONTROLLER: <LightSensorIcon />,
    led: <LightSensorIcon />,
    TEMPERATURE_SENSOR_ICON: <TemperatureSensorIcon temperature={sensorData && sensorData.value} />,
  }
  return SensorGraphicComponent[sensorType] || <UnknownSensorIcon />
}
