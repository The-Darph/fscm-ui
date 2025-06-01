import 'normalize.css';
import '../less/style.less';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

// Creates visual representation of scale of emergency using emoji
function visualEmergencyScale(number) {
  let visuals = "";

  for (let i = 0; i < number; i++) {
    visuals += "\u{1F525}"
  }

  return visuals;
}

const moment = require('moment');

const apiUrl = `${process.env.API_BASE_URL}/v1/events`;

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch all events on load
  useEffect(() => {
    fetch(apiUrl)  // Replace with your API endpoint
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBackClick = () => {
    setSelectedEvent(null);
  };

  console.log(events);
  console.log(selectedEvent);

  return (
    <div>
      {!selectedEvent ? (
        <div className="event">
          {events.map(res => (
            <div key={res.event.id} className="list-event">
              <time className="small" dateTime={res.event.transpired}>{moment(res.event.transpired).format("Do MMMM, YYYY")}</time>
              <h3 className="hug">
                <a href="#" onClick={(e) => { e.preventDefault(); handleEventClick(event); }}>{res.event.description}</a>
              </h3>
              <p className="hug">
                <a href={res.event.source} target="_blank">(Source)</a>
              </p>
              <p>
                {res.event.body}
              </p>
              <p>
                <span className="event-type">{res.event_type.description}</span> 
                {res.subtypes.map(sub => (
                  <span key={sub.id} className="subtype">{sub.description}</span>
                ))}
              </p>
              <p><strong>Emergency scale:</strong> {visualEmergencyScale(res.event.scale)}</p>
              <br />
              <hr /><br /><br />
            </div>
          ))}
        </div>
      ) : (
        // This doesn't work
        <div>
          <h1>{selectedEvent.description}</h1>
          <p>{selectedEvent.body}</p>
          <button onClick={handleBackClick}>Back to list</button>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('event-results'));
root.render(<App />);
