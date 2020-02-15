import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  // 自定义getInitialProps
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
          // enhanceComponent: Component => Component,
        });

      // 若要覆盖getInitialProps 必须要调用一下
      const props = await Document.getInitialProps(ctx);
      return {
        ...props,
        styles: (
          <>
            {props.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <style>{`
          .test {
            color: red
          }
        `}</style>
        </Head>

        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
