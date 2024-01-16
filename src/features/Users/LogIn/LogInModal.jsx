import React from 'react';
import {LogInLayout} from "./ModelLayout";
import {useInput} from "../../../hooks/useInput";
import {authInstance} from "../../../apis/utils/instance";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {isLogInSuccessAtom} from "../../../store/flagState";

function LogInModal({setIsModalOpen}) {
    const navigate = useNavigate()
    const [isLogInSuccess,setIsLogInSuccess] = useAtom(isLogInSuccessAtom)
    const [handleInputChg, inputFormState] = useInput({
        email: "",
        password: ""
    })
    console.log(inputFormState)
    const logInFormOnSubmit = async (e) => {
        e.preventDefault()
        const result = await authInstance.post("/auths/login", inputFormState)
        try {
            console.log(result)
            if (result.status === 200) {
                console.log(result.data)
                localStorage.setItem("accessToken", result.data.accessToken)
                localStorage.setItem("refreshToken", result.data.refreshToken)
                setIsLogInSuccess(!isLogInSuccess)
                alert("로그인을 완료하였습니다.")
                navigate("/")
            }
        } catch (err) {
            console.log("실패")
            alert("서버 통신 실패")
        }
    }

    return (
        <LogInLayout>
            <form onSubmit={logInFormOnSubmit}>
                <span onClick={() => {
                    setIsModalOpen(false)
                }}>취소</span>
                <p>이메일</p>
                <input type={"text"} name={"email"} onChange={handleInputChg}/>
                <br/>
                <p>비밀번호</p>
                <input type={"password"} name={"password"} onChange={handleInputChg}/>
                <br/>
                <button type={"submit"}>로그인</button>
            </form>
        </LogInLayout>
    );
}

export default LogInModal;