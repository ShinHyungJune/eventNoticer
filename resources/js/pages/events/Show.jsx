import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {setPop, setFlash} from "../../actions/commonActions";
import SettingHeader from '../../components/SettingHeader';

const Show = ({match, history}) => {
	let [loading, setLoading] = useState(false);
	let [rows, setRows] = useState([]);
	let [file, setFile] = useState(null);

    let [item, setItem] = useState({
		participantsLength: 0
	});

    useEffect(() => {
        axios.get("/api/events/" + match.params.id)
            .then(response => {
                setItem(response.data.data);
            })
    }, []);

    const setExcelHead = (e) => {
		let file = e.target.files[0];

    	if(file){
    		setFile(file);

    		let reader = new FileReader();

    		reader.onload = () => {
    			let data = reader.result;
    			let excel = XLSX.read(data, {type: "binary"});

    			excel.SheetNames.forEach((sheetName) => {
					let rows = XLSX.utils.sheet_to_json(excel.Sheets[sheetName]);

					setRows(rows);

					store.dispatch(setPop("참여자 등록"));
				})
			};

    		reader.readAsBinaryString(file);
		}
	};

    const remove = () => {
    	axios.delete("/api/events/" + match.params.id)
			.then(response => {
				window.store.dispatch(setFlash(response.data.message));

				history.replace("/events");
			})
	};

    return (
        <div className={'page show'}>
			<SettingHeader rows={rows} event_id={match.params.id} history={history}/>

            <div className="clearfix">
                <p className="page-title">이벤트 상세</p>
    
                <div className="btns align-right">
					<input type="file" id={"file"} style={{display:"none"}} onChange={setExcelHead} />
					{item.participantsLength === 0 ? <label className="btn btn-text bg-primary"htmlFor="file">참여자 등록</label> :
						(
							<Fragment>
								<label className="btn btn-text bg-primary"htmlFor="file">참여자 재등록</label>
								<Link to={"/participants/" + match.params.id} className={"btn btn-text bg-primary"}>참여자 보기</Link>
							</Fragment>
						)
					}

					<button type={"button"} className="btn btn-text bg-red" onClick={remove}>이벤트 삭제</button>

                    <Link to={"/events/edit/" + item.id} className="btn btn-text bg-primary">이벤트 수정</Link>
                </div>
            </div>
  
            <div className="input-wrap">
                <div className="input-title">이벤트명</div>
                
                <div className="input-body">{item.title}</div>
            </div>
    
            <div className="input-wrap">
                <div className="input-title">경품</div>
        
                <div className="input-body">{item.gifts ? item.gifts.map(gift => <span className={"input-tag bg-sub no-control"} key={gift.id}><span className="text">{gift.title}</span></span>) : null}</div>
            </div>
    
            <div className="input-wrap">
                <div className="input-title">생성일</div>
    
                <div className="input-body">{item.created_at}</div>
            </div>
        </div>
    );
};

export default Show;
