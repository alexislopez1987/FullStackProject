import React, { useState, useEffect } from 'react';
import API from '../../utils/API';

function ItemDetail({match}) {

    const [item,  setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log(match);
    useEffect(() => {
        
        API.get(`/itemdetail?id=${match.params.id}`)
        .then(function (response) {
            console.log(response);
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
                <button onClick={() => match.goBack()}>Back</button>
            </div>
        </div>
    );
}

export default ItemDetail;