import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reloadUser  } from './../../actions/auth';

const Reload = (props) => {

    useEffect(() => {
      if (localStorage.getItem("token")) {
        props.reloadUser(localStorage.getItem("token"));
      }
    }, []);

    return null;
}

export default connect(null, { reloadUser })(Reload);