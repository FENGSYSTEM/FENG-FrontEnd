import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

import React from "react";

class CustomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        {/* Style CSS */}
        <Head>
          <title>FENGSYSTEM</title>
          <link rel="icon" href="/fav-i.ico" type="image/x-icon" />
          {/* <meta property="og:image" content="thumbnails/thumbnail-bx-2.jpg" /> */}
          <meta property="og:title" content="FENG | FENG SYSTEM™" />
          <meta property="og:url" content="https://fengsystem.co/" />
          <meta property="og:image" content="/thumbnail.jpg" />
          <meta property="og:type" content="website" />
          <meta
            property="og:site_name"
            content="Discover all the collections by Feng for women, men and browse the Feng 's system and heritage"
          />
          <meta property="og:image:alt" content="Visit fengsystem.co" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
