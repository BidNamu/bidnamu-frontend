import React, {useState} from 'react';
import {LogoImg, UserAuthDiv} from "./HeaderLayout";
import {useAtom, useAtomValue} from "jotai";
import {signUpPopupAtom} from "../../../store/flagState"
import {Link} from "react-router-dom";
import LogInModal from "../../Users/LogIn/LogInModal";
import {logInAtom} from "../../../store/userInfo";

function Header(props) {
    const [isModalOpen, setIsModalOpen] = useAtom(signUpPopupAtom)
    const logInState = useAtomValue(logInAtom)
    return (
        <>
            <Link to={"/"}>
                <LogoImg src={require("../../../assets/img/logo1.jpg")} width={80} height={80}
                         alt={"React"}/></Link>
            {logInState.isLogIn ?
                <UserAuthDiv>
                    <h3>{logInState.nickname}님 반갑습니다.</h3>
                </UserAuthDiv>
                :
                <UserAuthDiv>
                    <Link to={"/sign-up"}><h3>회원가입</h3></Link>
                    <h3 onClick={() => setIsModalOpen(true)}>로그인</h3>
                </UserAuthDiv>}
            {isModalOpen && <LogInModal setIsModalOpen={setIsModalOpen}/>}
        </>
    );
}

export default Header;