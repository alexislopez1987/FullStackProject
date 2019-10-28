import { SEND_ALERT, REMOVE_ALERT } from './types';

export const sendAlert = (message, alertType) => dispatch => {
    dispatch({
        type: SEND_ALERT,
        payload : { message, alertType } 
    });

    setTimeout(() => dispatch({ 
        type: REMOVE_ALERT 
    }), 3000);
}