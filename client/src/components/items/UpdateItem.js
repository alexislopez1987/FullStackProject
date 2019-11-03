import React, { Fragment, useState, useEffect } from 'react';
import API from '../../utils/API';
import qs from 'querystring';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { sendAlert } from './../../actions/alerts';
import { ERROR, SUCCESS } from './../../utils/alertTypes';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';

const UpdateItem = (props) => {

    useEffect(() => {
        const fetchItem = async () => {
            const result = await API.get(`/itemdetail/${props.match.params.id}`)
            setFormData({
                ...formData,
                name: result.data.name,
                price: result.data.price
            });
        };
        fetchItem();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        price: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const {name, price} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (isNaN(price) === true) {
            props.sendAlert("Price must be a number", ERROR);
            return;
        }

        if (parseInt(price) <= 0) {
            props.sendAlert("Price must greater than 0", ERROR);
            return;
        }

        const updateItem = {
            id: props.match.params.id, 
            name,
            price: parseInt(price)
        };

        try {
            setIsLoading(true);
            const config = {
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }

            await API.put('/item', qs.stringify(updateItem), config);

            setIsLoading(false);
            clearFormData();
            props.sendAlert("Item Updated", SUCCESS);
            redirect();

        } catch (err) {
            setIsLoading(false);
            props.sendAlert(err.response.data.error, ERROR);
        }
    }

    const clearFormData = () => {
        setFormData({ 
            ...formData, 
            name: '',
            price: ''
        });
    }

    const redirect = () => {
        props.history.push('/items');
    }

    if (isLoading === true) {
        return <Spinner />;
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
                    <label htmlFor="price">Price:</label>
                    <input type="number" 
                           className="form-control" 
                           id="price" 
                           name="price" 
                           required
                           value={price}
                           onChange={e => onChange(e)}
                           >
                    </input>
                </div>
                <Link to="/items">Back</Link> {' '}
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </Fragment>
    );

}

export default withRouter(connect(null, { sendAlert })(UpdateItem));