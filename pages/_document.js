import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  // 自定义getInitialProps
  static async getInitialProps(ctx) {
    // 若要覆盖getInitialProps 必须要调用一下
    const props = await Document.getInitialProps(ctx);
    return {
      ...props,
    };
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
