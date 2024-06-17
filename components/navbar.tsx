import Link from 'next/link';
import React, { Component }  from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
import closeIcon from '../assets/img/icon-close.svg';
import styles from './Header/header.module.css';

export default function Navbar() {

const { data: session, status } = useSession();

    return (
      <div>
        <div className='hidden'>
          <div className="absolute inset-0 z-50 bg-black/75"></div>
          <div className="fixed right-0 z-50 h-screen w-64 bg-slate-500 xl:hidden">
            <button className="absolute top-0 right-0 mt-4 mr-4">
              <img src={closeIcon} className="h-10 w-auto" alt="" />
            </button>
            <ul className="absolute top-20 py-10 text-left">
              <li key="Home" className="py-3">
                <Link href='/' className="rounded-full px-5 py-2 font-header text-xl uppercase text-white transition-colors">
                      Home
                </Link>
              </li>
              <li key="Episodes" className="py-2">
                <Link href='/' className="rounded-full px-5 py-2 font-header text-xl uppercase text-white transition-colors">
                      Episodes
                </Link>
              </li>
              <li key="About" className="py-2">
                <Link href='/' className="rounded-full px-5 py-2 font-header text-xl uppercase text-white transition-colors">
                      About
                </Link>
              </li>
              <li key="Contact" className="py-2">
                <Link href='/' className="rounded-full px-5 py-2 font-header text-xl uppercase text-white transition-colors">
                      Contact Us
                </Link>
              </li>
            </ul>
            <div className="absolute top-80 left-5 py-10 text-right">
                <a target="_blank" href="https://open.spotify.com/show/2FFJvJnYKdpSw2phcZdCP9">
                  <i className="bx bxl-spotify text-xl text-white transition-colors hover:text-primary"></i>
                </a>
                <a target="_blank" href="https://podcasts.apple.com/us/podcast/sharing-the-flavor/id1665391641">
                  <i className="bx bxl-apple pl-2 text-xl text-white transition-colors hover:text-primary"></i>
                </a>
                {/* <a href="/">
                  <i className="bx bxl-instagram pl-2 text-xl text-white transition-colors hover:text-primary"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-youtube pl-2 text-xl text-white transition-colors hover:text-primary"></i>
                </a> */}
              </div>
          </div>
          
        </div>
        <div className="absolute top-0 z-40 w-full">
          {!session && (
              <>
              <span className="px-5 py-2 font-header uppercase text-white transition-colors">
                  You are not signed in
              </span>
              <a
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                  e.preventDefault();
                  signIn();
                  }}
              >
                  Sign in
              </a>
              </>
          )}
          {session?.user && (
              <>
              <span className="px-5 py-2 font-header uppercase text-white">
                  Hi {session.user.email ?? session.user.name}
              </span>
              <a
                  href={`/api/auth/signout`}
                  className={styles.button}
                  onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  }}
              >
                  {' '}
                  Sign Out
              </a>
              </>
          )}
        </div>
        <div className="absolute top-10 z-40 w-full bg-gradient-to-b from-black/70 to-transparent">
          <div className="container relative z-40 flex items-center justify-between py-7">
            <div className="flex items-center justify-between">

              <ul className="ml-12 hidden xl:flex">
                <li key="Home">
                  <Link href='/' className="rounded-full px-5 py-2 font-header uppercase text-white transition-colors hover:bg-primary">
                      Home
                  </Link>
                </li>
                <li key="Lastest">
                  <Link href='/admin' className="rounded-full px-5 py-2 font-header uppercase text-white transition-colors hover:bg-primary">
                      Latest Posts
                  </Link>
                </li>
                <li key="Contact">
                  <Link
                    href='/'
                    className="rounded-full px-5 py-2 font-header uppercase text-white transition-colors hover:bg-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                {session?.user && (
                <li key="Admin">
                  <Link
                    href='/admin/posts'
                    className="rounded-full px-5 py-2 font-header uppercase text-white transition-colors hover:bg-primary"
                  >
                    Admin
                  </Link>
                </li>
                )}
                
              </ul>
            </div>

            <div className="hidden items-center xl:flex">
              <div className="mr-10 hidden 2xl:flex">
                <a href="/">
                  <i className="bx bxl-spotify text-xl text-white transition-colors hover:text-primary"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-soundcloud pl-2 text-xl text-white transition-colors hover:text-primary"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-instagram pl-2 text-xl text-white transition-colors hover:text-primary"></i>
                </a>
                <a href="/">
                  <i className="bx bxl-youtube pl-2 text-xl text-white transition-colors hover:text-primary"></i>
                </a>
              </div>
              <form className="relative flex items-center">
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="rounded-full border-2 border-white bg-transparent px-4 py-2 font-body text-sm text-white placeholder-white focus:border-primary focus:ring-primary"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 focus:outline-none">
                  <i className="bx bx-search-alt-2 text-xl text-white"></i>
                </button>
                
              </form>
            </div>

            <div className="absolute right-0 md:right-2 xl:hidden">
              <button x-show=" !mobileMenu ">
                <i className="bx bx-menu-alt-right text-4xl text-white" ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }