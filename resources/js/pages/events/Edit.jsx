import React, {Fragment, useEffect, useState} from 'react';
import Form from '../../components/common/Form';

const Edit = ({match, history}) => {
    let [defaultForm, setDefaultForm] = useState({});
    
    useEffect(() => {
        axios.get("/api/events/" + match.params.id)
            .then(response => {
                setDefaultForm(response.data.data);
                console.log(response.data.data);
            })
    }, []);
    
    return (
        <div className={'page create'}>
            <div className="clearfix">
                <p className="page-title">이벤트 생성</p>
            </div>
            
            <Form method={"patch"} url={"/api/events/" + match.params.id} enterSubmitDisabled={true} defaultForm={defaultForm} onThen={() => history.goBack()}>
                <input type="text" title={"이벤트명"} name={"title"}/>
    
                <input type="tags" title={"경품"} name={"gifts"}/>
                
                <button type={"submit"} className="btn-full bg-accent">수정하기</button>
            </Form>
        </div>
    );
};

export default Edit;
