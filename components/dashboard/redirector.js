import React , {useContext} from 'react';
// context
import { dashboardHandler } from '../../context/dashboardReducer';
import {useRouter} from 'next/router'

const redirector = () => {
    const {page , setPage} = useContext(dashboardHandler)
  const { pathname } = useRouter();
    return (
    <div className='px-2 lg:px-8 text-black pb-44  lg:text-base'>
            <div className='text-xs my-10'>
                <h2 className='text-sm lg:text-lg text-right mb-4 text-[#fb93ae] font-semibold'>صفحه انتخاب شده یافت نشد</h2>
                <h3 className='text-xs lg:text-sm text-right text-[#00000080] font-semibold'>برای کامل کردن پروفایل به قسمت 
                {pathname === '/student' &&
             <span className='font-semibold text-[#fb93ae] cursor-pointer px-1'
              onClick={() => setPage({ type : 'SET-INFO'})}> اطلاعات کاربری </span>                
                }
               {pathname === '/pannel' &&
            <span className='font-semibold text-[#fb93ae] cursor-pointer px-1' 
            onClick={() => setPage({ type : 'SET-WORK-REPORT'})}>  گزارش کارها  </span>

                }
                 وارد شوید  </h3> 
            </div>
            <div className='invisible grid grid-cols-1'>
         <div className='flex '>
                   <label className='labelinput'> درس</label>
                </div>
                <div className='flex flex-col'>
                   <label className='labelinput'> درس</label>
                   <select className='infoinput px-24'></select>
                </div>
                <div className='flex flex-col'>
                   <label className='labelinput'> ساعت </label>
                   <input  className='infoinput'></input>
                </div>
         </div>
         <div className='invisible grid grid-cols-1 gap-y-5 mb-3'>
            <div className='flex flex-col'>
                <label className='labelinput'> زمان </label>
                <input type="text" className='infoinput' />
              </div>
         </div>
      
    </div>
    );
};
export default redirector;
