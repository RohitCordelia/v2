// hooks/useValidateToken.ts
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GetAuth, SaveAuth, SetLocalStorage, GetLocalStorage } from '../utils/store/store';
import { useRefreshTokenMutation } from '../services/OTPLessAuth/OTPLessAuth';
import moment from 'moment';
interface JwtPayload {
    exp: number;
    [key: string]: any;
}

const useValidateToken = () => {

    const AUTH = GetAuth();
    const [refreshToken] = useRefreshTokenMutation();

    useEffect(() => {
        const _st = window.sessionStorage.getItem('_st')
        if(!_st){
            sessionStorage.setItem('_st', moment().toISOString());
        }
    }, []);


    useEffect(() => {
        if (!AUTH.token) return;

        try {
            const decoded = jwtDecode<JwtPayload>(AUTH.token);
            if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
                refreshToken({ refreshToken: AUTH.refreshToken })
                    .unwrap()
                    .then((response) => {
                        const resData = {
                            ...AUTH,
                            exp: response?.result?.exp,
                            token: response?.result?.token,
                            refreshToken: response?.result?.refreshToken
                        }
                        SaveAuth(resData)
                    })
                    .catch((err) => {
                        localStorage.removeItem("auth");
                    });
            }
        } catch (err) {
            localStorage.removeItem("auth");
        }

    }, [AUTH.token])
};

export default useValidateToken;