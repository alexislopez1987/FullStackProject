import React, { Fragment, useState } from 'react';
import API from '../../utils/API';
import qs from 'querystring';
import { connect } from 'react-redux';
import { sendAlert } from './../../actions/alerts';
import { ERROR } from './../../utils/alertTypes';

const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, lastname, email, password, password2} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            props.sendAlert("Passwords don't match", ERROR);
        } else {
            const newUser = {
                email,
                name,
                lastName: lastname,
                password
            };

            try {

                const config = {
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }

                const resp = await API.post('/register', qs.stringify(newUser), config);
                console.log('resp', resp);
                clearFormData();
                redirect();
            } catch (err) {
                console.log('config', err.config);
                console.log('request', err.request);
                console.log('response', err.response);
                console.log('isAxiosError', err.isAxiosError);
                console.log('toJSON', err.toJSON);
            }
        }  
    };

    const clearFormData = () => {
        setFormData({ 
            ...formData, 
            name: '',
            lastname: '',
            email: '',
            password: '',
            password2: ''
        });
    }

    const redirect = () => {
        setTimeout(() => 
            props.history.push('/login'), 2000 
        );
    }

    return (
        <Fragment>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                           className="form-control" 
                           id="name" 
                           name="name" 
                           required
                           value={name}
                           onChange={e => onChange(e)}
                           >
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input type="text" 
                           className="form-control" 
                           id="lastname" 
                           name="lastname"
                           required
                           value={lastname}
                           onChange={e => onChange(e)}
                           >
                    </input>
                </div>
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
                <div className="form-group">
                    <label htmlFor="password2">Password:</label>
                    <input type="password" 
                           className="form-control" 
                           id="password2" 
                           name="password2"
                           required
                           value={password2}
                           onChange={e => onChange(e)}
                           >
                    </input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </Fragment>
    );
}

export default connect(null, { sendAlert })(Register);