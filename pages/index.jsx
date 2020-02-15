import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Button } from 'antd';

export default function index() {
  const handlePushToPageB = () => {
    Router.push(
      {
        pathname: '/test/b',
        query: {
          id: 2,
        },
      },
      '/test/b/2',
    );
  };
  return (
    <div>
      Hello World
      <div>
        <Button onClick={handlePushToPageB}>To B 2</Button>
      </div>
      <div>
        <Link href="/test/b?id=1" as="/test/b/1">
          <span>To B 1</span>
        </Link>
      </div>
    </div>
  );
}
