import { SUCCESS_LOGIN, FAIL_LOGIN } from './types';
import { sendAlert } from './alerts';
import { SUCCESS, ERROR } from './../utils/alertTypes';

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