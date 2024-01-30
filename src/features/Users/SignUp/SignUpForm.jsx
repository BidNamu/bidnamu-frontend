import React from 'react';
import {SignUpFormLayout} from "./SignUpFormLayout";
import {usePost} from "../../../hooks/useFetch";
import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {signUpValid} from "../../../lib/validList";
import {yupResolver} from "@hookform/resolvers/yup";

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
        },
        mode: "onChange",
        resolver: yupResolver(signUpValid),
    })

    const submitForPost = usePost({
        nickname: getValues().nickname,
        email: getValues().email,
        password: getValues().password
    }, "/users")

    return (
        <SignUpFormLayout>
            <form onSubmit={handleSubmit(submitForPost)}>
                <h2>회원가입</h2>
                <p>닉네임</p>
                <input type={"text"}
                       {...register("nickname")}/>
                <p> {errors.nickname?.message}</p>
                <br/>
                <p>이메일</p>
                <input type={"email"} {...register("email")}/>
                <p> {errors.email?.message}</p>
                <br/>
                <p>비밀번호</p>
                <input
                    type={"password"}
                    {...register("password")}
                    placeholder={"8자이상 소문자 대문자 특수문자 포함"}/>
                <p> {errors.password?.message}</p>
                <br/>
                <p>비밀번호 확인</p>
                <input type={"password"}
                       {...register("passwordCheck")}
                       placeholder={"8자이상 소문자 대문자 특수문자 포함"}/>
                <p> {errors.passwordCheck?.message}</p>
                <br/>
                <button type={"submit"}>회원가입</button>
            </form>
            <DevTool control={control}/>
        </SignUpFormLayout>
    );
}

export default SignUpForm;