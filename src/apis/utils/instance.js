import axios from "axios";
import base64 from "base-64"

const API_KEY = process.env.REACT_APP_API_KEY;

export const authInstance = axios.create({
    baseURL: API_KEY,
    //timeout:1000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const instance = axios.create({
    baseURL: API_KEY,
    //timeout:1000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
})

export const multipartInstance = axios.create({
    baseURL: API_KEY,
    //timeout:1000,
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
})

// timestamp : 1970년 1월 1일 00:00:00 UTC(협정 세계시)를 시작점으로 하여 그 시점부터의 경과 시간을 초 단위로 나타내는 시간 코드
const setupInterceptor = (instance) => {
    instance.interceptors.request.use(
        async (config) => {
            const accessToken = localStorage.getItem("accessToken")
            const refreshToken = localStorage.getItem("refreshToken")
            if (!expValidation(accessToken) && expValidation(refreshToken)) {
                console.log(config)
                await fetchReissue(refreshToken, accessToken)
            }
            if (!expValidation(refreshToken)) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                alert("토큰이 만료되었습니다. 로그인을 다시 해주세요.")
            }
            return config
        }, function (err) {
            return Promise.reject(err)
        }
    )
}

// 각 인스턴스에 대해 인터셉터 설정
setupInterceptor(instance);
setupInterceptor(multipartInstance);

const expValidation = (token) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const {exp} = JSON.parse(base64.decode(token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'))));
    return exp >= currentTimestamp;
}

const fetchReissue = async (refreshToken, accessToken) => {
    try {
        const result = await instance.post("/auth/reissue", {
            refreshToken
        })
        if (result.status === 200) {
            localStorage.setItem("accessToken", result.data.accessToken)
            localStorage.setItem("refreshToken", result.data.refreshToken)
            return result.data.accessToken;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}
