import React from 'react';
import {useSetAtom} from "jotai";
import {logInAtom} from "../../../store/userInfo";

function LogOutBtn(props) {
    const setLogOut = useSetAtom(logInAtom)
    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setLogOut({
            isLogIn: false,
            nickname: ""
        })
    }
    return (
        <div>
            <span onClick={handleLogOut}>
                <h3>로그아웃</h3>
            </span>
        </div>
    );
}

export default LogOutBtn;