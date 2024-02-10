import React, { useEffect, useState } from 'react';
// import CountUp from 'react-countup';
import axios from 'axios';
import NumberToPersianWord from "number_to_persian_word";


const OurInfo = () => {
     const [data , setData] = useState(false)
    //  const datainfo()
     let { AmountOfPeriod ,AmountOfConsultant, AmountOfClass ,AmountOfStudent } = data
    AmountOfPeriod =(NumberToPersianWord.convertEnToPe((AmountOfPeriod)))
    AmountOfConsultant =(NumberToPersianWord.convertEnToPe(AmountOfConsultant))
    AmountOfClass =(NumberToPersianWord.convertEnToPe(AmountOfClass))
    AmountOfStudent =(NumberToPersianWord.convertEnToPe(AmountOfStudent))
    // const  newns =((new Number(AmountOfPeriod).toLocaleString('fa-ir')))
    useEffect(()=> {
        axios.get('https://api.ghahramaneman.com/api/Client/GetClientConfig')
         .then(Response => {
            setData(Response.data.Result);
         })
    },[])
    return (
             <div className='bottomHero grid  gap-16 lg:gap-0  grid-cols-1 sm:grid-cols-2  justify-items-center  lg:flex px-6 md:px-32 lg:justify-between mt-28 text-pcolor text-[20px] font-medium mb-[120px] '>
                    <div className='sm:flex sm:min-w-[250px] lg:min-w-fit  items-center '>
                        <img src='../images/useric.png' alt="" className='w-32 lg:h-auto lg:w-auto mb-8 sm:mb-0 sm:pl-8' />
                    <span className='mr-4 sm:mr-0'>{AmountOfPeriod} دوره ها</span>
                    </div>
                    <div className='hidden lg:block'>
                    <img src='../images/borderleft.png' alt="" className='' />
                    </div>
                    <div className='sm:flex justify-start  sm:min-w-[250px] lg:min-w-fit   items-center'>
                        <img src='../images/useric.png' alt=""  className=' w-32  lg:h-auto lg:w-auto mb-8 sm:mb-0 sm:pl-8'/>
                        <span className='mr-4 sm:mr-0'>{AmountOfConsultant} همکاران</span>
                    </div>
                    <div className='hidden lg:block'>
                    <img src='../images/borderleft.png' alt="" className='' />
                    </div>
                    <div className='sm:flex  items-center  sm:min-w-[250px] lg:min-w-fit  '>
                        <img src='../images/useric.png' alt=""  className=' w-32  lg:h-auto lg:w-auto mb-8 sm:mb-0 sm:pl-8'  />
                        <span className='mr-4 sm:mr-0'>{AmountOfClass} دروس</span>
                    </div>
                    <div className='hidden lg:block'>
                    <img src='../images/borderleft.png' alt="" className='' />
                    </div>
                    <div className='sm:flex  items-center  sm:min-w-[250px] lg:min-w-fit  '>
                        <img src='../images/useric.png' alt=""  className='w-32   lg:h-auto lg:w-auto mb-8 sm:mb-0 sm:pl-8'  />
                        <span className='mr-4 sm:mr-0'>{AmountOfStudent} کاربران</span>
                    </div>
                </div>
    );
};
export default OurInfo;