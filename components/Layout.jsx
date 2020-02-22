import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Link href="/">
          <Button>To Home</Button>
        </Link>
        <Link href="/test/b?id=1" as="/test/b/1">
          <Button>To B1</Button>
        </Link>
      </header>
      {children}
    </>
  );
}
