import React, { Fragment, useState, useEffect } from 'react';
import API from '../../utils/API';
import qs from 'querystring';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { sendAlert } from './../../actions/alerts';
import { ERROR, SUCCESS } from './../../utils/alertTypes';
import Spinner from './../layout/Spinner';

const CreateItem = (props) => {

    useEffect(() => {
        const fetchItemType = async () => {
            const result = await API.get("/itemtype")
            setItemTypeData(result.data);
        };
        fetchItemType();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        itemtype: '0'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [itemTypeData, setItemTypeData] = useState([]);

    const {name, price, itemtype} = formData;

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

        if (itemtype === '0') {
            props.sendAlert("You must select a type", ERROR);
            return;
        }

        const newItem = {
            name,
            price: parseInt(price),
            owner: props.user.id,
            type: itemtype
        };

        try {
            setIsLoading(true);
            const config = {
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }

            await API.post('/item', qs.stringify(newItem), config);

            setIsLoading(false);
            clearFormData();
            props.sendAlert("Item Created", SUCCESS);
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
            price: '',
            itemtype: '0'
        });
    }

    const redirect = () => {
        props.history.push('/items');
    }

    if (!props.user && !props.user.id) {
        props.history.push('/');
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
                <div className="form-group">
                    <label>Type:</label>
                    <select name="itemtype" id="itemtype" className="form-control" onChange={e => onChange(e)}>
                        <option value="0">Selecione...</option>
                        {itemTypeData.map(itemType => (
                            <option key={itemType.id} value={itemType.id}>{itemType.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Fragment>
    );

}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps, { sendAlert })(CreateItem));