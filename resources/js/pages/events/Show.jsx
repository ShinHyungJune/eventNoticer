import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Show = ({match}) => {
	let [loading, setLoading] = useState(false);

    let [item, setItem] = useState({});

    useEffect(() => {
        axios.get("/api/events/" + match.params.id)
            .then(response => {
                setItem(response.data.data);
            })
    }, []);

    const importJoiner = (e) => {
    	if(e.target.files[0]){
			let formData = new FormData();

			formData.append("file", e.target.files[0]);
			formData.append("id", match.params.id);

			setLoading(true);

			axios.post("/api/events/import", formData)
				.then(response => {
					setLoading(false);

					console.log(response.data.data);

					setItem(response.data.data);
				})
		}
	};

    return (
        <div className={'page show'}>
            <div className="clearfix">
                <p className="page-title">이벤트 상세</p>
    
                <div className="btns align-right">
					<input type="file" id={"file"} style={{display:"none"}} onChange={importJoiner} />
                    <label className="btn btn-text bg-primary"htmlFor="file">참여자 등록</label>
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

			{loading ? <div className="loading flash animated infinite">작업중</div> : null}

			{item.table ?
				<div className="table">
					<div className="thead">
						<div className="tr">
							{item.table.columns.map(column => <div className="th" key={"column" + column.id}>{column.name}</div>)}
						</div>
					</div>
					<div className="tbody">
						{item.table.contents.map((row, index) => 	<div className="tr" key={index}>
							{row.map(content => <div className="td" key={content.cell}>{content.body}</div>)}
						</div>)}
					</div>

				</div>

				: null
			}
        </div>
    );
};

export default Show;
