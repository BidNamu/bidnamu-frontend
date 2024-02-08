import React from 'react';
import {LogInLayout} from "./ModelLayout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {logInValid} from "../../../lib/validList";
import {usePost} from "../../../hooks/useFetch";


function LogInModal({setIsModalOpen}) {
    const {
        register,
        formState: {errors}, handleSubmit
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(logInValid),
    })

    const submitForPost = usePost("/auths/login")
    return (
        <LogInLayout>
            <form onSubmit={handleSubmit(submitForPost)}>
                <button onClick={() => {
                    setIsModalOpen(false)
                }}>취소
                </button>
                <p>이메일</p>
                <input type={"email"} {...register("email")}/>
                <p> {errors.email?.message}</p>
                <br/>
                <p>비밀번호</p>
                <input type={"password"} {...register("password")}/>
                <p> {errors.password?.message}</p>
                <br/>
                <button type={"submit"}>로그인</button>
            </form>
        </LogInLayout>
    );
}

export default LogInModal;