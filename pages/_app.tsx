import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { Wrapper, setupStore } from '../store/store';
import '../styles/index.scss';

const store = setupStore();

class MyApp extends React.Component<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default Wrapper.withRedux(MyApp);
