import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Markdown from 'react-markdown';
// import { CodeBlock } from './components/Code';
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeExternalLinks from 'rehype-external-links'

import Layout from '../../components/Layout/layout';
import AccessDenied from '../../components/AccessDenied/access-denied';
import Image from 'next/image';
import styles from '../Home.module.css';
import { getGlobalData } from '../../utils/global-data';

export default function Page({ globalData }) {
  const titleRef = useRef();
  const slugRef = useRef();
  const descriptionRef = useRef();

  const errRef = useRef();
  const confirmRef = useRef(null);

  const [title, setTitle] = useState('');
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [slug, setSlug] = useState('');
  const [validSlug, setValidSlug] = useState(false);
  const [slugFocus, setSlugFocus] = useState(false);

  const [description, setDescription] = useState('');
  const [validDescription, setValidDescription] = useState(false);
  const [descriptionFocus, setDescriptionFocus] = useState(false);

  const [body, setBody] = useState('');
  const [validBody, setValidBody] = useState(false);
  const [bodyFocus, setBodyFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const { data: session, status } = useSession();  
  const [content, setContent] = useState();

  // const options = { code: CodeBlock }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/admin-protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    }
      fetchData();
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  async function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('/api/articles', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json();
    console.log(data.status);
    if (data.status === "post saved") {
      window.location.href = "/";
    }
  }

  return (
    <Layout>
     Logged in as: {session.user?.name} 
     <main className="w-full">
       <h1 className="text-3xl lg:text-5xl text-center mb-12">
         {globalData.blogTitle}
       </h1>
       
        <h2 className="text-2xl lg:text-3xl text-center mb-12">
          Add a Post
        </h2>
        <Link as={`/admin/posts`}
                href={`/`} >
                  View Posts
        </Link>

        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="title" id="title" type="text" placeholder="Title of Post" />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="slug">
                Slug
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="slug" id="slug" type="text" placeholder="Slug (ex. myarticle)" />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div className="w-full md:w-full px-3 mb-6 md:mb-0">

              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article Summary</label>
              <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="This is the description summary of your post"></textarea>

            </div>

            <div className="w-full md:w-full px-3 mb-6 md:mb-0">

              <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Article</label>
              <section className='w-full pt-5 h-full'>
                <textarea id="article-body" name="body" 
                  className='w-full ... placeholder:opacity-80'
                  placeholder='Feed me some Markdown 🍕'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  autoFocus
                />
              </section>
            </div>
            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <div className='fixed ... border-dashed' />
              <article id="post-rendered-article" className='w-full pt-5 pl-6'>
                <Markdown className='prose prose-invert min-w-full' 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    rehypeSanitize,
                    [rehypeExternalLinks,
                     { content: { type: 'text', value: '🔗' } }
                    ],
                  ]}
                >
                  {body}
                </Markdown>
              </article>
            
            </div>

            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <button type="submit"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Post
              </button>
            </div>
            
          </div>
        
        </form>

       
     </main>
     
   </Layout>
  );
}

export function getStaticProps() {

    const globalData = getGlobalData();
  
    return { props: { globalData } };
  }