import { SUCCESS_LOGIN, FAIL_LOGIN } from './types';
import { sendAlert } from './alerts';
import { SUCCESS, ERROR } from './../utils/alertTypes';
import API from './../utils/API';
import qs from 'querystring';

export const login = (email, password) => async dispatch => {

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
            { email: user.email }
        ));

    } catch (err) {
        dispatch(failLogin());
    }
}

export const successLogin = (token, user) => dispatch => {
    dispatch({
        type: SUCCESS_LOGIN,
        payload : { token, user } 
    });

    dispatch(sendAlert('User Logged in', SUCCESS));
}

export const failLogin = () => dispatch => {
    dispatch({
        type: FAIL_LOGIN
    });

    dispatch(sendAlert('Error in login', ERROR));
}