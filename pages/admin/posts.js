import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import ArrowIcon from '../../components/ArrowIcon';
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO';
import AccessDenied from '../../components/AccessDenied/access-denied';

export default function Page({ globalData }) {
  const { data: session } = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/admin-protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };

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
     <SEO title={globalData.name} description={globalData.blogTitle} />
     <Header name={session.user?.name} />
     <main className="w-full">
       <h1 className="text-3xl lg:text-5xl text-center mb-12">
         {globalData.blogTitle}
       </h1>
       
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