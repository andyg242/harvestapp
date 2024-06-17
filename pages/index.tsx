import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Layout from '../components/Layout/layout';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getGlobalData } from '../utils/global-data';

import background from "./img/placeholder.png";


export default function IndexPage({ globalData }) {

  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetchPosts()
          .then((p) => setPosts(p))
          .catch((e) => console.log(e));

  },[])

  const fetchPosts = async () => {
    let posts = [];
    const graphres = await fetch(`/api/articles`);
    let graphpostsData = await graphres.json();
  
    if (graphpostsData.error != undefined){
        //console.log("got some errors");
    } else {
      posts = graphpostsData.content;
    }
    
    return posts;
  }

  return (
    <Layout>
    <div className="relative">
      <div className="mix-blend-normal absolute inset-0 bg-right md:bg-center bg-cover bg-no-repeat w-full object-cover bg-black " 
        style={{ 
          backgroundImage: `url("https://images.unsplash.com/photo-1633259584604-afdc243122ea?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` 
        }}>

      </div>
      <div className="relative z-20 pt-40 md:pt-48 pb-32 md:pb-40 border-b-4 border-primary">
          <h1 className="uppercase text-white font-header text-3xl md:text-4xl text-center">Harvest: News From Around IT</h1>
      </div>
    </div>
  

      <div className="container py-20 md:py-24">
    <div className="flex flex-col xl:flex-row justify-between">
        <div className="w-full xl:w-2/3 xl:mr-20 2xl:mr-32 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 xl:gap-8">
                {/* <div>
                    <a href="/">
                        <img src="/assets/img/post-01.jpg" className="rounded-2xl" alt="image" />
                    </a>
                    <div className="mt-6 lg:mt-8 text-center">
                        <span className="flex justify-center items-center text-[#9b9b9b] text-sm">
                            <i className='bx bx-calendar text-secondary text-lg mr-2'></i>
                            26 October 2017
                        </span>
                        <a href="/" className="font-header text-secondary hover:text-primary text-2xl mt-3 block">Header style Collector for</a>
                        <p className="font-medium text-secondary mt-3">It's very easy to create stylish and beautiful prototypes for your future projects, both graphical and dynamic.</p>
                        <a href="/" className="flex justify-center items-center group font-header text-secondary mt-5">
                            Learn More
                            <i className='bx bx-right-arrow-alt text-secondary group-hover:text-primary text-2xl pl-3'></i>
                        </a>
                    </div>
                </div> */}
                
                {posts.map((post) => (
                  <div className="md:mt-4">
                    <Link
                      as={`/post?slug=${post.slug}`}
                      href={`/post?slug=[slug]`} className="rounded-2xl" alt={post.title}>
                        <Image
                          src={post.featuredimage}
                          className="rounded-2xl"
                          width={400}
                          height={2750}
                          alt={post.title}
                        />
                    </Link>
                    <div className="mt-6 lg:mt-8 text-center">
                        <span className="flex justify-center items-center text-[#9b9b9b] text-sm">
                            <i className='bx bx-calendar text-secondary text-lg mr-2'></i>
                            26 October 2023
                        </span>
                        <Link
                          as={`/post?slug=${post.slug}`}
                          href={`/post?slug=[slug]`} className="font-header text-secondary hover:text-primary text-2xl mt-3 block" alt={post.title}>{post.title}</Link>
                        <p className="font-medium text-secondary mt-3">{post.description}</p>
                        <Link
                          as={`/post?slug=${post.slug}`}
                          href={`/post?slug=[slug]`}  className="flex justify-center items-center group font-header text-secondary mt-5">
                            Learn More
                            <i className='bx bx-right-arrow-alt text-secondary group-hover:text-primary text-2xl pl-3'></i>
                        </Link>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-16 md:mt-20">
                <a href="" className="h-10 w-10 flex items-center justify-center border-2 border-secondary hover:border-primary transition-colors rounded-full group mr-8">
                    <i className='bx bxs-chevrons-left text-secondary group-hover:text-primary transition-colors text-xl'></i>
                </a>
                <a href="" className="font-medium text-secondary hover:text-primary transition-colors text-xl px-2 block">1</a>
                <a href="" className="font-medium text-secondary hover:text-primary transition-colors text-xl px-2 block">2</a>
                <a href="" className="font-medium text-secondary hover:text-primary transition-colors text-xl px-2 block">3</a>
                <a href="" className="font-medium text-secondary hover:text-primary transition-colors text-xl px-2 block">4</a>
                <a href="" className="font-medium text-secondary hover:text-primary transition-colors text-xl px-2 block">5</a>
                <a href="" className="h-10 w-10 flex items-center justify-center border-2 border-secondary hover:border-primary transition-colors rounded-full group ml-8">
                    <i className='bx bxs-chevrons-right text-secondary group-hover:text-primary transition-colors text-xl'></i>
                </a>
            </div>
        </div>
        <div className="mx-auto mt-16 w-full md:mt-24 md:w-3/5 lg:w-2/5 xl:ml-auto xl:mt-0 xl:w-1/3">
          <div className="mb-12 rounded-2xl border-2 border-[#eeeeee] px-10 py-8 shadow-xl">
            <div className="flex items-center justify-center">
              <h3 className="ml-5 font-header text-2xl text-secondary">Subscribe now!</h3>
            </div>
            <div className="mx-auto mt-8 flex flex-wrap justify-center md:w-2/3 lg:w-4/5 2xl:w-2/3">
              <div className="flex items-center">
                <i className="bx bxl-spotify text-2xl text-brand-500"></i>
                <span className="block pl-1 font-body text-brand-500">Spotify</span>
              </div>
              <div className="ml-5 flex items-center">
                <i className="bx bxl-apple text-2xl text-brand-500"></i>
                <span className="block pl-1 font-body text-brand-500">Itunes</span>
              </div>
              <div className="mt-2 flex items-center">
                <i className="bx bxl-google-plus text-2xl text-brand-500"></i>
                <span className="block pl-1 font-body text-brand-500">Google</span>
              </div>
              <div className="ml-5 mt-2 flex items-center">
                <i className="bx bxl-soundcloud text-3xl text-brand-500"></i>
                <span className="block pl-1 font-body text-brand-500">Soundcloud</span>
              </div>
            </div>
          </div>
          <div className="mb-12 border-t-2 border-[#eeeeee]">
            <h3 className="mb-10 pt-6 font-header text-2xl uppercase text-secondary">
              Recent Posts
            </h3>
    
            {posts.map((post) => (
             <div className="mt-6 flex rounded-2xl border-2 border-[#eeeeee] px-5 py-5 shadow-xl md:mt-10 md:px-8 md:py-8">
              <a href="/" className="block w-1/3">
              <Image
                  src={post.featuredimage}
                  className="rounded-2xl"
                  width={200}
                  height={100}
                  alt={post.title}
                />
              </a>
              <span className="ml-4 block w-2/3 md:ml-5">
                <span className="block font-body text-xs text-brand-500">26 October 2023</span>
                <Link
                          as={`/post?slug=${post.slug}`}
                          href={`/post?slug=[slug]`}
                  className="font-body text-sm font-bold uppercase text-secondary hover:text-primary"
                  >{post.title}</Link>
                <p className="pt-1 font-body text-xs font-medium text-brand-500 md:text-sm">
                  {post.description}
                </p>
              </span>
            </div>
            ))}
    
          </div>
          <div className="border-t-2 border-[#eeeeee] md:mb-12">
            <h3 className="mb-10 pt-6 font-header text-2xl uppercase text-secondary">
              Categories
            </h3>
            <div className="mt-6">
              <a href="/" className="flex items-center">
                <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
                <span
                  className="ml-2 block font-body font-bold uppercase text-secondary transition-colors hover:text-primary"
                  >Podcast</span
                >
              </a>
              <a href="/" className="mt-5 flex items-center">
                <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
                <span
                  className="ml-2 block font-body font-bold uppercase text-secondary transition-colors hover:text-primary"
                  >Music</span
                >
              </a>
              <a href="/" className="mt-5 flex items-center">
                <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
                <span
                  className="ml-2 block font-body font-bold uppercase text-secondary transition-colors hover:text-primary"
                  >Lifestyle</span
                >
              </a>
              <a href="/" className="mt-5 flex items-center">
                <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
                <span
                  className="ml-2 block font-body font-bold uppercase text-secondary transition-colors hover:text-primary"
                  >Education</span
                >
              </a>
              <a href="/" className="mt-5 flex items-center">
                <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
                <span
                  className="ml-2 block font-body font-bold uppercase text-secondary transition-colors hover:text-primary"
                  >Business</span
                >
              </a>
            </div>
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