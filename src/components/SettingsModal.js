import React, { useContext } from 'react'
import { Button, FormControlLabel, makeStyles, Modal, Slider, Switch, Typography } from '@material-ui/core';
import AppContext from '../context/AppContext';
import { SettingsOutlined } from '@material-ui/icons';
import { AMBULANCE_MAX_TIME, AMBULANCE_MIN_TIME, SIGNAL_MAX_TIME, SIGNAL_MIN_TIME } from '../constant';

const useStyles = makeStyles((theme) => ({
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      margin: '30px auto'
    },
    button: {
        margin: theme.spacing(1),
    }
}));

const SettingsModal = props => {
    const classes = useStyles()
    const context = useContext(AppContext)
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        let dir = event.target.checked ? 'Clockwise' : 'Anticlockwise'
        context.updateSettings(dir, 'direction')
    };
    
    const handleRangeChange = (e, newValue, field) => {
        context.updateSettings(newValue, field)
    }

    const handleModal = (e) => setOpen(e);

    const valuetext = (value) => {
        return `${value}sec`;
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SettingsOutlined />}
                onClick={() => handleModal(true)}
            >
                Settings
            </Button>
            <Modal
                open={open}
                onClose={() => handleModal(false)}
            >
                <div className={classes.paper}>
                    <Typography gutterBottom>
                        Signal Time ({context.settings.signalTime} seconds)
                    </Typography>
                    <Slider
                        value={context.settings.signalTime || ''}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={SIGNAL_MIN_TIME}
                        max={SIGNAL_MAX_TIME}
                        onChange={(e, val) => handleRangeChange(e, val, 'signalTime')}
                    />
                    <Typography gutterBottom>
                        Ambulance Time ({context.settings.ambulanceTime} seconds)
                    </Typography>
                    <Slider
                        value={context.settings.ambulanceTime || ''}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={AMBULANCE_MIN_TIME}
                        max={AMBULANCE_MAX_TIME}
                        onChange={(e, val) => handleRangeChange(e, val, 'ambulanceTime')}
                    />
                    <Typography gutterBottom>
                        Direction
                    </Typography>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={context.settings.direction === 'Clockwise' ? true : false}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label={context.settings.direction}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default SettingsModal