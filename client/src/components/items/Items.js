import React, { useState, useEffect } from 'react';
import API from "./../../utils/API";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

function Items(props) {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (props.user && props.user.id) {
            API.get('item/' + props.user.id)
            .then(function (response) {
                setItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                setIsLoading(false);
            });
        }
    }, [props.user]);

    if (props.isAuthenticated === false) {
        return(
            <div className="row">
                <div className="col">
                    You are not log in
                </div>
            </div>         
        );
    }

    if (isLoading || (!props.user && !props.user.id)) {
        return (
            <div className="row">
                <div className="col">
                    Loading...
                </div>
            </div>         
        );
    }

    if (!isLoading && items.length === 0) {
        return (
            <div className="row">
                <div className="col">
                    <div className="alert alert-warning" role="alert">
                        No items found
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="row">
            <div className="col">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Detail</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><Link to={`/item/${item.id}`}>Click</Link></td>
                                <td>{item.name}</td> 
                                <td>{item.price}</td>
                                <td>{item.owner.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>               
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(Items));