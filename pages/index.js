// import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import { useContext , useEffect } from 'react';
import Router from 'next/router';
import QueryString from 'qs';
// components
import LandingPage from '../components/shared/landingpage'
const index = () => { 
return (
  <div>
    <div  dir="rtl" className="flex flex-col  text-right">
      <LandingPage />
    </div>
    </div>
  );
};
export default index;