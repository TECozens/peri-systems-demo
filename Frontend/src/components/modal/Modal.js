import React from 'react';
import './Modal.css';

export const Modal = ({ show, close }) => {
    return(
        <div className="modal-wrapper"
            style = {{
                transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
        >
            <div className="modal-header">
        <p>Project Editor</p>
        <span onClick={close} className="close-modal-btn">x</span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h4>Project Name</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, placeat aliquam? Nostrum vero fugiat rem, itaque molestias ipsa quae facilis.</p>
        </div>
        <div className="modal-footer">
          <button onClick={close} className="btn-cancel">Save</button>
        </div>
      </div>
    </div>
  )
};