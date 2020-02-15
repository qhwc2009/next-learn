import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const LazyComp = dynamic(import('../../components/LazyComp'));

function PageB({ name, time }) {
  const router = useRouter();
  return (
    <div style={{ backgroundColor: '#eaeaea' }}>
      <Head>
        <title>My page b</title>
      </Head>
      {router.query.id}
      <div>name: {name}</div>
      <div>time: {time}</div>
      <LazyComp />
    </div>
  );
}

PageB.getInitialProps = async () => {
  // 异步加载模块
  const moment = await import('moment');
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'chen ge',
        time: moment.default(Date.now() - 60 * 1000).fromNow(),
      });
    }, 1000);
  });
  return await promise;
};

export default PageB;
