import * as actions from '../../actions/sensor'
import { put, call, delay, select } from 'redux-saga/effects'
import {
  getSensors,
  refreshSensors,
  changeLightDetails,
  changeWindowBlindsDetails,
  changeStoveDetails,
} from '../../api/sensor'

const formatValue = value => (value / 10).toFixed(1)

const changeSensorTemperatureValueFormat = sensors => sensors.map(sensor => ({
  ...sensor,
  value: formatValue(sensor.value)
}))

export function * loadSensorsSaga () {
  yield put(actions.fetchSensorsStart())
  try {
    const sensors = yield call(getSensors)
    //sensors.temperatureSensors = changeSensorTemperatureValueFormat(sensors.temperatureSensors)
    yield put(actions.fetchSensorsSuccess(sensors))
  } catch (error) {
    yield put(actions.fetchSensorsFail(error))
  }
}

export function * updateSensorsSaga (action) {
  yield put(actions.updateSensorsStart())
  try {
    yield put(actions.updateSensorsSuccess(action.sensors))
  } catch (error) {
    yield put(actions.updateSensorsFail(error))
  }
}

export function * refreshSensorsSaga () {
  yield put(actions.refreshSensorsStart())
  while (true) {
    yield delay(500)
    try {
      const sensors = yield call(refreshSensors)
      //sensors.temperatureSensors = changeSensorTemperatureValueFormat(sensors.temperatureSensors)
      const { updating } = (yield select()).sensor
      updating === 0 && (yield put(actions.refreshSensorsSuccess(sensors)))
    } catch (error) {
      yield put(actions.refreshSensorsFail(error))
    }
  }
}

export function * changeLightSensorDetailsSaga (action) {
  yield put(actions.changeLightSensorDetailsStart())
  try {
    yield call(changeLightDetails, action.lightSensorDetails)
    yield put(actions.changeLightSensorDetailsSuccess())
  } catch (error) {
    yield put(actions.changeLightSensorDetailsFail(error))
  }
}

export function * changeWindowBlindsSensorDetailsSaga (action) {
  yield put(actions.changeWindowBlindsSensorDetailsStart())
  try {
    yield call(changeWindowBlindsDetails, action.windowBlindsSensorDetails)
    yield put(actions.changeWindowBlindsSensorDetailsSuccess())
  } catch (error) {
    yield put(actions.changeWindowBlindsSensorDetailsFail(error))
  }
}

export function * changeStoveSensorDetailsSaga (action) {
  yield put(actions.changeStoveSensorDetailsStart())
  try {
    yield call(changeStoveDetails, action.stoveSensorDetails)
    yield put(actions.changeStoveSensorDetailsSuccess())
  } catch (error) {
    yield put(actions.changeStoveSensorDetailsFail(error))
  }
}