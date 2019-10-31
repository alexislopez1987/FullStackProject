import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { Button } from 'reactstrap';
import { withRouter } from "react-router";

function ItemDetail(props) {

    const [item,  setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        API.get(`/itemdetail/${props.match.params.id}`)
        .then(function (response) {
            setItem(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            setIsLoading(false);
        });

    }, []);

    if (isLoading) {
        return (
            <div className="row">
                <div className="col">
                    Loading...
                </div>
            </div>         
        );
    }

    return (
        <div className="row">
            <div className="col">
                <h1>{item.name}</h1>
                <Button outline color="primary" onClick={() => props.history.goBack()}>Back</Button>
            </div>
        </div>
    );
}

export default withRouter(ItemDetail);