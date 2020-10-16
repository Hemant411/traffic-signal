import { Button, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import AppContext from '../context/AppContext'

const useStyle = makeStyles({
    SignalRoute: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
        '& li': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '&.flex-row': {
                flexDirection: 'row',
                justifyContent: 'space-around',
            }
        }
    },
    twoBlock: {
        display: 'flex',
        alignItems: 'center'
    }
})

const Signal = props => {
    const classes = useStyle()
    const context = useContext(AppContext)
    const [counter, setCounter] = useState(context.signalValue)
    const [selectedRoute, setSelectedRoute] = useState(context.selectedRoute)
    const [ambSelect, setAmbSelect] = useState(context.ambSelect)
    
    useEffect(() => {
        setSelectedRoute(context.selectedRoute)
        setAmbSelect(context.ambSelect)
    }, [context.selectedRoute, context.ambSelect])

    useEffect(() => {
        setCounter(context.signalValue)

        var counterTimer = setInterval(() => {
            setCounter(counter => counter - 1);
        }, [1000])

        var signalInterval = setInterval(() => {
            context.updateRoute()
            setCounter(context.signalValue)
            setAmbSelect(false)
        }, [context.signalValue * 1000])

        return () => {
            setCounter(context.signalValue)
            clearInterval(signalInterval)
            clearInterval(counterTimer)
        }
    }, [context.signalValue])

    const handleClick = (route) => {
        context.ambClick(route)
        setCounter(context.signalValue)
    }

    return (
        <ul className={ classes.SignalRoute }>
            <li>
                <Button
                    variant="contained"
                    className={clsx("mb-15", { 'bg-green': selectedRoute === 1 && ambSelect, 'bg-red': selectedRoute !== 1 && ambSelect })}
                    onClick={() => handleClick(1)}
                >
                    AMB
                </Button>
                <Button
                    variant="contained"
                    className={clsx("mb-15", { 'bg-green': selectedRoute === 1, 'bg-red': selectedRoute !== 1 })}
                >
                    A
                </Button>
                <p>{selectedRoute === 1 ? counter : context.signalValue}</p>
            </li>
            <li className="flex-row">
                <div className={classes.twoBlock}>
                    <Button
                        variant="contained"
                        className={clsx("mr-15", { 'bg-green': selectedRoute === 4 && ambSelect, 'bg-red': selectedRoute !== 4 && ambSelect })}
                        onClick={() => handleClick(4)}
                    >
                        AMB
                    </Button>
                    <Button
                        variant="contained"
                        className={clsx("mr-15", { 'bg-green': selectedRoute === 4, 'bg-red': selectedRoute !== 4 })}
                    >
                        D
                    </Button>
                    <p>{selectedRoute === 4 ? counter : context.signalValue}</p>
                </div>
                <div className={classes.twoBlock}>
                    <p className="mr-15">{selectedRoute === 2 ? counter : context.signalValue}</p>
                    <Button
                        variant="contained"
                        className={clsx("mr-15", { 'bg-green': selectedRoute === 2, 'bg-red': selectedRoute !== 2 })}
                    >
                        B
                    </Button>
                    <Button
                        variant="contained"
                        className={clsx("mr-15", { 'bg-green': selectedRoute === 2 && ambSelect, 'bg-red': selectedRoute !== 2 && ambSelect })}
                        onClick={() => handleClick(2)}
                    >
                        AMB
                    </Button>
                </div>
            </li>
            <li>
                <p>{selectedRoute === 3 ? counter : context.signalValue}</p>
                <Button
                    variant="contained"
                    className={clsx("mb-15", { 'bg-green': selectedRoute === 3, 'bg-red': selectedRoute !== 3 })}
                >
                    C
                </Button>
                <Button
                    variant="contained"
                    className={clsx("mb-15", { 'bg-green': selectedRoute === 3 && ambSelect, 'bg-red': selectedRoute !== 3 && ambSelect })}
                    onClick={() => handleClick(3)}
                >
                    AMB
                </Button>
            </li>
        </ul>
    );
}

export default Signal