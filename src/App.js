import React, { useEffect, useState } from 'react';
import './App.css';
import AppContext from './context/AppContext'
import { Button, Container, makeStyles, Modal, Slider, Switch } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import Signal from './Signal';
import { AMB_TIME, SIGNAL_TIME } from './config';

const useStyle = makeStyles({
  Body: {
    padding: '15px'
  },
  modal: {
    maxWidth: '550px',
    backgroundColor: '#fff',
    margin: '30px auto',
    padding: '20px',
    '& .modalHeader': {
      fontSize: '24px',
      padding: '0 0 10px',
      margin: '0 0 15px',
      borderBottom: '1px solid #efefef'
    }
  }
})

const App = () => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(1)
  const [signalValue, setSignalValue] = useState(SIGNAL_TIME)
  const [ambValue, setAMBValue] = useState(AMB_TIME)
  const [ambSelect, setAmbSelect] = useState(false)
  const [direction, setDirection] = useState('Clockwise')

  const handleSettings = (e) => setOpen(e)
  const handleSignalChange = (event, newValue) => setSignalValue(newValue);
  const handleAMBChange = (event, newValue) => setAMBValue(newValue);
  const handleDirectionChange = (event) => {
    let key = event.target.checked ? 'Clockwise' : 'AntiClockwise'
    setDirection(key)
  };

  const valuetext = (value) => {
    return `${value}sec`;
  }
  
  const updateRoute = () => {
    if (direction === 'Clockwise') {
      setSelectedRoute(selectedRoute => selectedRoute < 4 ? selectedRoute + 1 : 1);
    } else {
      setSelectedRoute(selectedRoute => selectedRoute > 1 ? selectedRoute - 1 : 4);
    }
  }

  const ambClick = (e) => {
    const oldSignalValue = signalValue
    setSignalValue(ambValue)
    setAmbSelect(true)
    setSelectedRoute(e)
    setTimeout(() => {
      if (direction === 'Clockwise') {
        setSelectedRoute(selectedRoute => selectedRoute < 4 ? selectedRoute + 1 : 1);
      } else {
        setSelectedRoute(selectedRoute => selectedRoute > 1 ? selectedRoute - 1 : 4);
      }
      setSignalValue(oldSignalValue)
      setAmbSelect(false)
    }, (ambValue * 1000))
  }

  return (
    <AppContext.Provider
      value={{ signalValue, ambValue, ambSelect, direction, selectedRoute, updateRoute, ambClick }}
    >
      <Container>
        <div className={classes.Body}>    
          <Button
            variant="contained"
            color="primary"
            startIcon={<Settings />}
            onClick={() => handleSettings(true)}
          >
            Settings
          </Button>
        </div>

        <Signal />

        <Modal
          open={open}
          onClose={() => handleSettings(false)}
        >
          <div className={ classes.modal }>
            <h2 className="modalHeader">Setting Panel</h2>
            <h4 className="m-0">Signal Timer({signalValue} sec)</h4>
            <Slider
              value={signalValue || 0}
              getAriaValueText={valuetext}
              min={15}
              max={120}
              step={1}
              valueLabelDisplay="auto"
              onChange={handleSignalChange} />
            <br/>
            <h4 className="m-0">AMB Timer({ambValue} sec)</h4>
            <Slider
              value={ambValue || 0}
              getAriaValueText={valuetext}
              min={10}
              max={300}
              step={1}
              valueLabelDisplay="auto"
              onChange={handleAMBChange} />
            <br />
            <h4 className="m-0">Signal Direction({direction})</h4>
            <Switch
              checked={direction === 'Clockwise' ? true : false}
              onChange={handleDirectionChange}
            />
          </div>
        </Modal>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
