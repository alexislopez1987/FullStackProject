import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { SUCCESS, ERROR } from './../../utils/alertTypes';

function Alerts(props) {

    if (props.message !== '') {
        switch (props.alertType) {
            case SUCCESS:  
                ToastsStore.success(props.message);
                break;
            case ERROR:  
                ToastsStore.error("Error: " + props.message);
                break;
            default:
                console.log("default alert");
        }
    }

    return (
        <Fragment>
            <ToastsContainer store={ToastsStore}/>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    message: state.alerts.message,
    alertType: state.alerts.alertType
});

export default connect(mapStateToProps)(Alerts);