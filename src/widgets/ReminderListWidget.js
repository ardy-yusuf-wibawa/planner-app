import React, { useEffect, useState } from 'react'
import "../styles/ReminderListWidget.css"

export default function ReminderListWidget() {
    const [reminderListData, setReminderListData] = useState()

    useEffect(() => {
        let reminderList = JSON.parse(localStorage.getItem('reminderList')) || []
        if (!reminderList || reminderList === "undefined") {
            reminderList = []
        }
        setReminderListData(reminderList)
    }, [])

    useEffect(() => {
        if (!reminderListData) {
            return
        }
        localStorage.setItem('reminderList', JSON.stringify(reminderListData))
    }, [reminderListData])

    return (
        <div className='reminder-container' >
            <div className='reminder-header' >
                <p>Reminder List</p>
                <button className='reminder-button'
                    onClick={() => {
                        setReminderListData([...reminderListData, {
                            title: '',
                            datestamp: '',
                        }])
                    }}
                >+ New</button>
            </div>
            {reminderListData?.length > 0 && reminderListData.map((reminder, index) => {
                return (
                    <div className='reminder-container' key={index}>
                        <div className='reminder-header' >
                            <input className='text-input' value={reminder.title}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        let reminderList = [...reminderListData]
                                        reminderList[index].title = e.target.value
                                        reminderList[index].datestamp = new Date()
                                        setReminderListData([...reminderList, {
                                            title: '',
                                            datestamp: '',
                                        }])
                                    }
                                }}
                                onChange={(e) => {
                                    let reminderList = [...reminderListData]
                                    reminderList[index].title = e.target.value
                                    reminderList[index].datestamp = new Date()
                                    setReminderListData(reminderList)
                                }} />
                            <button className='reminder-button'
                                onClick={() => {
                                    let reminderList = [...reminderListData]
                                    reminderList.splice(index, 1)
                                    setReminderListData(reminderList)
                                }}
                            >X</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}