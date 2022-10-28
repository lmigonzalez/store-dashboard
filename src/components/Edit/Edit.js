import './Edit.css';

import React from 'react';

const Edit = ({ onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onCancel();
  };

  const productEdit = () => {
    return (
      <div className="edit-container">
		<div className='space-around' onClick={() => onCancel()}></div>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Product name" />
          <div>
            <input type="number" placeholder="Quantity" />
            <input type="number" placeholder="Price" />
          </div>
          <input type="text" placeholder="Category" />
          <button className="add-btn" type="submit">
            Edit
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  };
  return <div>{productEdit()}</div>;
};

export default Edit;
