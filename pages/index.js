import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ globalData }) {
 
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
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
      <Link as={`/`}
                href={`/`} >
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
      </Link>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                as={`/post?slug=${post.slug}`}
                href={`/post?slug=[slug]`}
                className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">

                {post.date && (
                  <p className="uppercase mb-3 font-bold opacity-60">
                    {post.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                {post.description && (
                  <p className="mt-3 text-lg opacity-60">
                    {post.description}
                  </p>
                )}
                <ArrowIcon className="mt-4" />

              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {

  const globalData = getGlobalData();

  return { props: { globalData } };
}