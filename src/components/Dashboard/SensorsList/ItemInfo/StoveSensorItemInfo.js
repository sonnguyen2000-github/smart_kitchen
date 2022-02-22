import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import mqtt from 'mqtt'
import { useDispatch } from 'react-redux'
import { changeStoveSensorDetails } from '../../../../data/actions/sensor'

export default function StoveSensorItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  const client = useRef(mqtt.connect("wss://it4735-group6-broker.herokuapp.com"))
  const dispatch = useDispatch()
  const [state, setState] = useState(sensorData)
  const [useTimer, setUseTimer] = useState(false)
  const [originalSensorData, setOriginalSensorData] = useState(sensorData)

  const temperatureLevel = [0, 60, 80, 120, 150, 180, 220, 270, 300]
  const wattLevel = [0, 500, 800, 1000, 1300, 1600, 1900, 2100, 2400]

  useEffect(() => {
    const hasSensorDataChanged = 
      sensorData.power !== originalSensorData.power ||
      sensorData.level !== originalSensorData.level 

    if (hasSensorDataChanged) {
      setState(values => ({
        ...values,
        power: sensorData.power,
        level: sensorData.level,
      }))
      setOriginalSensorData(sensorData)
    }
  })

  const getRandomValue = (l, r) => {
    return Math.floor(Math.random() * (r - l + 1)) + l;
  }

  const onMessage = async (topic, payload) => {
    const msg = payload.toString()
    const recvData = JSON.parse(msg)
    if (!!recvData.type && recvData.type == "command") {
      if (!!recvData.command) {
        if (recvData.command == "power-on") {
          setState(values => {
            const newState = {
              ...values,
              timer:{
                hour:0,min:0 
              },
              type: 0,
              power: true,
              level: 7,
              mode: "Hot Pot",
              uptime: 0
            }
            delete newState._id
            dispatch(changeStoveSensorDetails(newState))
            return newState
          })
        } 
        else if (recvData.command == "power-off") {
          setState(values => {
            const newState = {
              ...values,
              type: 0,
              power: false
            }
            delete newState._id
            dispatch(changeStoveSensorDetails(newState))
            setUseTimer(false)
            return newState
          })
        }
        else if (recvData.command == "timer-set") {
          setState(values => {
            const newState = {
              ...values,
              type: 0,
              timer: {
                hour: recvData.hour,
                min: recvData.min,
              }
            }
            delete newState._id
            dispatch(changeStoveSensorDetails(newState))
            setUseTimer(true)
            return {
              ...newState,
              timer: {
                hour: newState.timer.hour,
                min: newState.timer.min,
                second: 0
              }
            }
          })
        }
        else if (recvData.command == "timer-reset") {
          setUseTimer(false)
        }
        else if (recvData.command == "set-mode") {
          setState(values => {
            const newState = {
              ...values,
              type: 0,
              mode: recvData.mode,
              level: recvData.mode == "Warm" ? 1 : 7
            }
            delete newState._id
            dispatch(changeStoveSensorDetails(newState))
            return newState
          })
        }
        else if (recvData.command == "level-set") {
          setState(values => {
            const newState = {
              ...values,
              type: 0,
              level: values.mode == "Hot Pot" ? recvData.level : values.level
            }
            delete newState._id
            dispatch(changeStoveSensorDetails(newState))
            return newState
          })
        }
      } 
    }
  }

  useEffect(() => {
    client.current.subscribe(`${state.id}`)
    client.current.on("message", async (topic, payload) => await onMessage(topic, payload))
  }, [])

  const roundTimer = (timer) => {
    if (timer.second > 0) {
      if (timer.min == 59) {
        return {
          hour: timer.hour + 1,
          min: 0
        }
      }
      return {
        hour: timer.hour,
        min: timer.min + 1
      }
    }
    return {
      hour: timer.hour,
      min: timer.min
    }
  }

  const decreaseTimer = (timer) => {
    if (timer.hour == 0 && timer.min == 0 && timer.second == 0) return timer
    if (timer.second == 0) {
      if (timer.min == 0) {
        return {
          hour: timer.hour - 1,
          min: 59,
          second: 59
        }
      }
      return {
        hour: timer.hour,
        min: timer.min - 1,
        second: 59  
      }
    }
    return {
      hour: timer.hour,
      min: timer.min,
      second: timer.second - 1
    }
  }

  useEffect(() => {
    // if (!state.power) return
    if (useTimer && state.timer.hour == 0 && state.timer.min == 0 && state.timer.second == 0) {
      var message = {
        timer: roundTimer(state.timer),
        uptime: state.uptime,
        power: false,
        type: "status",
        deviceId: state.id,
        houseId: "h01"
      }
      if (client.current) {
        client.current.publish(`${state.id}`, JSON.stringify(message), error => {
          if (error) {
            alert('Publish error: ', error)
          }
        })
      }
      setState(values => {
        const newState = {
          ...values,
          type: 0,
          power: false,
          uptime: 0
        }
        delete newState._id
        dispatch(changeStoveSensorDetails(newState))
        return newState
      })
      setUseTimer(false)
    }
    const interval = setInterval(() => {
      const nextTemperature = state.power ? getRandomValue(temperatureLevel[state.level], temperatureLevel[Math.min(state.level + 1, temperatureLevel.length-1)]) : 0
      const nextWatt = state.power ? getRandomValue(wattLevel[state.level], wattLevel[Math.min(state.level + 1, wattLevel.length-1)]) : 0
      const nextOverheat = state.power ? (getRandomValue(0, 1) == 0 ? false : true) : false
      var message = {
        timer: roundTimer(state.timer),
        temperature: nextTemperature,
        watt: nextWatt,
        uptime: state.uptime,
        power: state.power,
        level: state.level,
        mode: state.mode,
        overheat: nextOverheat,
        type: "status",
        deviceId: state.id,
        houseId: "h01"
      }
      if (message.timer.hour == 0 && message.timer.min == 0) {
        delete message.timer
      }
      if (client.current) {
        client.current.publish(`${state.id}`, JSON.stringify(message), error => {
          if (error) {
            alert('Publish error: ', error)
          }
        })
      }
      setState(values => {
        return {
          ...values,
          temperature: nextTemperature,
          watt: nextWatt,
          uptime: values.uptime + 1,
          timer: useTimer ? decreaseTimer(values.timer) : {hour:0,min:0}
        }
      })
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [state, useTimer])
  
  return (
    <>
      {t('dashboard:stove-power')}: {state.power ? "ON" : "OFF"} <br />
      {state.power && (
        <>
          {`${t('dashboard:stove-timer')}: ${roundTimer(state.timer).hour}h ${roundTimer(state.timer).min}m`} <br />
          {`${t('dashboard:temperature')}: ${state.temperature}°C`} <br /> 
          {`${t('dashboard:watt')}: ${state.watt}W`} <br /> 
          {`${t('dashboard:stove-uptime')}: ${state.uptime}s`} <br /> 
          {t('dashboard:stove-mode')}: {state.mode} <br />
          {sensorData.overheat ? "OVERHEAT!!!" : ""} <br /> 
        </>
      )}    
    </>
  )
}