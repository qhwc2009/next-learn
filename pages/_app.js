import App from 'next/app';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import 'antd/dist/antd.css';

import withRedux from '~/lib/withRedux';

class MyApp extends App {
  static async getInitialProps(ctx) {
    // 必须要拿一下Component的getInitialProps 不然的话 组件的getInitialProps就不会生效
    const { Component } = ctx;
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Layout>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    );
  }
}

export default withRedux(MyApp);
