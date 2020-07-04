import React, {Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import AuthRoute from './components/common/AuthRoute';
import store from './store';
import {connect} from "react-redux";

import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import SendResetPassword from './pages/SendResetPassword';
import ResetPassword from './pages/ResetPassword';
import Flash from './components/common/Flash';
import Events from "./pages/events/Index";
import EventsCreate from "./pages/events/Create";
import EventsShow from './pages/events/Show';
import EventsEdit from './pages/events/Edit';

import {setScrollActive} from "./actions/commonActions";

const Index = () => {
    const html = document.querySelector("html");

	useEffect(() => {
        window.addEventListener("scroll", onScroll);


        // https://www.facebook.com/**5550296508**/photos/10154246192721509 // 별표친 부분이 아이디야
		// https://www.facebook.com~~~~/&id=1230401230 // id 파라미터가 아이디야
		// https://www.facebook.com/genyoung.jeong/posts/3260142810739530 // 닉네임 이건 axios.get으로 해당 주소 그대로 요청하면 config.url에서 아이디 얻을 수 있어

		console.log(getPaths("https://www.facebook.com/**5550296508**/photos/10154246192721509"));
        axios.get("http://graph.facebook.com/100016947091727/picture?type=square")
			.then(response => {
				console.log(response);
			});

        axios.get("https://www.facebook.com/genyoung.jeong/posts/3260142810739530")
			.then(response => {
				console.log(response);

			})
    }, []);
    
    const onScroll = (e) => {
        if(html.getBoundingClientRect().top === 0)
            return store.dispatch(setScrollActive(false));
    
        return store.dispatch(setScrollActive(true));
    };
    
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Flash />
                    
                    <Header />
                    
                    <div className="wrap-contents">
                        <Switch>
                            <AuthRoute exact path="/" component={Events} />
                            <AuthRoute exact path="/events" component={Events} />
                            <AuthRoute exact path="/events/create" component={EventsCreate} />
                            <AuthRoute exact path="/events/edit/:id" component={EventsEdit} />
                            <AuthRoute exact path="/events/:id" component={EventsShow} />

                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/sendResetPasswordMail" component={SendResetPassword} />
                            <Route exact path="/passwordReset" component={ResetPassword} />
                            
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index/>, document.getElementById('app'));
}

