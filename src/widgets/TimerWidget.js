import React, { useEffect, useState } from 'react';
import "../styles/TimerWidget.css";

export default function TimerWidget() {
    const [timerListData, setTimerListData] = useState({
        time: 0,
        isRunning: false,
    });
    const [audio, setAudio] = useState(null);

    const tidyTime = (time) => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return hours + ":" + minutes + ":" + seconds;
    };

    useEffect(() => {
        // timer logic
        let interval = null;
        if (timerListData.isRunning && timerListData.time > 0) {
            interval = setInterval(() => {
                setTimerListData((prevState) => ({
                    ...prevState,
                    time: parseInt(prevState.time) - 1,
                }));
            }, 1000);
        } else if (!timerListData.isRunning && timerListData.time !== 0) {
            setTimerListData((prevState) => ({
                ...prevState,
                isRunning: false,
            }));
            clearInterval(interval);
        } else if (timerListData.isRunning && timerListData.time === 0) {
            setTimerListData((prevState) => ({
                ...prevState,
                isRunning: false,
            }));
            clearInterval(interval);
            const audio = new Audio(
                'https://assets.mixkit.co/active_storage/sfx/622/622.wav'
            );
            audio.play();
            setAudio(audio);
            showNotification('Timer is up!');
        }

        return () => clearInterval(interval);
    }, [timerListData.isRunning, timerListData.time]);

    useEffect(() => {
        const handleClick = () => {
            if (audio && !audio.paused) {
                audio.pause();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            if (audio && !audio.paused) {
                audio.pause();
            }
        };
    }, [audio]);

    const showNotification = (message) => {
        if (Notification.permission === 'granted') {
            new Notification('Timer Notification', { body: message });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification('Timer Notification', { body: message });
                }
            });
        }
    };
    const handleStartOrStop = () => {
        if (timerListData.time === 0 && !timerListData.isRunning) return
        setTimerListData((prevState) => ({
            ...prevState,
            isRunning: !prevState.isRunning,
        }));
    }
    const handleReset = () => {
        setTimerListData((prevState) => ({
            ...prevState,
            time: 0,
            isRunning: false,
        }));
    }

    return (
        <div className='timer'>
            <div className='timer-text'>
                <label htmlFor='timer-value'>Timer (in seconds)</label>
            </div>
            <div className='timer-container'>
                <div className='timer-display'>
                    {timerListData.isRunning ? (
                        <p>{tidyTime(timerListData.time)}</p>
                    ) : (
                        <input
                            id='timer-value'
                            type='text'
                            className='text-input'
                            value={timerListData.time}
                            onChange={(e) => {
                                setTimerListData((prevState) => ({
                                    ...prevState,
                                    time: e.target.value,
                                }));
                            }}
                        />
                    )}
                </div>
                <div className='timer-controls'>
                    <button
                        onClick={handleStartOrStop}
                    >
                        {timerListData.isRunning ? 'Stop' : 'Start'}
                    </button>
                    <button
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

