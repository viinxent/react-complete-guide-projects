import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.reqInterceptors = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      this.resInterceptors = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );

      this.state = {
        error: null
      }
    }

    componentWillUnmount() {
      console.log('[Will-Unmount]', this.reqInterceptors, this.resInterceptors);
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={Boolean(this.state.error)}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
