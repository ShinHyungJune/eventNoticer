import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {setPop} from "../../actions/commonActions";
import ChoiceWinnings from '../../components/ChoiceWinnings';

const Index = ({match}) => {
	let [loading, setLoading] = useState(false);

	let [params, setParams] = useState({
		page:1,
		event_id: match.params.event_id,
		word: "",
		platform: []
	});

	let [event, setEvent] = useState({
		gifts: []
	});

	let [selectedGift, setSelectedGift] = useState(null);

    let [items, setItems] = useState({
        data: [],
        meta: {}
    });

    let [winnings, setWinnings] = useState([]);

    let [active, setActive] = useState(false);

    useEffect(() => {
		axios.get("/api/events/" + match.params.event_id)
			.then(response => {
				setEvent(response.data.data);

				setWinnings(response.data.data.winnings.data);

				setSelectedGift(response.data.data.gifts[0]);
			});

        axios.get("/api/participants", {
        	params: params
		}).then(response => {
			setItems(response.data);
		});
    }, []);

    useEffect(() => {
		axios.get("/api/participants", {
			params: params
		}).then(response => {
			setItems(response.data);
		});
	}, [params]);

    const choice = (item) => {
		if(active){
			let findWinning = winnings.find(winning => winning.id === item.id);

			if(findWinning)
				return setWinnings(winnings.filter(winning => winning.id !== item.id));

			item.gift_id = selectedGift.id;

			return setWinnings([...winnings, item]);
		}
	};

    const loadMore = () => {
    	if(loading)
    		return null;

    	setLoading(true);

    	params.page += 1;

    	setParams(params);

    	axios.get("/api/participants", {
    		params: params
		}).then(response => {
			setItems({
				meta: response.data.meta,
				data: [...items.data, ...response.data.data]
			});

			setLoading(false);
		});
	};

    return (
        <div className={'page index'} id="participants">
			<ChoiceWinnings winnings={winnings} className={"pop type02"} event={event} setEvent={setEvent} setSelectedGift={setSelectedGift} selectedGift={selectedGift} setParams={setParams} params={params} setActive={setActive}/>

            <div className="clearfix"><p className="page-title">참여자 목록</p>
    
                <div className="btns align-right">
					{event.winnings && event.winnings.data.length !== 0 ? 
                        <Fragment>
                            <a href={`/winnings/export/${match.params.event_id}`} download={true} className="btn btn-text bg-accent">당첨자 엑셀다운</a>
                            <Link to={"/winnings/" + match.params.event_id} className="btn btn-text bg-primary">당첨자 공지보기</Link>
                        </Fragment>
                        : null
					}

                    <button className="btn btn-text bg-primary" onClick={() => {store.dispatch(setPop("당첨자 뽑기", false)); setActive(true);}}>당첨자 뽑기</button>
                </div>
            </div>

            <table className={`table type01 ${active ? "active" : ""}`}>
				<colgroup>
					<col style={{width: "10%"}}/>
					<col style={{width: "20%"}}/>
					<col style={{width: "10%"}}/>
					<col style={{width: "15%"}}/>
					<col style={{width: "20%"}}/>
					<col style={{width: "35%"}}/>
				</colgroup>
				<thead>
					<tr>
						<th>썸네일</th>
						<th>닉네임</th>
						<th>이름</th>
						<th>전화번호</th>
						<th>플랫폼</th>
						<th>링크</th>
					</tr>
				</thead>
				<tbody>
				{items.data.map(item =>
					<tr key={item.id} onClick={() => choice(item)} className={winnings.find(winning => winning.id === item.id) ? "active" : ""}>
						<td>
							<img src={item.thumbnail} alt=""/>
						</td>
						<td>{item.nickname}</td>
						<td>{item.name}</td>
						<td>{item.phone}</td>
						<td>{item.platform}</td>
						<td className={"align-left"}>
                            <a href={item.url} target={"_blank"} title={"새창열림"} onClick={e => e.stopPropagation()}>{item.url}</a>
                        </td>
					</tr>
				)}
				</tbody>
			</table>

			{items.meta.current_page < items.meta.last_page ? <button className="btn-full bg-primary" onClick={loadMore} style={{marginTop:"30px"}}>더보기</button> : null}

        </div>
    );
};

export default Index;
