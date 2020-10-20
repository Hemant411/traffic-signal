import { Button, Grid, makeStyles } from '@material-ui/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import AppContext from '../context/AppContext'

const useStyle = makeStyles({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60px',
        '& p': {
            margin: '0',
            textAlign: 'center',
            width: '30px',
            height: '30px',
            fontSize: '18px'
        }
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '60px',
        '& p': {
            margin: '0',
            textAlign: 'center',
            width: '30px',
            height: '30px',
            fontSize: '18px'
        }
    },
    button: {
        backgroundColor: 'red !important',
        color: 'white'
    },
    warn: {
        backgroundColor: 'yellow !important',
        color: 'white'
    },
    active: {
        backgroundColor: 'green !important',
        color: 'white'
    }
})

const SignalCounter = ({step, openRoad, signalTime, counter, direction}) => {
    let time = ''
    if (direction === 'Clockwise') {
        time = openRoad <= step ? ((step - openRoad) * signalTime ) + counter
                                : ((4 + step - openRoad) * signalTime) + counter
    }
    if (direction === 'Anticlockwise') {
        time = openRoad < step ? ((4 - step + openRoad) * signalTime ) + counter
                                : ((openRoad - step) * signalTime) + counter
    }
    return (
        <p>{ time }</p>
    )
}

const Roads = props => {
    const classes = useStyle()
    const context = useContext(AppContext)
    const [counter, setCounter] = useState(context.settings.signalTime)

    const clockwise = useCallback(() => {
        if(context.settings.openRoad >= 4) {
            context.updateSettings(1, 'openRoad')
        } else {
            context.updateSettings(context.settings.openRoad + 1, 'openRoad')
        }
    }, [context])

    const Anticlockwise = useCallback(() => {
        if(context.settings.openRoad <= 1) {
            context.updateSettings(4, 'openRoad')
        } else {
            context.updateSettings(context.settings.openRoad - 1, 'openRoad')
        }
    }, [context])

    useEffect(() => {
        if (context.settings.ambSignal) setCounter(context.settings.ambulanceTime)
        else setCounter(context.settings.signalTime)

        // Signal counter here
        var decrementCounter = setInterval(() => {
            setCounter(counter => counter - 1)
        }, 1000)

        // Road change counter here
        var signalInterval = setInterval(() => {
            if(context.settings.direction === 'Clockwise') clockwise()
            else Anticlockwise()
            setCounter(context.settings.signalTime)
        }, context.settings.signalTime * 1000)
        
        // Ambulance change counter here
        var ambulanceInterval = setInterval(() => {
            if(context.settings.direction === 'Clockwise') clockwise()
            else Anticlockwise()
            setCounter(context.settings.signalTime)
        }, context.settings.ambulanceTime * 1000)

        if (context.settings.ambSignal) {
            clearInterval(signalInterval)
        } else {
            clearInterval(ambulanceInterval)
        }
        
        return () => {
            clearInterval(signalInterval)
            clearInterval(ambulanceInterval)
            clearInterval(decrementCounter)
        }
    }, [context, clockwise, Anticlockwise])

    const handleAMB = (currentRoad) => {
        if (context.settings.ambSignal) {
            return alert('Ambulance signal already open.')
        }
        context.ambSettings(currentRoad, 'openRoad')
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.flexColumn}>
                    <Button
                        variant="contained"
                        className={clsx("mb-15", {
                                [classes.active]: (context.settings.openRoad === 1 && context.settings.ambSignal)
                            })
                        }
                        onClick={() => handleAMB(1)}
                    >
                        AMB
                    </Button>
                    <Button
                        variant="contained"
                        className={clsx("mb-15", classes.button, { 
                                [classes.active]: context.settings.openRoad === 1,
                                [classes.warn]: (context.settings.openRoad === 1 && counter <= 5) 
                            }
                        )}
                    >
                        A
                    </Button>
                    <SignalCounter
                        step={1}
                        openRoad={context.settings.openRoad}
                        signalTime={context.settings.signalTime}
                        direction={context.settings.direction}
                        counter={counter}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="space-around">
                    <Grid item xs={3}>
                        <div className={classes.flex}>
                            <Button
                                variant="contained"
                                className={clsx("ml-15", { [classes.active]: (context.settings.openRoad === 4 && context.settings.ambSignal) })}
                                onClick={() => handleAMB(4)}
                            >
                                AMB
                            </Button>
                            <Button
                                variant="contained"
                                className={clsx("ml-15", classes.button, { [classes.active]: context.settings.openRoad === 4 })}
                            >
                                D
                            </Button>
                            <SignalCounter
                                step={4}
                                openRoad={context.settings.openRoad}
                                signalTime={context.settings.signalTime}
                                direction={context.settings.direction}
                                counter={counter}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={classes.flex}>
                            <SignalCounter
                                step={2}
                                openRoad={context.settings.openRoad}
                                signalTime={context.settings.signalTime}
                                direction={context.settings.direction}
                                counter={counter}
                            />
                            <Button
                                variant="contained"
                                className={clsx("ml-15", classes.button, { [classes.active]: context.settings.openRoad === 2 })}
                            >
                                B
                            </Button>
                            <Button
                                variant="contained"
                                className={clsx("ml-15", { [classes.active]: (context.settings.openRoad === 2 && context.settings.ambSignal) })}
                                onClick={() => handleAMB(2)}
                            >
                                AMB
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.flexColumn}>
                    <SignalCounter
                        step={3}
                        openRoad={context.settings.openRoad}
                        signalTime={context.settings.signalTime}
                        direction={context.settings.direction}
                        counter={counter}
                    />
                    <Button
                        variant="contained"
                        className={clsx("mb-15", classes.button, { [classes.active]: context.settings.openRoad === 3 })}
                    >
                        C
                    </Button>
                    <Button
                        variant="contained"
                        className={clsx("mb-15", { [classes.active]: (context.settings.openRoad === 3 && context.settings.ambSignal) })}
                        onClick={() => handleAMB(3)}
                    >
                        AMB
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default Roads