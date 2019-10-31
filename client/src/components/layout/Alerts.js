import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { SUCCESS, ERROR } from './../../utils/alertTypes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alerts(props) {

    if (props.message !== '') {
        switch (props.alertType) {
            case SUCCESS:  
                toast.success(props.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break;
            case ERROR:  
                toast.error(props.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break;
            default:
                console.log("default alert");
        }
    }

    return (
        <Fragment>
            <ToastContainer autoClose={3000} />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    message: state.alerts.message,
    alertType: state.alerts.alertType
});

export default connect(mapStateToProps)(Alerts);