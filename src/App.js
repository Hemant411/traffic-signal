import { Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Roads from './components/Roads';
import SettingsModal from './components/SettingsModal';
import { AMBULANCE_TIME, DIRECTION, SIGNAL_TIME } from './constant';
import AppContext from './context/AppContext';

const initSetting = {
  signalTime: SIGNAL_TIME,
  ambulanceTime: AMBULANCE_TIME,
  direction: DIRECTION,
  openRoad: 1,
  ambSignal: false
}

const useStyle = makeStyles({
  body: {
    marginTop: '30px'
  }
})

const App = props => {
  const classes = useStyle()
  const [settings, setSettings] = useState(initSetting)

  const updateSettings = (e, field) => {
    let setParams = { ...settings }
    setParams[field] = e
    setSettings(setParams)
  }

  const ambSettings = (e, field) => {
    let setParams = { ...settings }
    setParams[field] = e
    setParams.ambSignal = true
    setSettings(setParams)
    setTimeout(() => {
      setParams.ambSignal = false
      setSettings(setParams)
    }, AMBULANCE_TIME * 1000)
  }

  return (
    <AppContext.Provider value={{ settings, updateSettings, ambSettings }}>

      <Container className={ classes.body }>
        {/* Setting modal component */}
        <SettingsModal />

        {/* Roads component */}
        <Roads />
      </Container>

    </AppContext.Provider>
  )
}

export default App;
