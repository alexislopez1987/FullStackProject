import React, { Fragment, useState } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login  } from './../../actions/auth';

const Login = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        props.login(email, password, props.history);
    }

    if (props.isAuthenticated === true) {
        return <Redirect to='/items' />;
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
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { login })(Login));