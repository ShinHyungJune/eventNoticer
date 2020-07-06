import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {setPop} from "../../actions/commonActions";
import ChoiceWinnings from '../../components/ChoiceWinnings';

const Index = ({match}) => {
    let [event, setEvent] = useState({
		gifts: [],
	});

    let [word, setWord] = useState("");
    
    let labels = {
        "FACEBOOK" : "페이스북",
        "YOUTUBE" : "유튜브",
        "INSTAGRAM" : "인스타그램",
        "NAVER" : "네이버 블로그",
        "UNKNOWN" : "기타"
    };

    useEffect(() => {
    	$("#app").addClass("announce");

		axios.get("/api/winnings?event_id=" + match.params.event_id)
			.then(response => {
				setEvent(response.data.data);
			});
    }, []);

    const changeWord = (e) => {
    	setWord(e.target.value);
	};

    return (
        <div>
			<p className="announce-title">
                {event.img ? <img src={event.img.url} alt=""/> : event.title}
				<br/><span className="point">당첨자 발표</span>
			</p>

			<div className="input-search announce-search">
				<input type="text" placeholder={"검색어를 입력하세요."} onChange={changeWord}/>
			</div>

			{event.gifts.map(gift =>
				<div className="gift" key={gift.id}>
					<p className="gift-title">{gift.title} 당첨자</p>

					{Object.entries(gift.platforms).map((platform, index) => {
							if (platform[1].data.length !== 0)
								return (<div className="platform" key={index}>
									{platform[0] !== "UNKNOWN" ? <p className="platform-title">{labels[platform[0]]}</p> : null}
									<div className="winnings">
										{platform[1].data.map(winning => {
											if(winning.name && winning.name.includes(word) || winning.nickname && winning.nickname.includes(word) || winning.phone && winning.phone.includes(word))
												return <div className="winning" key={winning.id}>
													<img src={winning.thumbnail} alt="" className="winning-img"/>

													<div className="winning-texts">
														<p className="winning-texts-title">{winning.nickname ? winning.nickname : winning.name}</p>
														<p className="winning-texts-sub">{winning.phone ? `(${winning.phone})` : ""}</p>
													</div>
												</div>
										})}
									</div>
								</div>);
					})}

				</div>
			)}

        </div>
    );
};

export default Index;
