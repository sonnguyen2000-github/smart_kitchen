import { combineReducers } from 'redux'

// This is the place for future reducers to combine them all
import home from '../../data/reducers/homeReducer.js'
import sensor from '../../data/reducers/sensor.js'
import mapListCommunication from '../../data/reducers/mapListCommunication.js'
import dbInteraction from '../../data/reducers/dbInteraction.js'
import notification from '../../data/reducers/notification.js'

export default combineReducers({
  home,
  sensor,
  mapListCommunication,
  dbInteraction,
  notification
})
