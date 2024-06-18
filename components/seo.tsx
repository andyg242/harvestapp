
import * as React from "react"
import Head from 'next/head';


const Seo = ({ blogDescription, blogTitle, children }) => {

  console.log(blogTitle);

  return (
    <>
   
   <Head>

       <meta charset="utf-8" />
       <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
       <meta
           content="width=device-width, initial-scale=1, shrink-to-fit=no"
           name="viewport"
       />
       <title>{blogTitle}</title>
       <meta name="description" content={blogDescription} />
       <meta property="og:title" content={blogTitle} />
       <meta property="og:description" content={blogDescription} />
       <meta property="og:type" content="website" />
       <meta property="og:site_name" content={blogTitle} />
       <meta
           property="og:image"
           content=""
       />
       <link rel="canonical" href="http://harvest/" />
       <meta property="og:url" content="http://harvest/" />

       <link rel="preconnect" href="https://fonts.gstatic.com" />
       <link
           href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&amp;family=Poppins:wght@100;200;300;400;500;600;700&amp;display=swap"
           rel="stylesheet"
       />
       <link
           rel="stylesheet"
           href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
       />

       <body data-theme="cupcake" className="bg-white" style={{"line-height": "inherit", margin: 0}} />
   </Head>
   
      {children}
    </>
  )
}

export default Seo
