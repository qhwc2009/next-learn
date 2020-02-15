import React from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router';

function PageB() {
  const router = useRouter();
  return (
    <div style={{ backgroundColor: '#eaeaea' }}>
      <Head>
        <title>My page b</title>
      </Head>
      {router.query.id}
    </div>
  );
}

PageB.getInitialProps = async () => {
  return {};
};

export default PageB;
