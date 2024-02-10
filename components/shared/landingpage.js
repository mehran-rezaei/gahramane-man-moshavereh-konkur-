import React, { useEffect, useState } from 'react';
import Link  from 'next/link';
import axios from 'axios';
// components
import Card2 from '../cards/cardForInfo';
import Slider from './slider';
import Title from './title';
import Button from '../button/button';
import ButtonArrow from '../button/buttonarrow';
import OurInfo from './ourInfo';
import BestProducts from './bestproducts';


const LandingPage = () => {
    const [studentGift , setStudentGift] = useState('')
    const [description , setDescription] = useState('')
    useEffect(() => {
        axios.get('https://api.ghahramaneman.com/api/Client/GetClientConfig')
        .then(Response => {
            setStudentGift(Response.data.Result.BestStudentText);
            setDescription(Response.data.Result.MainBodyText)
        })
    },[])
    return (
        <div>
            <main>
                <div  className='heroSection px-5 md:px-20 flex-col-reverse flex  xl:flex-row justify-between'>
                    <div className='xl:pl-20  text-center xl:text-right mt-8 xl:mt-0'>
                        <h1 className='text-lg xl:text-5xl xl:leading-[80px] xl:w-[488px] font-bold pb-5'>
                             به مرکز مشاوره کنکوری  
                            <span className='text-navbarBt ml'> قهرمان من </span> 
                            خوش آمدید</h1>
                        <h2 className='text-sm xl:text-base xl:leading-10 xl:w-[520px] text-pcolor font-medium mb-[30px]'>
                            {description}</h2>
                        <div className='flex justify-center  xl:justify-end'>
                           <Link href='/' className='w-2/3 xl:w-auto'><Button text={'درخواست مشاوره'}/></Link>
                        </div>
                    </div>
                    <div>
                        <img src='../images/landingHero.svg' alt="" className='w-full   ' />
                    </div>
                </div>
                 <OurInfo />    
                <div className='flex justify-center px-5 md:px-20 items-center flex-col'>
                    <h2 >
                         <Title title={'خدمات'} />
                    </h2>
                    <h3 className='text-right w-3/4 lg:w-1/2 text-[18px] '>
                    برگزاری دوره های مختلف آموزشی برای دانش آموزان , دانشجویان , نوجوانان , فرزندپروری و سبک زندگی , شناخت و هدف گزاری و ده ها دوره های دیگر ...
                    </h3>
                </div>
                {/* card */}
                <div  className='grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 xl:grid-cols-4 justify-items-center px-5 md:px-20 mt-16 mb-32'>
                    <Card2 images='../images/tineagerr.svg' title={'نوجوانی و بلوغ'} color={'#fff48c'}
                    info={'برگزاری دوره های مختلف آموزشی برای دانش آموزان , دانشجویان , نوجوانان , فرزندپروری و سبک زندگی , شناخت و هدف گزاری و ده ها دوره های دیگر .'} />
                    <Card2 images='../images/target.svg' title={'فرهنگ شناخت و هدف گزاری'} color={'#ccff8c'}
                    info={'در گستره آموزش زبان استفاده از شناخت و فرهنگ به عنوان دو عنصر جدانشنی از زبان غیر قابل انکار است به بیان دیگر هر شخص برای برقراری...'} />
                    <Card2 images='../images/consult.svg' title={'مشاوره تحصیلی و کنکور'} color={'#8cffea'}
                    info={'مشاوران آموزشی در حین حمایت از دانش آموزان در رشد شخصی و تجربیات آموزشی خود ممکن است به تعدادی مسایل که نیازند خدمات مداخله...'} />
                    <Card2 images='../images/family.svg' title={'فرزند پروری و سبک زندگی'} color={'#ffbf8c'}
                    info={'سبک های فرزند پروری نوع رابطه والد و کودک را مد نظر قرار میدهد یک وجه جالب درباره ی والدگری این است که والدین با سبک های فرزندپروری مخصوص به خود '} />
                </div>
                <div className='ourServices  flex flex-col xl:flex-row justify-center px-5 md:px-20'>
                    <div className='w-full md:w-auto'>
                        <img src='../images/lndingFeture.svg' alt="" className='w-full h-96 xl:w-auto xl::h-auto' />
                    </div>
                    <div className='mr-8 xl:mr-28 mt-4 xl:mt-0'>
                        <div>
                        <h2  className='text-pcolor text-lg md:text-2xl font-bold mb-4'>
                        ویژگی های ما:
                        </h2 >
                        <span className='text-pcolor text-lg  md:text-2xl font-bold block mb-[48px]'>
                            آنچه ما را نسبت به بقیه متمایز میکند
                        </span>
                        </div>
                        <div>
                            <ul className='text-[18px]'>
                                <li className='flex  items-center mb-6'>
                                    <img src='../images/bx_bxs-check-circle.png' alt="" className='ml-[13px]'/>
                                    <span className='text-sm  xl:text-lg'>ما اولین و بهترین هستیم!</span>
                                </li>
                                <li className='flex items-center mb-6 '>
                                <img src='../images/bx_bxs-check-circle.png' alt="" className='ml-[13px] ' />
                                    <span className='text-sm xl:text-lg'>پشتیبانی مشاوران ما در 24 ساعت شبانه روز</span>
                                </li>
                                <li className='flex items-center mb-6 '>
                                <img src='../images/bx_bxs-check-circle.png' alt="" className='ml-[13px]' />
                                    <span className='text-sm xl:text-lg'>
                                    گزارش هفتگی و ماهانه در پنل برای والدین
                                    </span>
                                </li >
                                <li className='flex items-center mb-6 '>
                                <img src='../images/bx_bxs-check-circle.png' alt=""  className='ml-[13px] '/>
                                    <span className='text-sm xl:text-lg'>
                                    وجود دوره های گوناگون در مسیر رشد و توسعه س فردی
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <img src='../images/bx_bxs-check-circle.png' alt="" className='ml-[13px]' />
                                    <span className='text-sm xl:text-lg'>
                                    پنلی هوشمند برای مدیریت برنامه روزانه شما در سایت
                                    </span>
                                </li>   
                            </ul>
                        </div>
                    </div>
                </div>
                <BestProducts/>
                <div className='topStudent flex flex-col-reverse   md:flex-row justify-between items-center py-8 bg-[#fafafa] mt-24 px-5 md:px-20 mb-16  '>
                        <div className='md:w-1/2   '>
                        <h2 className='text-2xl text-navbarBt text-center md:text-right font-bold mb-14'>
                        برترین دانش آموزان
                        </h2>
                        <p className='mb-8 text-base text-center md:text-right font-medium md:w-3/4 leading-8'>
                          {studentGift}
                        </p>
                         <div className='flex justify-center md:block'>
                            <ButtonArrow text={'مشاهده'} />
                        </div>
                        </div>
                        <div className='mb-10 md:mb-0'>
                            <img src='../images/bestStu.svg' alt="" className='h-80'  />
                        </div>
                </div>
                <div className='mostView'>
                        <div className='slideicon'>
                            <Slider/>
                        </div>
                </div>
            </main>
        </div>
    );
};
export default LandingPage;

