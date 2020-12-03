/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { AppPage } from './containers/App';

// import { HomePage } from './containers/HomePage/Loadable';
// import { LoginPage } from './containers/LoginPage/Loadable';
// import { UacSucPage } from './containers/UacSucPage/Loadable';
// import { NotFoundPage } from './components/NotFoundPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - 前台模版" defaultTitle="React 模版">
        <meta name="description" content="这是一个前台页面模版" />
      </Helmet>
      <AppPage />
      <GlobalStyle />
    </BrowserRouter>
  );
}
