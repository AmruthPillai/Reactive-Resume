import { NextPage } from 'next';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document: NextPage = () => (
  <Html lang="en">
    <Head>
      <Script
        id="google-tag-manager"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M9DK4S4');`,
        }}
      />

      <Script
        id="logo-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://rxresu.me",
            "logo": "https://rxresu.me/logo/dark.svg"
          }`,
        }}
      />

      <Script
        id="software-application-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Reactive Resume",
            "operatingSystem": "Windows, macOS, Linux, Android, iOS",
            "applicationCategory": "BrowserApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "11394"
            },
            "offers": {
              "@type": "Offer",
              "price": "0"
            }
          }`,
        }}
      />
    </Head>

    <body>
      <Main />
      <NextScript />

      <script src="/__ENV.js" />

      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M9DK4S4" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
    </body>
  </Html>
);

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);

  return initialProps;
};

export default Document;
