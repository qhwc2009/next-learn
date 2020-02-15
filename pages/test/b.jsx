import React from 'react';

import { useRouter } from 'next/router';

function PageB() {
  const router = useRouter();
  return <div style={{ backgroundColor: '#eaeaea' }}>{router.query.id}</div>;
}

PageB.getInitialProps = async () => {
  return {};
};

export default PageB;
