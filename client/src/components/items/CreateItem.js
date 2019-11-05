import React, { Fragment, useState, useEffect } from 'react';
import API from '../../utils/API';
import qs from 'querystring';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { sendAlert } from './../../actions/alerts';
import { ERROR, SUCCESS } from './../../utils/alertTypes';
import Spinner from './../layout/Spinner';
import useForm from 'react-hook-form';

const CreateItem = (props) => {

    useEffect(() => {
        const fetchItemType = async () => {
            const result = await API.get("/itemtype")
            setItemTypeData(result.data);
        };
        fetchItemType();
    }, []);

    const { register, handleSubmit, errors, reset } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [itemTypeData, setItemTypeData] = useState([]);

    const onSubmitVal = async (data, e) => {
        e.preventDefault();

        const {name, price, itemtype} = data;

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
        reset({
            name: "",
            price: "",
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
            <form onSubmit={handleSubmit(onSubmitVal)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                           className="form-control" 
                           id="name" 
                           name="name" 
                           ref={register({ required: true, minLength: 3 })}
                           >
                    </input>
                    {errors.name && errors.name.type === 'required' && <div className="has-error">Name is required</div>}
                    {errors.name && errors.name.type === 'minLength' && <div className="has-error">Min length of name is 3</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" 
                           className="form-control" 
                           id="price" 
                           name="price" 
                           ref={register({ required: true, min: 10 })}
                           >
                    </input>
                    {errors.price && errors.price.type === 'required' && <div className="has-error">Price is required</div>}
                    {errors.price && errors.price.type === 'min' && <div className="has-error">Min value of price is 10</div>}
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <select name="itemtype" 
                            id="itemtype" 
                            className="form-control" 
                            ref={register({validate: {
                                mustSelect: value => value !== "0"
                            }})}
                    >
                        <option value="0">Selecione...</option>
                        {itemTypeData.map(itemType => (
                            <option key={itemType.id} value={itemType.id}>{itemType.name}</option>
                        ))}
                    </select>
                    {errors.itemtype && errors.itemtype.type === "mustSelect" && <div className="has-error">Type is required</div>}
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