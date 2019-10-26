import React, { Fragment, useState } from 'react';
import API from '../../utils/API';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import qs from 'querystring';
import { withRouter } from "react-router";

const Login = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

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
            ToastsStore.success("User Logged in")
            clearFormData();
            redirect();
        } catch (err) {
            ToastsStore.error("Error " + err.response.data.error);
        }
    }

    const clearFormData = () => {
        setFormData({ 
            ...formData, 
            email: '',
            password: ''
        });
    }

    const redirect = () => {
        setTimeout(() => 
            props.history.push('/items'), 2000 
        );
    }

    return (
        <Fragment>
            <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" 
                           className="form-control" 
                           id="email" 
                           name="email"
                           required
                           value={email}
                           onChange={e => onChange(e)}
                           >  
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                           className="form-control" 
                           id="password" 
                           name="password"
                           required
                           value={password}
                           onChange={e => onChange(e)}
                           >
                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <ToastsContainer store={ToastsStore}/>
        </Fragment>
    );
}

export default withRouter(Login);