import { NextPage } from 'next';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

const Document: NextPage = () => (
  <Html lang="en">
    <Head />

    <body>
      <Main />
      <NextScript />

      <script src="/__ENV.js" />
    </body>
  </Html>
);

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);

  return initialProps;
};

export default Document;
