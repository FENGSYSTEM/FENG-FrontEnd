import Head from "next/head";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>FENGSYSTEM</title>
        <style>
          {
            "body { background-image: url(/img/background.png); background-repeat: no-repeat; background-size: cover }"
          }
        </style>
      </Head>
    </div>
    // <div className="d-flex flex-column min-vh-800">
    //   <div className="col-12">
    //     <div className="row">
    //       <div className="col-7">
    //         <div className="d-flex flex-column justify-content-center align-items-end text-right">
    //           <h3 className="font-bold font-lsp--medium">FENGSYSTEM.CO</h3>
    //           <h6 className="font-11">
    //             silk-canvas evening dress with shoulder wrap and silk-canvas
    //             armbag
    //           </h6>
    //           <h6 className="font-10 font-italic">
    //             photographed by JuergenTeller/Backstage N.Y.3/99
    //           </h6>
    //           <h6 className="font-10 font-normal">New York, N.Y - A 99/00</h6>
    //         </div>
    //       </div>
    //       <div className="col-5">
    //         <img src="/img/shop/p1.jpeg" className="w-100" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
