// pannel
import React, { useEffect ,useContext , useState } from 'react';
import Link from 'next/link';
import Router, {useRouter} from 'next/router'
import QueryString from 'qs';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import { getCookie, setCookie } from "../../apiRequest/cookieProvider";

// components
// import DashboardSidebar from '../../components/dashboard/dashboardSidebar';
import PannelSidebar from '../../components/dashboard/pannelSidebar';
import Info from '../../components/dashboard/info';
import DailyReport from '../../components/dashboard/dayliReport';
import DailyHabit from '../../components/dashboard/dailyHabit';
import Redirector from '../../components/dashboard/redirector'
import WorkReport from '../../components/dashboard/workReport';
import Analiz from '../../components/dashboard/analiz';
// context
import { modalHandler } from '../../context/ModalReducer';
import { tokenHandler } from '../../context/TokenReducer';
import { dashboardHandler } from '../../context/dashboardReducer';

const pannel = () => {
    const { state, dispatch} = useContext(modalHandler)
    const { token , setToken} = useContext(tokenHandler) 
    const { page , setPage} = useContext(dashboardHandler)
    const [userinfo , setUserInfo] = useState({})
    const [showpage, setshowpage] = useState(false)
   if(getCookie('PersonType') == 2){
    // !localStorage.getItem('access_token'
   }
    
    let router = useRouter()
    useEffect(()=> {
      if(getCookie('PersonType') == 2) { 
           Router.push('/') 
      } else{
        setshowpage(true)
        console.log(localStorage.getItem('FirstName'))  
        console.log(localStorage.getItem('LastName')) 
        // console.log(localStorage.getItem('access_token')) 
        setUserInfo({
          FirstName : localStorage.getItem('FirstName'),
          LastName : localStorage.getItem('LastName'),
        })
      }
    } , [])
    let [data , setData] = useState({
        phoneNumber : 0,
        password : 0,
    })
    let date = new DateObject({
        date: new Date(),
      });
      date = new DateObject({
        calendar: persian,
        locale: persian_fa,
        format: "dddd DD MMMM YYYY",
      });
      console.log(date.format());
      let irandate = date.format()
   
        let dateObject1 = new DateObject({
          date,
          calendar: persian,
          locale: persian_fa,
          format: "HH:mm",
        });
         let time = dateObject1.format()
         console.log(time);
          const logout = () => {
            localStorage.clear()
            Cookies.remove('ID')
            Cookies.remove('PAYE')
            Cookies.remove('access_token')
            Cookies.remove('PersonType')
            router.push('/')
          }
    return (
        <>
        {showpage &&
        <div className='text-center text-white text-3xl h-screen px-2 lg:px-4 lg:flex'>
            
            <div   className='w-full lg:relative z-10  lg:w-1/5' >
            {/* <DashboardSidebar /> */}
            <PannelSidebar />
            </div>
            <div className='w-full px-2 lg:px-4 mt-20 lg:mt-0'>
            <div className='hidden lg:flex font-semibold text-sm w-full h-24 bg-navbarBt m-4 rounded-lg  justify-between items-center px-7'>
                <div className='flex'>
                    <div className='flex items-center'>
                        <div className='ml-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        </div>
                        <div className='text-right'>
                        <h3>{time}</h3>
                        <h3>{irandate}</h3>
                        </div>
                    </div>
                </div>
                <div className='flex items-center text-xs '> 
                {/* <h1>dashboard</h1>
                <h1>welcome {token.token && token.token}</h1> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person ml-2" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg> */}
                <span className='ml-1 font-medium text-sm'>{userinfo.FirstName  && userinfo.FirstName}</span>
                <span className='ml-4 font-medium text-sm'>{userinfo.LastName && userinfo.LastName}</span>
                <span className='ml-6  font-medium text-sm'>خوش آمدید</span>
                <div  onClick={logout} className='cursor-pointer' >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-left " viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                </svg>
                </div>
                </div>
            </div>
            <div className=''>
                {/* {page.userinfo && <Info />}
                {page.dailiReport && <DailyReport />}
                {page.dailiHabit && <DailyHabit />} */}
                {page.redirecter && <Redirector />}
                {page.workReport && <WorkReport />}
                {page.analiz && <Analiz />}
            </div>
            </div>
   
        </div>}
        </>
    );
};

export default pannel;