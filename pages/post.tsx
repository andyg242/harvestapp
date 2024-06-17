import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout/layout';
import CustomLink from '../components/CustomLink';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getGlobalData } from '../utils/global-data';


export default function Index({ globalData }) {

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    //console.log(session.user.email);
  }
 
  const router = useRouter();
  const path = router.asPath;
  const slug = path.split("slug=")[1];
  // const components = {
  //   a: CustomLink,
  //   // It also works with dynamically-imported components, which is especially
  //   // useful for conditionally loading components for certain routes.
  //   // See the notes in README.md for more details.
  //   Head,
  // };

  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchPost()
          .then((p) => setPost(p))
          .catch((e) => console.log(e));
  },[])

  const fetchPost = async () => {
    let post = {
      title: "",
      slug: "",
      filePath: "",
      description: "",
      body: ""
    };
    if (typeof slug === 'string' && slug.length > 2) {
      const graphres = await fetch(`/api/articles?slug=` + slug);
      let graphpostsData = await graphres.json();
      if (graphpostsData.error != undefined){
          //console.log("got some errors");
      } else {
        post  = graphpostsData.content;
      }
    }
    return post;
  }

  return (
    <Layout>
     
      <div className="relative">
        <div className="mix-blend-normal absolute inset-0 bg-right md:bg-center bg-cover bg-no-repeat w-full object-cover bg-black" style={{ 
      backgroundImage: `url(${post.featuredimage})` 
    }}></div>

        {/* <div className="relative z-20 pt-40 md:pt-48 pb-32 md:pb-40 border-b-4 border-primary"> */}
        <div className="relative z-20 pt-40 md:pt-48 pb-32 md:pb-40 border-b-4 border-primary backdrop-blur-sm bg-black/30 mr-auto p-8">
            <h1 className="uppercase text-white font-header text-3xl md:text-4xl text-center">{post.title}</h1>
        </div>

      </div>
      <div className="container py-20 lg:py-24">
          <div className="flex flex-col xl:flex-row justify-between">
              <div className="w-full xl:w-2/3 xl:mr-20 2xl:mr-32">
                  <span className="">

                  {/* <Image
                    src={post.featuredimage}
                    width={500}
                    height={500}
                    className="w-full lg:w-64 h-84 md:h-120 lg:h-64 object-cover"
                    alt={post.title}
                  /> */}
                      
                  </span>
                  
                  <h4 className="font-header text-secondary text-2xl mt-5">{post.title}</h4>


                  <div className="episode-post">
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                  </div>
                  
              </div>
              <div className="mx-auto mt-16 w-full md:mt-24 md:w-3/5 lg:w-2/5 xl:ml-auto xl:mt-0 xl:w-1/3">
                  <div className="mb-12 border-t-2 border-[#eeeeee]">
                      <h3 className="mb-10 pt-6 font-header text-2xl uppercase text-secondary">
                          You might also like
                      </h3>
                      
                      
                  </div>

              </div>

          </div>
      </div>
    
    </Layout>
  );
}

export function getStaticProps() {

  const globalData = getGlobalData();

  return { props: { globalData } };
}