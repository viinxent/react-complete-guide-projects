import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

const modal = props => {
  return (
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames={{
        enterActive: 'ModalOpen',
        exitActive: 'ModalClose'
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default modal;
