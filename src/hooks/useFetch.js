import {multipartInstance} from "../apis/utils/instance";


function usePostWithFiles(inputFormState, imgList, url) {
    const submitForFetch = async (e) => {
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

    return [submitForFetch]
}

export {usePostWithFiles}

