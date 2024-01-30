import {authInstance, multipartInstance} from "../apis/utils/instance";
import {useNavigate} from "react-router-dom";


function usePostWithFiles(inputFormState, imgList, url) {
    const submitWithFiles = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        imgList.forEach(img => {
            formData.append('images', img)
        })
        formData.append(
            'body',
            new Blob([JSON.stringify(inputFormState)], {type: "application/json"})
        );
        try {
            const result = await multipartInstance.post(url, formData);
            console.log(result)
            if (result.status === 200) {
                alert("회원가입을 완료하였습니다.")
            }
        } catch (err) {
            console.log("실패")
            alert("서버 통신 실패")
        }
    }

    return [submitWithFiles]
}

function usePost(url) {
    const navigate = useNavigate()
    return async (inputFormState) => {
        console.log(inputFormState)
        try {
            const result = await authInstance.post(url,inputFormState);
            //회원가입:authInstance
            console.log(result)
            if (result.status === 201) {
                alert("회원가입을 완료하였습니다.")
                navigate("/")
            }
        } catch (err) {
            console.log(err)
            alert("서버 통신 실패")
        }
    }
}



export {usePostWithFiles, usePost}

