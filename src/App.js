import React, { useState } from 'react';
import './App.css';
import ClockWidget from './widgets/ClockWidget';
import WidgetGalleryModal from './modals/WidgetGalleryModal';
import Draggable from 'react-draggable';
import TimerWidget from './widgets/TimerWidget';
import CalendarWidget from './widgets/CalendarWidget';
import MyCustomWidget from './widgets/MyCustomWidget';

function Widget({ widget, onRemove, onAreaChange }) {
  const { id, component, area } = widget;

  return (
    <div className="widget-container">
      <div className="widget-container-area">
        <select
          value={area}
          onChange={(e) => onAreaChange(id, e.target.value)}
        >
          <option value="none-widget">Floating</option>
          <option value="left-widget">Left</option>
          <option value="main-widget">Main</option>
          <option value="right-widget">Right</option>
        </select>
        <button className="remove-widget-button" onClick={() => onRemove(id)}>
          Close
        </button>
      </div>
      {component}
    </div>
  );
}

function NoneWidgetArea({ widgets, onRemove, onAreaChange }) {
  const floatingWidgets = widgets.filter((widget) => widget.area === 'none-widget');

  return (
    <div className="none-widget">
      {floatingWidgets.map((widget, index) => (
        <Draggable key={index} >
          <div>
            <Widget
              key={widget.id}
              widget={widget}
              onRemove={onRemove}
              onAreaChange={onAreaChange}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
}

function LeftWidgetArea({ widgets, onRemove, onAreaChange, onAddWidget }) {
  return (
    <div className="left-widget">
      {widgets
        .filter((widget) => widget.area === 'left-widget')
        .map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={onRemove}
            onAreaChange={onAreaChange}
          />
        ))}
      {widgets.filter((widget) => widget.area === 'left-widget').length < 3 && (
        <button className="add-widget-button" onClick={() => onAddWidget('left-widget')}>
          + Add Widget
        </button>
      )}
    </div>
  );
}

function MainWidgetArea({ widgets, onRemove, onAreaChange, onAddWidget }) {
  return (
    <div className="main-widget">
      {widgets
        .filter((widget) => widget.area === 'main-widget')
        .map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={onRemove}
            onAreaChange={onAreaChange}
          />
        ))}
      {widgets.filter((widget) => widget.area === 'main-widget').length < 2 && (
        <button className="add-widget-button" onClick={() => onAddWidget('main-widget')}>
          + Add Widget
        </button>
      )}
    </div>
  );
}

function RightWidgetArea({ widgets, onRemove, onAreaChange, onAddWidget }) {
  return (
    <div className="right-widget">
      {widgets
        .filter((widget) => widget.area === 'right-widget')
        .map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={onRemove}
            onAreaChange={onAreaChange}
          />
        ))}
      {widgets.filter((widget) => widget.area === 'right-widget').length < 3 && (
        <button className="add-widget-button" onClick={() => onAddWidget('right-widget')}>
          + Add Widget
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [widgets, setWidgets] = useState([
    { id: new Date().getTime(), component: <ClockWidget />, area: 'main-widget', name: "Date and Time" },
    { id: new Date().getTime() + 2, component: <CalendarWidget />, area: 'right-widget', name: "Calendar" },
    { id: new Date().getTime() + 1, component: <TimerWidget />, area: 'left-widget', name: "Timer" },
    { id: new Date().getTime() + 3, component: <MyCustomWidget />, area: 'left-widget', name: "Weather" },
  ]);
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [selectedWidgetArea, setSelectedWidgetArea] = useState('');

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const changeWidgetArea = (id, area) => {
    setWidgets((prevWidgets) => {
      const updatedWidgets = [...prevWidgets];
      const widgetToMove = updatedWidgets.find((widget) => widget.id === id);

      // Remove the widget from its current position
      updatedWidgets.splice(updatedWidgets.indexOf(widgetToMove), 1);

      // Determine the index to insert the widget at in the updated array
      let insertIndex = updatedWidgets.findIndex((widget) => widget.area === area);

      // If the area is none-widget, insert at the end of the array
      if (area === 'none-widget') {
        insertIndex = updatedWidgets.length;
      }

      // Insert the widget at the determined index
      updatedWidgets.splice(insertIndex, 0, { ...widgetToMove, area });

      return updatedWidgets;
    });
  };

  const addWidget = (area) => {
    setShowWidgetModal(true);
    setSelectedWidgetArea(area);
  };

  return (
    <>
      {showWidgetModal && (
        <WidgetGalleryModal
          setShowWidgetModal={setShowWidgetModal}
          selectedWidgetArea={selectedWidgetArea}
          widgets={widgets}
          setWidgets={setWidgets}
        />
      )}
      <div className="add-button" onClick={() => addWidget('none-widget')}>
        <p className="add-widget-button-float">+</p>
      </div>
      <div className="App">
        <div className="container">
          <NoneWidgetArea
            widgets={widgets}
            onRemove={removeWidget}
            onAreaChange={changeWidgetArea}
          />
          <LeftWidgetArea
            widgets={widgets}
            onRemove={removeWidget}
            onAreaChange={changeWidgetArea}
            onAddWidget={addWidget}
          />
          <MainWidgetArea
            widgets={widgets}
            onRemove={removeWidget}
            onAreaChange={changeWidgetArea}
            onAddWidget={addWidget}
          />
          <RightWidgetArea
            widgets={widgets}
            onRemove={removeWidget}
            onAreaChange={changeWidgetArea}
            onAddWidget={addWidget}
          />
        </div>
      </div>
    </>
  );
}
