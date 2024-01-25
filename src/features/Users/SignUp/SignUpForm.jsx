import React from 'react';
import {SignUpFormLayout} from "./SignUpFormLayout";
import {useNavigate} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import {useGetAvailability, usePost} from "../../../hooks/useFetch";
import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {authInstance} from "../../../apis/utils/instance";

const REGEX = {
    nickname: /^[^\s]*$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).*$/
}

function SignUpForm(props) { //닉네임(중복확인), 이메일(중복확인), 비밀번호
    const {
        control, register,
        getValues,
        formState: {errors}, handleSubmit
    } = useForm({
        defaultValues: {
            nickname: "",
            email: "",
            password: ""
        }
        //mode 의 디폴트는 onSubmit
    })
    const [submitForPost] = usePost({
        nickname: getValues().nickname,
        email: getValues().email,
        password: getValues().password
    }, "/users")

    const getAvailability = useGetAvailability()

    const nicknameRegister = register(
        "nickname", {
            required: "닉네임을 입력해주세요.",
            pattern: {value: REGEX.nickname, message: "공백은 허용하지 않습니다."},
            minLength: {value: 5, message: "5자 이상 입력해주세요."},
            maxLength: {value: 15, message: "15자 이하 입력해주세요."},
            validate: {
                nicknameCheck: async (fieldValue) => {
                    return await getAvailability(fieldValue, "nickname") || "닉네임이 이미 존재합니다"
                }
            }
        }
    )
    const emailRegister = register(
        "email", {
            required: "이메일을 입력해주세요.",
            pattern: {value: REGEX.email, message: "올바른 이메일 형식이 아닙니다."},
            minLength: {value: 6, message: "6자 이상 입력해주세요."},
            maxLength: {value: 320, message: "320자 이하 입력해주세요."},
            validate: {
                emailCheck: async (fieldValue) => {
                    return await getAvailability(fieldValue, "email") || "이메일이 이미 존재합니다"
                }
            }
        })
    const passwordRegister = register(
        "password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {value: REGEX.password, message: "8자이상 소문자 대문자 특수문자 포함 해야합니다."},
            minLength: {value: 8, message: "8자 이상 입력해주세요."},
            maxLength: {value: 20, message: "20자 이하 입력해주세요."},
        })
    const passwordCheckRegister = register(
        "passwordCheck", {
            required: "비밀번호를 재입력해주세요.",
            pattern: {value: REGEX.password, message: "8자이상 소문자 대문자 특수문자 포함 해야합니다."},
            minLength: {value: 8, message: "8자 이상 입력해주세요."},
            maxLength: {value: 20, message: "20자 이하 입력해주세요."},
        }
    )

    return (
        <SignUpFormLayout>
            <form onSubmit={handleSubmit(submitForPost)}>
                <h2>회원가입</h2>
                <p>닉네임</p>
                <input
                    {...nicknameRegister} type={"text"}
                />
                <p> {errors.nickname?.message}</p>
                <br/>
                <p>이메일</p>
                <input {...emailRegister} type={"email"}/>
                <p> {errors.email?.message}</p>
                <br/>
                <p>비밀번호</p>
                <input {...passwordRegister}
                       type={"password"} name={"password"}
                       placeholder={"8자이상 소문자 대문자 특수문자 포함"}/>
                <p> {errors.password?.message}</p>
                <br/>
                <p>비밀번호 확인</p>
                <input {...passwordCheckRegister} type={"password"} placeholder={"8자이상 소문자 대문자 특수문자 포함"}/>
                <p> {errors.passwordCheck?.message}</p>
                <br/>
                <button type={"submit"}>회원가입</button>
            </form>
            <DevTool control={control}/>
        </SignUpFormLayout>
    );
}

export default SignUpForm;