import {atom} from "jotai";

export const signUpStateAtom = atom({
    isNicknameOk: false,
    isEmailOk: false,
    isPasswordOk: false,
})

