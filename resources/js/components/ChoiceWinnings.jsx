import React, {Fragment, useState, useEffect} from 'react';
import Pop from '../components/common/Pop';
import Form from '../components/common/Form';
import {setFlash, setPop} from "../actions/commonActions";

const ChoiceWinnings = ({winnings, className, event, setEvent, setSelectedGift, selectedGift, setParams, params, setActive}) => {

	let [word, setWord] = useState("");

	const changeParams = (e) => {
		setParams({
			...params,
			page: 1,
			[e.target.name] : e.target.value
		});
	};

	const search = (e) => {
		e.preventDefault();

		setParams({
			...params,
			page: 1,
			word : word
		});
	};

	const changeWord = (e) => {
		setWord(e.target.value);
	};

	const announce = () => {
		axios.patch("/api/participants/announce", {
			winnings: winnings.map(winning => {
				if(winning.gift_id)
					return winning;
			}),
			event_id: event.id
		}).then(response => {
			window.store.dispatch(setFlash(response.data.message));

			window.store.dispatch(setPop(""));

			setEvent(response.data.data);
		});

	};

	return (
		<Pop name={"당첨자 뽑기"} className={className} onClose={() => setActive(false)}>
			<div className="input-search">
				<form action="" onSubmit={search}>
					<input name={"word"} type="text" placeholder={"공지용 이름 | 이름"} onChange={changeWord} value={word}/>
				</form>
			</div>
			<div className="input-select">
				<select name="platform" id="" onChange={changeParams}>
					<option value="">전체</option>
					<option value="NAVER">네이버</option>
					<option value="FACEBOOK">페이스북</option>
					<option value="INSTAGRAM">인스타그램</option>
					<option value="UNKNOWN">UNKNOWN</option>
				</select>
			</div>
			<table className={"table type01"}>
				<colgroup>
					<col style={{width:"40%"}}/>
					<col style={{width:"30%"}}/>
					<col style={{width:"30%"}}/>
				</colgroup>
				<thead>
					<tr>
						<th>경품</th>
						<th>플랫폼</th>
						<th>당첨자수</th>
					</tr>
				</thead>
				<tbody>
				{event.gifts.map(gift =>
					<Fragment key={gift.id}>
						<tr>
							<td rowSpan={"4"} onClick={() => setSelectedGift(gift)} style={{cursor:"pointer"}}>
								{gift.title}
								{selectedGift === gift ? <p className="sub align-center">(뽑는중)</p> : null}
							</td>
							<td>페이스북</td>
							<td>{winnings.filter(winning => winning.gift_id === gift.id && winning.platform === "FACEBOOK").length}</td>
						</tr>
						<tr>
							<td>네이버</td>
							<td>{winnings.filter(winning => winning.gift_id === gift.id && winning.platform === "NAVER").length}</td>
						</tr>
						<tr>
							<td>인스타그램</td>
							<td>{winnings.filter(winning => winning.gift_id === gift.id && winning.platform === "INSTAGRAM").length}</td>
						</tr>
						<tr>
							<td>기타</td>
							<td>{winnings.filter(winning => winning.gift_id === gift.id && winning.platform === "UNKNOWN").length}</td>
						</tr>
					</Fragment>
				)}
				</tbody>
			</table>

			<button className="pop-btn" onClick={announce}>뽑기</button>
		</Pop>
	);
};

export default ChoiceWinnings;