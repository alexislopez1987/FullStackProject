import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

const Item = (props) => {

    const clickUpdateHandler = (itemId) => {
        props.history.push(`/updateitem/${itemId}`)
    }

    return (
        <tr>
            <td><Link to={`/item/${props.item.id}`}>Detail</Link></td>
            <td>{props.item.name}</td> 
            <td>$ {props.item.price}</td>
            <td>{props.item.owner.name}</td>
            <td>
                {props.item.owner.id === props.user.id ? (
                    <Fragment>
                        <button 
                            type='button' 
                            className='btn btn-primary' 
                            onClick={() => clickUpdateHandler(props.item.id)}
                        >Update</button>
                        {' '}
                        <button
                            type='button'
                            className='btn btn-danger'
                        >Delete</button>
                    </Fragment>
                ) : (null)} 
            </td>
        </tr>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Item));