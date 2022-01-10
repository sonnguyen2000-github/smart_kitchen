import { takeLatest } from 'redux-saga/effects'
import {
  loadSensorsSaga,
  refreshSensorsSaga,
  changeLightSensorDetailsSaga,
  changeWindowBlindsSensorDetailsSaga,
  updateSensorsSaga
} from './sensorSagas'
import actionTypes from '../../../common/constants/actionTypes'

export function * watchSensors () {
  yield takeLatest(actionTypes.SENSORS_LOAD_ACTION, loadSensorsSaga)
  yield takeLatest(actionTypes.SENSORS_REFRESH_ACTION, refreshSensorsSaga)
  yield takeLatest(actionTypes.SENSOR_LIGHT_CHANGE_ACTION, changeLightSensorDetailsSaga)
  yield takeLatest(actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_ACTION, changeWindowBlindsSensorDetailsSaga)
  yield takeLatest(actionTypes.SENSORS_UPDATE_ACTION, updateSensorsSaga)
}
