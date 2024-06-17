import Seo from '../seo';
import Navbar from '../navbar';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import React, { ReactNode } from 'react';
import { getGlobalData } from '../../utils/global-data';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const globalData = getGlobalData();
  return (
    <>
      <Seo title={globalData.blogTitle} description="A tiny CMS for IT News" />
      
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}