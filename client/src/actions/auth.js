import { SUCCESS_LOGIN, FAIL_LOGIN, RELOAD_USER, LOGOUT } from './types';
import { sendAlert } from './alerts';
import { SUCCESS, ERROR } from './../utils/alertTypes';
import API from './../utils/API';
import qs from 'querystring';
import setAuthTokenToReqApi from './../utils/setAuthTokenToReqApi';

export const login = (email, password, history) => async dispatch => {

    try {

        const user = {
            email,
            password
        };

        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }

        const resp = await API.post('/login', qs.stringify(user), config); 

        dispatch(successLogin(
            resp.headers["auth-token"], 
            resp.data
        ));

        const miliseconds = parseInt(resp.headers["expiresin"]) * 1000;
        
        setTimeout(() => 
            dispatch(tokenExpired(history)), miliseconds
        );

    } catch (err) {
        dispatch(failLogin(err.response.data.error));
    }
}

export const successLogin = (token, user) => dispatch => {
    dispatch({
        type: SUCCESS_LOGIN,
        payload : { token, user } 
    });
    setAuthTokenToReqApi(token);
    dispatch(sendAlert('User Logged in', SUCCESS));
}

export const failLogin = (errorMessage) => dispatch => {
    dispatch({
        type: FAIL_LOGIN
    });
    setAuthTokenToReqApi();

    if (errorMessage !== '') {
        dispatch(sendAlert(errorMessage, ERROR));
    }else {
        dispatch(sendAlert('Error in login', ERROR));
    } 
}

export const reloadUser = (token) => dispatch => {
    setAuthTokenToReqApi(token);
    dispatch({
        type: RELOAD_USER,
        payload : { token }
    });
}

export const logout = () => dispatch => {
    dispatch({ 
        type: LOGOUT 
    });

    setAuthTokenToReqApi();
    dispatch(sendAlert('User logout', SUCCESS));
};

export const tokenExpired = (history) => dispatch => {
    dispatch(logout());
    dispatch(sendAlert('Token expired', SUCCESS));
    history.push("/");
};