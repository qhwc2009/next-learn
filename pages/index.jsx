import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

import { Button } from 'antd';

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;

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
