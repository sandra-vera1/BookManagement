import React from 'react';
import { Link } from "react-router-dom"; 

const ErrorMessage = ({ message, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Error</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={onClose}>Close</button>
                    &nbsp;
                    <Link to="/">
                        <button className="btn btn-primary">Back Collection</button>
                    </Link> {/* Go back to collection page */}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
