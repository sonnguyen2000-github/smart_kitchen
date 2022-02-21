import { useTranslation } from 'react-i18next'

export default function StoveSensorItemInfo ({ sensorData, classes, handleRemoveClick }) {
  const { t } = useTranslation()
  return (
    <>
      {t('dashboard:stove-power')}: {sensorData.power ? "ON" : "OFF"} <br />
      {sensorData.power && (
        <>
          {`${t('dashboard:stove-timer')}: ${sensorData.timer.min * 10}m`} <br />
          {`${t('dashboard:temperature')}: ${sensorData.temperature}°C`} <br /> 
          {`${t('dashboard:watt')}: ${sensorData.watt}W`} <br /> 
          {t('dashboard:stove-mode')}: {sensorData.mode} <br />
        </>
      )}    
    </>
  )
}