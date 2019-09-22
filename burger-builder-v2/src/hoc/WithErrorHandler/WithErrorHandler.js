import React from 'react';

import Aux from '../Auxiliary/Auxiliary';

import Modal from '../../components/UI/Modal/Modal';

import useRequestErrorHandler from '../../hooks/requestError';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useRequestErrorHandler(axios);

    return (
      <Aux>
        <Modal modalClosed={clearError} show={Boolean(error)}>
          {error && error}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
