import {REGEX} from "./regex";
import * as yup from 'yup';
import EmpApi from "../apis/api/EmpApi";

export const signUpValid = yup.object({
        nickname: yup.string()
            .required("닉네임을 입력해주세요.")
            .min(5, "5자 이상 입력해주세요.")
            .max(15, "15자 이하 입력해주세요.")
            .matches(REGEX.nickname, "공백은 허용하지 않습니다.")
            .test('nicknameCheck',
                '닉네임이 이미 존재합니다',
                (value) => {
                if(value ) {
                    return EmpApi.duplication("nickname", value)
                }
                }),
        email: yup.string()
            .required("이메일을 입력해주세요")
            .min(6, "6자 이상 입력해주세요.")
            .max(320, "320자 이하 입력해주세요.")
            .matches(REGEX.email, "올바른 이메일 형식이 아닙니다.")
            .test('emailCheck',
                '닉네임이 이미 존재합니다',
                (value) => {
                    if(value ) {
                        return EmpApi.duplication("email", value)
                    }
                }),
        password: yup.string()
            .required("비밀번호를 입력해주세요")
            .min(8, "8자 이상 입력해주세요.")
            .max(20, "20자 이하 입력해주세요.")
            .matches(REGEX.password, "8자이상 소문자 대문자 특수문자 포함 해야합니다."),
        passwordCheck: yup.string()
            .required("비밀번호를 한번더 입력해주세요")
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
        //입력받은 값이 yup.ref('password') 또는 null에 해당하는 값 중 하나인지 검사
    }
)
