import {authInstance} from "../utils/instance";

const EmpApi = {
    duplication: async (type, param) => {
        try {
            //`users/nickname/duplicated/${fieldValue}`
            //회원가입:authInstance
            return await authInstance.get(`users/${type}/duplicated/${param}`)
        } catch (err) {
            console.log(err)
        }
    }
}
export default EmpApi