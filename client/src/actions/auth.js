import { SUCCESS_LOGIN, FAIL_LOGIN } from './types';

export const successLogin = (token, user) => dispatch => {
    dispatch({
        type: SUCCESS_LOGIN,
        payload : { token, user } 
    });
}

export const failLogin = () => dispatch => {
    dispatch({
        type: FAIL_LOGIN
    });
}