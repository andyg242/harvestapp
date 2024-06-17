import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Layout from '../../components/Layout/layout';
import AccessDenied from '../../components/AccessDenied/access-denied';
import Image from 'next/image';
import styles from '../Home.module.css';
import { getGlobalData } from '../../utils/global-data';

export default function Page({ globalData }) {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/admin-protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    }
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
      fetchPosts()
          .then((p) => setPosts(p))
          .catch((e) => console.log(e));

      fetchData();
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
     <Layout>
     Logged in as: {session.user?.name} 
     <main className="w-full">
       <h1 className="text-3xl lg:text-5xl text-center mb-12">
         {globalData.blogTitle}
       </h1>
       
        <h2 className="text-2xl lg:text-3xl text-center mb-12">
          Posts
        </h2>
        <Link as={`/admin/addpost`}
                href={`/`} >
                  New Post
        </Link>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className=""
            >
              <Link
                as={`/admin/posts?slug=${post.slug}`}
                href={`/admin/posts?slug=[slug]`}
                className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">

                {post.date && (
                  <p className="uppercase mb-3 font-bold opacity-60">
                    {post.date}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                
              </Link>
            </li>
          ))}
        </ul>
       
     </main>
   </Layout>
  );
}

export function getStaticProps() {

    const globalData = getGlobalData();
  
    return { props: { globalData } };
  }