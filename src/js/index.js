import 'normalize.css';
import '../less/style.less';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';


const EventsList = () =>{

    const [eventData, setEventData] = useState({}) ;

    const getEventData = async() => {
        instance.get("http://localhost:8080/v1/events")
        .then(res => {
            setEventData(res.data)
        })
        .catch(error =>{
            console.log(error)
        });
    }
    
    useEffect(()=>{
        getEventData()
    }, []);

    console.log(eventData);
    
    return(<p>Event Data goes here<p>);
}


{/*const eventsList = document.getElementById('event-results');
const root = createRoot(eventsList);
root.render(<EventsList />);*/}
