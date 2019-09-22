import React, { memo } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

const Modal = props => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className="Modal"
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default memo(Modal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show ||
    prevProps.children === nextProps.children
  );
});
