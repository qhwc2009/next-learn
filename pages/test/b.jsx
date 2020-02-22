import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd';

import { add, addAsync } from '../../store/actions/countAction';

const LazyComp = dynamic(import('../../components/LazyComp'));

function PageB({ name, time }) {
  const router = useRouter();
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div style={{ backgroundColor: '#eaeaea' }}>
      <Head>
        <title>My page b</title>
      </Head>
      {router.query.id}
      <div>name: {name}</div>
      <div>time: {time}</div>
      <LazyComp />
      <div>
        <Button
          onClick={() => {
            dispatch(add(1));
          }}
        >
          点击改变数字
        </Button>
        <Button
          onClick={() => {
            dispatch(addAsync(2));
          }}
        >
          点击改变数字
        </Button>
        <span style={{ marginLeft: '10px' }}>{count}</span>
      </div>
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
