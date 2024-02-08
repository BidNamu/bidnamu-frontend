import {authInstance, instance, multipartInstance} from "../apis/utils/instance";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {isLogInSuccessAtom} from "../store/flagState";


function usePostWithFiles(url) {
    return async (inputFormState) => {
        const {images, ...rest} = inputFormState
        const formData = new FormData()
        Array.from(images).forEach(img => {
            formData.append('images', img)
        })
        formData.append(
            'body',
            new Blob([JSON.stringify(rest)], {type: "application/json"})
        );
        try {
            const result = await multipartInstance.post(url, formData);
            console.log(result)
            if (result.status === 200) {
                alert("회원가입을 완료하였습니다.")
            }
        } catch (err) {
            console.dir(err)
            alert("서버 통신 실패")
        }
    }
}

function usePost(url) {
    const navigate = useNavigate()
    const [isLogInSuccess, setIsLogInSuccess] = useAtom(isLogInSuccessAtom)
    return async (inputFormState) => {
        console.log(inputFormState)
        try {
            const result = await authInstance.post(url, inputFormState);
            //회원가입:authInstance
            console.log(result)
            if (result.status === 201) {
                alert("회원가입을 완료하였습니다.")
                navigate("/")
            }
            if (result.status === 200) {
                localStorage.setItem("accessToken", result.data.accessToken)
                localStorage.setItem("refreshToken", result.data.refreshToken)
                setIsLogInSuccess(!isLogInSuccess)
                alert("로그인을 완료하였습니다.")
                navigate("/")
            }
        } catch (err) {
            alert("서버 통신 실패")
        }
    }
}

function useGet(url) {
    const [data, setData] = useState([])
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const result = await instance.get(url);
            //회원가입:authInstance
            if (result.status === 200) {
                setData(result.data)
                console.log(result.data)
            }
        } catch (err) {
            console.log(err)
            alert("서버 통신 실패")
        }
    }
    return data
}


export {usePostWithFiles, usePost, useGet}

