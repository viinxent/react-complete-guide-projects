import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const indexPage = _ => {
  return (
    <div>
      <h1>404: Error</h1>
      <p>Go back <Link href="/"><a>Home</a></Link></p>
    </div>
  );
};

export default indexPage;
