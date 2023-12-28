import React, {useState} from 'react';
import {LogoImg, UserAuthDiv} from "./HeaderLayout";
import LogInModal from "../../Users/LogIn/LogInModal";
import {useAtom} from "jotai";
import {signUpPopupAtom} from "../../../store/flagState"
import {Link} from "react-router-dom";

function Header(props) {
    const [isModalOpen, setIsModalOpen] = useAtom(signUpPopupAtom)
    return (
        <>
            <Link to={"/"}>
                <LogoImg src={require("../../../assets/img/logo1.jpg")} width={80} height={80}
                         alt={"React"}/></Link>
            <UserAuthDiv>
                <Link to={"/sign-up"}><h3>회원가입</h3></Link>
                <h3 onClick={() => setIsModalOpen(true)}>로그인</h3>
            </UserAuthDiv>
            {isModalOpen && <LogInModal setIsModalOpen={setIsModalOpen}/>}
        </>
    );
}

export default Header;