import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

class Index extends Component {
  render() {
    return (
      <div>
        <h1>The main page</h1>
        <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
        <button onClick={() => Router.push('/auth')}>Go to auth</button>
      </div>
    );
  }
};

export default Index;
