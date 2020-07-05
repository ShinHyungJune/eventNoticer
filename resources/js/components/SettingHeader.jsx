import React, {useState, useEffect, Fragment} from 'react';
import Pop from '../components/common/Pop';
import Form from '../components/common/Form';
import {setFlash, setPop} from "../actions/commonActions";

const SettingHeader = ({rows, event_id, history}) => {
	let [loading, setLoading] = useState(false);

	let form = {
		event_id: event_id,
		participants: []
	};

	let [settingHeaders, setSettingHeaders] = useState({
		nickname: {
			title: "닉네임",
			hidden: false,
			name: "nickname",
			value: null,
		},
		name: {
			title: "이름",
			hidden: false,
			name: "name",
			value: null
		},
		phone: {
			title: "전화번호",
			hidden: false,
			name: "phone",
			value: null,
		},
		platform: {
			title: "플랫폼",
			hidden: false,
			name: "platform",
			value: null
		},
		url : {
			title: "링크",
			hidden: false,
			name: "url",
			value: null
		}
	});

	let [headers, setHeaders] = useState([]);

	useEffect(() => {
		if(rows[0])
			setHeaders(Object.keys(rows[0]));
	}, [rows]);

	const classify = (e) => {
		setLoading(true);

		e.preventDefault();

		form.participants = rows.map(row => {
			let data = {};
			let thumbnail = "";

			headers.map(header => {
				Object.entries(settingHeaders).map(settingHeader => {
					if(settingHeader[1].value === header && !settingHeader[1].hidden) {
						// 플랫폼 가공
						if(settingHeader[0] === "platform"){
							if(row[header].includes("블로그") || row[header].includes("네이버"))
								row[header] = "NAVER";
							else if(row[header].includes("페이스북")) {
								row[header] = "FACEBOOK";

								if(!settingHeaders["url"].hidden){
									thumbnail = getFacebookThumbnail(row[settingHeaders["url"].value]);
								}
							}
							else if(row[header].includes("인스타그램"))
								row[header] = "INSTAGRAM";
							else
								row[header] = "UNKNOWN";
						}

						// identifier가 null일 경우 처리
						if(!row[header]){
							row[header] = "알 수 없음";
						}

						// 데이터 저장
						data[settingHeader[0]] = row[header];
						data["event_id"] = event_id;
						data["thumbnail"] = thumbnail;
					}
				});
			});

			return data;
		});

		axios.post("/api/participants", form)
			.then(response => {
				setLoading(false);

				window.store.dispatch(setFlash(response.data.message));

				window.store.dispatch(setPop(""));

				history.push("/participants/" + event_id);
			});
	};

	const changeSettingHeaders = (e) => {
		setSettingHeaders({
			...settingHeaders,
			[e.target.name] : {
				...settingHeaders[e.target.name],
				value : e.target.value
			}
		});
	};

	const hideSettingHeader = (name) => {
		setSettingHeaders({
			...settingHeaders,
			[name] : {
				...settingHeaders[name],
				hidden: true
			}
		});
	};

	const getFacebookThumbnail = (url) => {
		let urls = window.getUrls(url);

		if(urls)
			url = urls[0];

		let params = window.getParams(url);

		if(params && params.has("id")) // https://www.facebook.com~~~~/&id=1230401230
			return `http://graph.facebook.com/${params.get("id")}/picture?type=square`;


		let paths = window.getPaths(url); // https://www.facebook.com/5550296508/photos/10154246192721509 // 별표친 부분이 아이디야, https://www.facebook.com/genyoung.jeong/posts/3260142810739530
		let reg = new RegExp('^[0-9]+$');

		if(paths){
			if(reg.test(paths[1])) // 숫자 id
				return `http://graph.facebook.com/${paths[1]}/picture?type=square`;

			axios.get(`https://fb.com/${paths[1]}`) // 문자열 id
				.then(response => {
					let el = document.createElement("html");

					el.innerHTML = response.data;

					let thumbnail = el.querySelector(".profilePicThumb img");

					if(thumbnail)
						return thumbnail.src;
				});
		}

		return "";

		// https://www.facebook.com/**5550296508**/photos/10154246192721509 // 별표친 부분이 아이디야
		// https://www.facebook.com~~~~/&id=1230401230 // id 파라미터가 아이디야
		// https://www.facebook.com/genyoung.jeong/posts/3260142810739530 // 닉네임 이건 axios.get으로 해당 주소 그대로 요청하면 config.url에서 아이디 얻을 수 있어
	};


	return (
		<Pop name={"참여자 등록"}>
			<form onSubmit={classify}>
				{
					Object.entries(settingHeaders).map(settingHeader => {
						if (!settingHeader[1].hidden)
							return (
								<div className="input-wrap" key={settingHeader[0]}>
									<div className="input-title">{settingHeader[1].title} <button type={"button"} onClick={() => hideSettingHeader(settingHeader[0])} className={"input-btn"}>삭제</button></div>

									<div className="input-select">
										<select name={settingHeader[1].name} id="" onChange={changeSettingHeaders}>
											<option value="" disabled={true} selected>선택</option>
											{headers.map((header, index) => <option value={header} key={1 + index}>{header.slice(0, 40)}</option>)}
										</select>
									</div>
								</div>
							)
					})
				}

				{loading ? <button className={"pop-btn"}>등록중...</button> : <button className={"pop-btn"}>등록하기</button>}

			</form>
		</Pop>
	);
};

export default SettingHeader;