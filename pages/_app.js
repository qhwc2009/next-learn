import App from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import Layout from '../components/Layout';
import 'antd/dist/antd.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // 必须要拿一下Component的getInitialProps 不然的话 组件的getInitialProps就不会生效
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    );
  }
}

export default MyApp;
