import React from 'react';
import {authInstance} from "../../../apis/utils/instance"

function DuplicationBtn({setIsDuplicationOk, targetValue, type}) {
    const isDuplication = (type) => {
        if (type === "nickname") {
            return setIsDuplicationOk((prev) => ({...prev, nicknameDuplicationOk: true}))
        }
        if (type === "email") {
            return setIsDuplicationOk((prev) => ({...prev, emailDuplicationOk: true}))
        }
    }
    const duplicationCheck = async () => {
        let endPoint = ""
        if (type === "nickname") {
            endPoint = `users/nickname/duplicated/${targetValue}`
        }
        if (type === "email") {
            endPoint = `users/email/duplicated/${targetValue}`
        }
        try {
            const result = await authInstance.get(endPoint)
            if (result.status === 200) {
                isDuplication(type)
                return alert(`사용가능한 ${type}입니다.`)
            }
            if (result.status === 409) {
                return alert(`중복된 ${type} 입니다.`)
            }
        } catch (err) {
            console.log(err.message)
            alert("서버 통신 실패")
        }
    }

    return (
        <button type={"button"} onClick={duplicationCheck}>중복확인</button>
    );
}

export default DuplicationBtn;