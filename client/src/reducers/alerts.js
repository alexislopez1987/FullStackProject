import { SEND_ALERT, REMOVE_ALERT } from './../actions/types';

const initialState = { 
    message: '',
    alertType: ''
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SEND_ALERT:
            return {
                ...state, 
                ...payload
            };
        case REMOVE_ALERT:
            return {
                ...state,
                message: '',
                alertType: ''
            };
        default: 
            return state;
    }
}