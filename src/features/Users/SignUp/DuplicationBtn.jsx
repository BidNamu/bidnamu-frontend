import React from 'react';
import axios from "../../../apis/utils/instance"

function DuplicationBtn({targetValue, type}) {
    const duplicationCheck = async () => {
        let endPoint = ""
        if (type === "nickname") {
            endPoint = `users/nickname/duplicated/${targetValue}`
        }
        if (type === "email") {
            endPoint = `users/email/duplicated/${targetValue}`
        }
        try {
            const result = await axios.get(endPoint)
            if (result.status === 200) {
                alert(`사용가능한 ${type}입니다.`)
                return
            }
            if (result.status === 409) {
                alert(`중복된 ${type} 입니다.`)
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