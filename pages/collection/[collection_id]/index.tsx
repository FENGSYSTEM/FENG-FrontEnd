import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}

export default function Index({}: Props): ReactElement {
  const route = useRouter();
  return (
    <div className="col-12">
      <Head>
        <title>FENGSYSTEM</title>
      </Head>
      <div className="row">
        <div className="col-6">
          <div className="font-bold font-55">
            <i>{route.query?.collection_id}</i>
          </div>
          <div className="font-10 text-uppercase text-justify">
            In addition to other prohibitions as set forth in the Terms of
            Service, you are prohibited from using the site or its content: (a)
            for any unlawful purpose; (b) to solicit others to perform or
            participate in any unlawful acts; (c) to violate any international,
            federal, provincial or state regulations, rules, laws, or local
            ordinances; (d) to infringe upon or violate our intellectual
            property rights or the intellectual property rights of others; (e)
            to harass, abuse, insult, harm, defame, slander, disparage,
            intimidate, or discriminate based on gender, sexual orientation,
            religion, ethnicity, race, age, national origin, or disability; (f)
            to submit false or misleading information; (g) to upload or transmit
            viruses or any other type of malicious code that will or may be used
            in any way that will affect the functionality or operation of the
            Service or of any related website, other websites, or the Internet;
            (h) to collect or track the personal information of others; (i) to
            spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any
            obscene or immoral purpose; or (k) to interfere with or circumvent
            the security features of the Service or any related website, other
            websites, or the Internet. We reserve the right to terminate your
            use of the Service or any related website for violating any of the
            prohibited uses.
          </div>
        </div>
        <div className="col-6">
          <img src="/img/collection/m-1.png" className="w-100 mb-3" />
          <img src="/img/collection/m-2.png" className="w-100 mb-3" />
        </div>
      </div>
    </div>
  );
}
