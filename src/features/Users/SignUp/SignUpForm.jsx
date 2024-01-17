import React, {useRef, useState} from 'react';
import {SignUpFormLayout} from "./SignUpFormLayout";
import DuplicationBtn from "./DuplicationBtn";
import axios from "../../../apis/utils/instance";
import {useNavigate} from "react-router-dom";

function SignUpForm(props) { //닉네임(중복확인), 이메일(중복확인), 비밀번호
    const navigate = useNavigate()
    const [signUpFormState, setSignUpFormState] = useState({
        nickname: "",
        email: "",
        password: ""
    })
    const [isDuplicationOk, setIsDuplicationOk] = useState(
        {
            nicknameDuplicationOk: false,
            emailDuplicationOk: false
        }
    )

    const checkPwRef = useRef(null)
    const SignUpFormOnChg = (e) => {
        setSignUpFormState((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const formOnSubmit = async (e) => {
        e.preventDefault()
        if (!isDuplicationOk.emailDuplicationOk) {
            return alert("이메일 중복확인을 하세요")
        }
        if (!isDuplicationOk.nicknameDuplicationOk) {
            return alert("닉네임 중복확인을 하세요")
        }
        const result = await axios.post("/users", signUpFormState)
        try {
            console.log(result)
            if (result.status === 201) {
                alert("회원가입을 완료하였습니다.")
                return navigate("/")
            }
            if (result.status === 409) {
                return alert("중복된 정보가 있습니다")
            }
        } catch (err) {
            console.log("실패")
            alert("실패 하였습니다.")
        }

    }

    const checkPwOnChg = (e) => {
        if (signUpFormState.password === e.target.value) {
            checkPwRef.current.innerText = "비밀번호가 일치합니다."
            return
        }
        checkPwRef.current.innerText = "비밀번호가 일치하지 않습니다."
    }


    return (
        <SignUpFormLayout>
            <form onSubmit={formOnSubmit}>
                <h2>회원가입</h2>
                <p>닉네임</p>
                <input type={"text"} name={"nickname"} onChange={SignUpFormOnChg} required/>
                <br/>
                <DuplicationBtn setIsDuplicationOk={setIsDuplicationOk} targetValue={signUpFormState.nickname}
                                type={"nickname"}/> {/*닉네임 중복확인*/}
                <br/>
                <p>이메일</p>
                <input type={"email"} name={"email"} onChange={SignUpFormOnChg} required/>
                <br/>
                <DuplicationBtn setIsDuplicationOk={setIsDuplicationOk} targetValue={signUpFormState.email}
                                type={"email"}/> {/*이메일 중복확인*/}
                <p>비밀번호</p>
                <input type={"password"} name={"password"} onChange={SignUpFormOnChg} required
                       placeholder={"8자이상 소문자 대문자 특수문자 포함"}/>
                <br/>
                <p>비밀번호 확인</p>
                <input type={"password"} onChange={checkPwOnChg} placeholder={"8자이상 소문자 대문자 특수문자 포함"} required/>
                <br/>
                <small ref={checkPwRef}></small>
                <br/>
                <button type={"submit"}>회원가입</button>
            </form>
        </SignUpFormLayout>
    );
}

export default SignUpForm;