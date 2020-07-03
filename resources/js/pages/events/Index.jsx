import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Index = () => {
    let [events, setEvents] = useState({
        data: [],
        meta: {}
    });
    
    useEffect(() => {
        axios.get("/api/events")
            .then(response => {
                setEvents(response.data);
            })
    }, []);
    
    return (
        <div className={'page index'} id="events">
            <div className="clearfix">
                <p className="page-title">이벤트 목록</p>
    
                <div className="btns align-right">
                    <Link to={"/events/create"} className="btn btn-text bg-primary">이벤트 생성</Link>
                </div>
            </div>
   
            <div className="event">
                {events.data.map(event => <Link to={"/events/" + event.id} className="item" key={event.id}>{event.title}</Link>)}
            </div>
        </div>
    );
};

export default Index;
