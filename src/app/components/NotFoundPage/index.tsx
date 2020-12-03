import React from 'react';
import { P, StyleWrapperDiv, StyleTitleDiv } from './P';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <StyleWrapperDiv>
        <StyleTitleDiv>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </StyleTitleDiv>
        <P>Page not found.</P>
      </StyleWrapperDiv>
    </>
  );
}
