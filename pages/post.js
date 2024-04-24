import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import ReactMarkdown from 'react-markdown'
import Footer from '../components/Footer';
import Header from '../components/Header';
import CustomLink from '../components/CustomLink';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ globalData }) {

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    //console.log(session.user.email);
  }
 
  const router = useRouter();
  const path = router.asPath;
  const slug = path.split("slug=")[1];
  const components = {
    a: CustomLink,
    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    Head,
  };

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
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-xl mb-4">{post.description}</p>
          )}
        </header> 
        <main>
          <article className="prose dark:prose-dark">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </article>
        </main>
        <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
          {/* {prevPost && (
            (<Link
              href={`/posts/${prevPost.slug}`}
              className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">

              <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                Previous
              </p>
              <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                {prevPost.title}
              </h4>
              <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />

            </Link>)
          )}
          {nextPost && (
            (<Link
              href={`/posts/${nextPost.slug}`}
              className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">

              <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                Next
              </p>
              <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                {nextPost.title}
              </h4>
              <ArrowIcon className="mt-auto mx-auto md:ml-0" />

            </Link>)
          )} */}
        </div>
      </article>
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