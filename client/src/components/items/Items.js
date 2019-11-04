import React, { useState, useEffect, Fragment } from 'react';
import Item from './Item';
import API from "./../../utils/API";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Spinner from './../layout/Spinner';
import ReactPaginate from 'react-paginate';
import Modal from './../common/Modal';
import useModal from './../common/useModal';
import { ERROR, SUCCESS } from './../../utils/alertTypes';
import { sendAlert } from './../../actions/alerts';

function Items(props) {

    const {isShowing, hide, show} = useModal();
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectedItemName, setSelectedItemName] = useState('');

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const limit = props.limit || 2;
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (props.user && props.user.id) {
            getItems(props.user.id, page, limit, nameSearch);
        }
    }, [props.user, page, nameSearch]);

    const getItems = (id, page, limit, nameSearch) => {
        API.get(`item/${id}?page=${page}&limit=${limit}&search=${nameSearch}`)
        .then(function (response) {
            setItems(response.data.items);
            setPageCount(Math.ceil(response.data.cont / limit));
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            setIsLoading(false);
        });
    }

    const handlePageClick = (data) => {
        let pageSelected = data.selected;
        setPage(pageSelected);
    }

    const onChange = e => {
        setNameSearch(e.target.value);
    }

    const clickItemDeleteHandler = (itemId, itemName) => {
        setSelectedItemId(itemId);
        setSelectedItemName(itemName);
        show();
    }

    const clickModalDeleteHandler = async (itemId) => {

        try {
            await API.delete(`item/${itemId}`);
            props.sendAlert("Item Deleted", SUCCESS);
            setSelectedItemId('');
            setSelectedItemName('');
            hide();
            setPage(0);
            getItems(props.user.id, page, limit, nameSearch);
        } catch (err) {
            props.sendAlert(err.response.data.error, ERROR);
        }
    }

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
        return <Spinner />;
    }

    const createItem = (
        <div className="row">
            <div className="col-md-3">
                <Link to="/createitem">Create Item</Link>
            </div>
        </div>
    );

    const textSearch = (
        <div className="row">
            <div className="col">
                <input type="text" 
                        className="form-control" 
                        id="nameSearch" 
                        name="nameSearch"
                        value={nameSearch}
                        placeholder="Search"
                        onChange={e => onChange(e)}
                        >
                </input>
            </div>
        </div>
    );

    if (!isLoading && items.length === 0) {
        return (
            <Fragment>
                { createItem }
                { textSearch }
                <div className="row">
                    <div className="col">
                        <div className="alert alert-warning" role="alert">
                            No items found
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            { createItem }
            { textSearch }
            <div className="row">
                <div className="col">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Detail</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Created</th>
                                <th scope="col">Owner</th>
                                <th scope="col">Type</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <Item key={item.id} item={item} clickDelete={clickItemDeleteHandler} />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="4">
                                    <ReactPaginate
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                </th>
                            </tr>
                        </tfoot>
                    </table>               
                </div>
            </div>

            <Modal
                isShowing={isShowing}
                hide={hide}
                itemId={selectedItemId}
                itemName={selectedItemName}
                clickDelete={clickModalDeleteHandler}
            />

        </Fragment>      
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps, { sendAlert })(Items));