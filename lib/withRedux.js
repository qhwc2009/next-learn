import React from 'react';
import createStore from '~/store/store';
const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function gerOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

function withRedux(Comp) {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);

      this.reduxStore = gerOrCreateStore(props.initialReduxState);
    }

    static getInitialProps = async ctx => {
      const reduxStore = gerOrCreateStore();

      let appProps = {};
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx);
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    };

    render() {
      const { initialReduxState, ...rest } = this.props;
      return <Comp {...rest} reduxStore={this.reduxStore} />;
    }
  }

  return WithReduxApp;
}

export default withRedux;
