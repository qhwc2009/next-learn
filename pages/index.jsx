import React, { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import getConfig from 'next/config';

import { Button } from 'antd';

const { publicRuntimeConfig } = getConfig();

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;

export default function index() {
  useEffect(() => {
    axios.get('/api/user/info').then(resp => console.log(resp));
  }, []);

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
    <>
      <div>
        Hello World
        <Title>This is Title</Title>
        <div>
          <Button onClick={handlePushToPageB}>To B 2</Button>
        </div>
        <div>
          <Link href="/test/b?id=1" as="/test/b/1">
            <span className="span1">To B 1</span>
          </Link>
        </div>
        <div>
          <a href={publicRuntimeConfig.OAUTH_URL}>github 登录</a>
        </div>
      </div>
      <style jsx>{`
        .span1 {
          display: block;
          width: 100px;
          height: 40px;
          background-color: blue;
        }
      `}</style>
      <style jsx global>
        {`
          div {
            background-color: pink;
          }
        `}
      </style>
    </>
  );
}
