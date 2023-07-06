import React, { useState } from 'react';
import ClockWidget from '../widgets/ClockWidget';
import ReminderListWidget from '../widgets/ReminderListWidget';
import TimerWidget from '../widgets/TimerWidget';
import CalendarWidget from '../widgets/CalendarWidget';
import MyCustomWidget from '../widgets/MyCustomWidget';
import TradingView from '../widgets/TradingView';

function WidgetGalleryItem({ widget, onClick }) {
    return (
        <div className="widget-gallery-item" onClick={onClick}>
            <div className="row">
                <div className="widget-gallery-item-name">{widget.name}</div>
                <div className="widget-gallery-item-add-button">+</div>
            </div>
            {widget.component}
        </div>
    );
}

export default function WidgetGalleryModal({
    setShowWidgetModal,
    selectedWidgetArea,
    widgets,
    setWidgets,
}) {
    const [galleryWidgets] = useState([
        { component: <ClockWidget />, name: "Date and Time" },
        { component: <ReminderListWidget />, name: "Reminder List" },
        { component: <TimerWidget />, name: "Timer" },
        { component: <CalendarWidget />, name: "Calendar" },
        { component: <MyCustomWidget />, name: "Weather" },
        { component: <TradingView />, name: "Trade" },
    ]);

    const addWidget = (widget) => {
        const widgetName = widget.name;
        const widgetComponent = widget.component;

        const widgetExists = widgets.find((widget) => widget.name === widgetName);
        if (!widgetExists) {
            setWidgets((prevWidgets) => [
                ...prevWidgets,
                {
                    id: new Date().getTime(),
                    component: widgetComponent,
                    area: selectedWidgetArea,
                    name: widgetName,
                },
            ]);
            setShowWidgetModal(false);
        } else {
            alert('You can only add one of each widget');
        }
    };

    return (
        <div
            className="modal"
            onClick={() => {
                setShowWidgetModal(false);
            }}
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Widget Gallery</h2>
                    <div>
                        {galleryWidgets.map((widget) => (
                            <WidgetGalleryItem
                                key={widget.name}
                                widget={widget}
                                onClick={() => addWidget(widget)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
