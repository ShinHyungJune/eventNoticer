import React, {Fragment, useEffect, useState} from 'react';
import Form from '../../components/common/Form';

const Create = ({history}) => {
    
    return (
        <div className={'page create'}>
            <div className="clearfix">
                <p className="page-title">이벤트 생성</p>
            </div>
            
            <Form method={"post"} url={"/api/events"} enterSubmitDisabled={true} onThen={() => history.goBack()}>
                <input type="img" title={"제목 이미지"} name={"img"}/>
                
                <input type="text" title={"이벤트명"} name={"title"}/>
    
                <input type="tags" title={"경품"} name={"gifts"}/>
                
                <button type={"submit"} className="btn-full bg-accent">생성하기</button>
            </Form>
        </div>
    );
};

export default Create;
