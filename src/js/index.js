import 'normalize.css';
import '../less/style.less';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
// import { createRoot } from 'react-dom/client';

const moment = require('moment');

// Creates visual representation of scale of emergency using emoji
function visualEmergencyScale(number) {
  let visuals = "";

  for (let i = 0; i < number; i++) {
    visuals += '\u26A0\uFE0F';
  }

  return visuals;
}

const apiUrl = `${process.env.API_BASE_URL}/v1/events`;
const typesApiUrl = `${process.env.API_BASE_URL}/v1/types`;
const subTypesApiUrl = `${process.env.API_BASE_URL}/v1/subtypes`;

function TypesFilter({ selectedTypes, setSelectedTypes, selectedSubtypes, setSelectedSubtypes }) {
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    fetch(typesApiUrl)
      .then(res => res.json())
      .then(data => setTypes(Array.isArray(data) ? data : data.types || []))
      .catch(err => console.error('Error fetching types:', err));

    fetch(subTypesApiUrl)
      .then(res => res.json())
      .then(data => setSubtypes(Array.isArray(data) ? data : data.subtypes || []))
      .catch(err => console.error('Error fetching subtypes:', err));
  }, []);

  const toggleType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
  };

  const toggleSubtype = (subtypeId) => {
    setSelectedSubtypes(prev =>
      prev.includes(subtypeId) ? prev.filter(id => id !== subtypeId) : [...prev, subtypeId]
    );
  };

  return (
    <div className="col-4">
      <h2 className="h3">Filter by Types</h2>
      <ul className="filter-options">
        {types.map(type => (
          <li key={type.id}>
            <a href="#"
              style={{ fontWeight: selectedTypes.includes(type.id) ? 'bold' : 'normal' }}
              onClick={() => toggleType(type.id)}>
              {type.description}
            </a>
          </li>
        ))}
      </ul>

      <h3>Filter by Subtypes</h3>
      <ul className="filter-options">
        {subtypes.map(sub => (
          <li key={sub.id}>
            <a href="#"
              style={{ fontWeight: selectedSubtypes.includes(sub.id) ? 'bold' : 'normal' }}
              onClick={() => toggleSubtype(sub.id)}>
              {sub.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventsList({ selectedTypes, selectedSubtypes }) {
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

  const filteredEvents = events.filter(res => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(res.event.type_);
    const matchesSubtype =
      selectedSubtypes.length === 0 || res.subtypes.some(sub => selectedSubtypes.includes(sub.id));
    return matchesType && matchesSubtype;
  });

  // const filteredEvents = selectedTypes.length === 0
  // ? events
  // : events.filter(res => 
  //     selectedTypes.includes(res.event.type) ||
  //     res.subtypes.some(sub => selectedTypes.includes(sub.id))
  //   );

  return (
    <div className="col-8">
      <h1 className="h2 site-title">The Dystopian Epoch</h1>
      {!selectedEvent ? (
        <div className="event">
          {filteredEvents.map(res => (
            <div key={res.event.id} className="list-event">
              <time className="small" dateTime={res.event.transpired}>{moment(res.event.transpired).format("Do MMMM, YYYY")}</time>
              <h3 className="hug">
                <a href="#" onClick={(e) => { e.preventDefault(); handleEventClick(res); }}>{res.event.description}</a>
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
          <h3>{selectedEvent.event.description}</h3>
          <p>{selectedEvent.event.body}</p>
          <p className="hug">
            <a href="#" className="button-link" onClick={handleBackClick}>Back to list</a>
          </p>
        </div>
      )}
    </div>
  );
};

function TypeComponent() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);

  return (
    <div>
      <TypesFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} selectedSubtypes={selectedSubtypes} setSelectedSubtypes={setSelectedSubtypes} />
      <EventsList selectedTypes={selectedTypes} selectedSubtypes={selectedSubtypes} />
    </div>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('event-results'));
const root = ReactDOM.createRoot(document.getElementById('event-results'));
root.render(<TypeComponent />);
