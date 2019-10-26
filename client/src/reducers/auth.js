import { SUCCESS_LOGIN, FAIL_LOGIN } from '../actions/types';

const initialState = { 
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SUCCESS_LOGIN:
            localStorage.setItem('token', payload.token);
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case FAIL_LOGIN:
            localStorage.removeItem('token');
            return {
                ...state,                
                token: null, 
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default: 
            return state;
    }
}