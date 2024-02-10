import React, { useContext, useEffect, useState } from 'react';
// import logo from '../images/logogreen.svg'
import Link from "next/link"
import axios from 'axios';
// componets
import Li from '../Lilink/li';
import ModalSignUp from '../modal/modalsignup';
import ModalLogin from '../modal/modallogin';
import NumberValidation from '../modal/numbervalidation';
import CreatePassword from '../modal/createpassword';
import ForgetPassword from '../modal/forgetpassword';
//context
import { modalHandler } from '../../context/ModalReducer';
import { tokenHandler } from '../../context/TokenReducer';
import Button from '../button/button';
import { getCookie, setCookie } from "../../apiRequest/cookieProvider";
import Cookies from 'js-cookie';


const Navbar = () => {
    const [show , setShow] = useState(false)
    const {state , dispatch} = useContext(modalHandler)
    const {token , setToken} = useContext(tokenHandler)
    const [seleted , setselected] = useState(false)
    const [lname , setLName] = useState('')
    const [name , setName]   = useState('') 
    const [lastname ,setlastName] = useState('')
    const [sign , setSign] = useState(false)
    console.log(state.phoneNumber);
    const logoutHandler =() => {
        axios.post('https://api.ghahramaneman.com/api/Account/Logout')
        .then(Response => {
            console.log(Response);
        })
    } 
    const logout =() => {
          localStorage.clear()
          Cookies.remove('ID')
          Cookies.remove('PAYE')
          Cookies.remove('access_token')
          Cookies.remove('PersonType')
          setSign(true)
          setName('')

    }
    const showlinks = () => {
        setselected(!seleted)
    }
    useEffect(() => {
     setName(localStorage.getItem('FirstName')),
     setLName(localStorage.getItem('LastName'))
     console.log(localStorage);
     setTimeout(function() {
        setSign(true)
         }, 2000)
    }, [token])
    console.log(name);
    console.log(sign);
    return (
        <div  className={show ?'flex  text-base flex-col xl:flex-row justify-between  items-center font-medium text-navbar  mb-20 px-5 md:px-20'
         : 'flex  text-base flex-row  xl:flex-row justify-between  items-center font-medium text-navbar mb-20 px-5 md:px-20'}
         >
            {show ?
            <div onClick={() => setShow(!show)} className=' flex w-full xl:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            </div> :
             <div onClick={() => setShow(!show)} className='xl:hidden'>
             <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
             </svg>
            </div>
            }
            <div>
                <Link href='/'><img src='../images/logogreen.svg' alt="" /></Link>
            </div>
            <div className={show ? 'block' : 'hidden xl:block'} >
                <ul className='flex flex-col h-72 md:h-96 xl:h-auto mt-6 md:mt-12 xl:mt-0 text-center  xl:text-right xl:flex-row justify-between ml-14'>
                   <Link href='/'><Li text={'خانه'}/></Link>
                   <Link href='/products'><Li text={'محصولات'} /></Link>
                   <Link href='/consult'><Li text={'مشاوره و آموزش'} /></Link> 
                   <Link href='/aboutus'><Li text={'درباره ی ما'} /></Link> 
                   <Link href='/blog'><Li text={'وبلاگ'} /></Link> 
                   <Link href='/contact'><Li text={'تماس با ما'} /></Link> 
                </ul>
            </div>
            <div className={show ? 'block' : 'hidden xl:block'}>
         { name ? 
         <div className=' h-20 w-32'>
            <div className='pt-5'>
            <button 
            className='text-navbarBt w-full text-sm border-navbarBt border py-3 px-10 rounded-2xl hover:bg-navbarBt hover:text-white transition-all duration-300'  
            onClick={showlinks}>
                {name}   
            </button>
            </div>
            { seleted &&
           <div className='text-center' >
            <div>
                {
                    getCookie('PersonType') ==2 &&
                    <Link href='/student' className=' w-full block text-navbarBt font-semibold mt-2 bg-white border py-1 text-xs rounded-md  hover:bg-navbarBt hover:text-white transition-all duration-300'>
                    پیشخوان</Link> 
                }
                {
                    getCookie('PersonType') !=2 &&
                    <Link href='/pannel' className=' w-full block text-navbarBt font-semibold mt-2 bg-white border py-1 text-xs rounded-md  hover:bg-navbarBt hover:text-white transition-all duration-300'>
                    پیشخوان</Link> 
                }
            </div>
            {/* <Link href='/student' className=' w-full block text-navbarBt font-semibold mt-2 bg-white border py-1 text-xs rounded-md  hover:bg-navbarBt hover:text-white transition-all duration-300'>
                پیشخوان</Link> */}
            <button onClick={logout} className='block text-center w-full text-navbarBt font-semibold mt-1 bg-white border py-1 text-xs rounded-md  hover:bg-navbarBt hover:text-white transition-all duration-300'>
                خروج</button>
           </div>
           }
 
         </div>
          : sign ?
            <div className='flex flex-col xl:flex-row justify-between items-center'>
                <div className='xl:pl-10 mb-5 xl:mb-0 mt-6 xl:mt-0 ' onClick={() => dispatch({type :"ON_LOGIN"})}>
                    <button className='hover:text-navbarBt transition-all duration-300'>ورود</button>
                </div>
                <div>
                    <button onClick={() => dispatch({type :"ON_SIGNUP"})} 
                    className='text-navbarBt border-navbarBt border py-2 px-9 rounded-3xl hover:bg-navbarBt hover:text-white transition-all duration-300' 
                    >ثبت نام</button>
                </div>
                <div>{state.phoneNumber &&  state.phoneNumber}</div>
            </div> : "" }              
            </div>
             {state.showSignUpModal && <ModalSignUp />}
             {state.showLoginModal &&  <ModalLogin />}
             {state.showPhoneValidation &&  <NumberValidation />}
             {state.showConfirmPassword &&  <CreatePassword />}
             {state.showForgetPassword && <ForgetPassword/>}
             {/* <div onClick={logoutHandler}>
             <Button  text={'logout'} />
             </div> */}

        </div>
    );
};
export default Navbar;