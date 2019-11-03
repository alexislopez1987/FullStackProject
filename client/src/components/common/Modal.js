import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, itemId, itemName, clickDelete }) => isShowing ? ReactDOM.createPortal(
  <Fragment>
    <div id="myModal" className="modal" style={{display:"block"}} role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Delete</h4>
                </div>
                <div className="modal-body">
                    <p>Do you want delete item {itemName}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={() => clickDelete(itemId)}>Delete</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={hide}>Close</button>
                </div>
            </div>
        </div>
    </div>
  </Fragment>, document.body
) : null;

export default Modal;