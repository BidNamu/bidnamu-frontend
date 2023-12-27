import React from 'react';
import {LogInLayout} from "./ModelLayout";



function LogInModal({setIsModalOpen}) {
    return (
        <LogInLayout>
            <form>
                <span onClick={()=>{setIsModalOpen(false)}}>취소</span>
                <p>이메일</p>
                <input type={"text"}/>
                <br/>
                <p>비밀번호</p>
                <input type={"text"}/>
                <br/>
                <button type={"submit"}>로그인</button>
            </form>
        </LogInLayout>
    );
}

export default LogInModal;