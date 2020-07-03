import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Show = ({match}) => {
    let [item, setItem] = useState({});
    
    useEffect(() => {
        axios.get("/api/events/" + match.params.id)
            .then(response => {
                setItem(response.data.data);
                console.log(response.data.data);
            })
    }, []);
    
    return (
        <div className={'page show'}>
            <div className="clearfix">
                <p className="page-title">이벤트 상세</p>
    
                <div className="btns align-right">
                    <button className="btn btn-text bg-primary">참여자 등록</button>
                    <Link to={"/events/edit/" + item.id} className="btn btn-text bg-primary">이벤트 수정</Link>
                </div>
            </div>
  
            <div className="input-wrap">
                <div className="input-title">이벤트명</div>
                
                <div className="input-body">{item.title}</div>
            </div>
    
            <div className="input-wrap">
                <div className="input-title">경품</div>
        
                <div className="input-body">{item.gifts ? item.gifts.map(gift => <span className={"input-tag bg-accent no-control"} key={gift}><span className="text">{gift}</span></span>) : null}</div>
            </div>
    
            <div className="input-wrap">
                <div className="input-title">생성일</div>
    
                <div className="input-body">{item.created_at}</div>
            </div>
        </div>
    );
};

export default Show;
