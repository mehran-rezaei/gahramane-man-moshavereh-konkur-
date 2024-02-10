import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../button/button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../helpers/toust'
import { getCookie } from '../../apiRequest/cookieProvider';
import axiosInstance from '../../apiRequest/axiosInstance';
import axiosProvider from "../../apiRequest/axiosInstance";
import TimePickerCom from "./TimePickerCom";


const dailyHabit = () => {

  const [calendar , setCalender] = useState('')
  // let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
     let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');

  console.log(today);
  let userID = getCookie('ID')
  const [firstInsert , setFirstInsert] = useState(false)

  let data = {}
  const [ dailiHabit  , setDailiHabit ]  = useState({
    CreatorID: getCookie('ID'),
    ID: getCookie('ID'),
    wakeTime : '',
    sleepTime : '',
    eatwater : '',
    goodwork :'',
    wish : '',
    moveTime: null,
    socialTime : null,
    day: today
  });
  function setTime(value, key){
    
    setDailiHabit({
      ...dailiHabit,
      [key] : value
    });
  }
// console.log(dailiHabit.wakeTime.$H+':'+dailiHabit.wakeTime.$m);
  const changeHandler = (event) => {
   setDailiHabit({ ...dailiHabit , [event.target.name] : event.target.value})
   console.log(dailiHabit);
  } 
  
   useEffect(()=> { (async function () {
      try{
        // const studentResponse = await axiosInstance.get(`/DailyHabits/GetDailyHabitsByStudent?Page=0&Count=1000&StudentID=${userID}`);
        const studentResponse = await axiosInstance.get(`https://api.ghahramaneman.com/api/DailyHabits/GetDailyHabitsByStudentDate?Page=0&Count=1000&StudentID=${userID}&FromDate=${today}&ToDate=${today}`)

        console.log(studentResponse);
        if(studentResponse.data.Result.length == 0){
          setDailiHabit({
            ...dailiHabit,
            wakeTime : '',
            sleepTime : '',
            eatwater : '',
            goodwork : '',
            wish :    '',
            // time : '',
            socialTime : '',
            moveTime : '',
          });
          console.log(studentResponse)
        }else{
          setDailiHabit({
            wakeTime : studentResponse.data.Result[0].WakeupTime,
            sleepTime : studentResponse.data.Result[0].SleepTime,
            eatwater : studentResponse.data.Result[0].GlassOfWaterNO,
            moveTime : studentResponse.data.Result[0].TimeOfMovment,
            socialTime : studentResponse.data.Result[0].HoursOfPhoneUse,
            goodwork : studentResponse.data.Result[0].GoodJobToday,
            wish :     studentResponse.data.Result[0].TheBestExperienceOfTheLastTwoDays,
            // wish : 'csacc',
            time : studentResponse.data.Result[0].Time
          })
          console.log(studentResponse.data.Result[0])
        }
      }
 
      catch( err ){
        console.log(err);
      }
    // const getDate = await axiosInstance.get('https://api.ghahramaneman.com/api/DailyStudy/GetDate')
    // console.log(getDate.data.Result.split(' '));
    // setCalender(getDate.data.Result.split(' ')[0])
    }) ()},[])


console.log(dailiHabit);
   const submitHandler = async(event) => {
    event.preventDefault()
    if(dailiHabit.time){
      console.log("in this");
      const sendUserDailyHabit = await axiosInstance.post('https://api.ghahramaneman.com/api/DailyHabits/EditDailyHabit',
      {
      StudentID: getCookie("ID"),
      ID: getCookie('ID'),
      Date: today,
      Time: "00:00",
      GlassOfWaterNO: dailiHabit.eatwater,
      TimeOfMovment: dailiHabit.moveTime.$H+':'+dailiHabit.moveTime.$m,
      WakeupTime: dailiHabit.wakeTime.$H+':'+dailiHabit.wakeTime.$m,
      SleepTime: dailiHabit.sleepTime.$H+':'+dailiHabit.sleepTime.$m,
      HoursOfPhoneUse: dailiHabit.socialTime.$H+':'+dailiHabit.socialTime.$m,
      GoodJobToday: dailiHabit.goodwork,
      // TheBestExperienceOfTheLastTwoDays: dailiHabit.wish,
      TheBestExperienceOfTheLastTwoDays: 'adsavadv',
    },
   {
      headers : {
          'Authorization' : "Bearer "+getCookie("access_token")  
    }
   }
   ,)
   if(sendUserDailyHabit.data.Status === "OK"){
    notify('success', 'اطلاعات با موفقیت ثبت شد')
    console.log(sendUserDailyHabit.data.Status);
   }
   else if(sendUserDailyHabit.data.Status === "Error"){
    notify('error', 'همه مقادیر را به درستی وارد کنید')
  }
   console.log(sendUserDailyHabit)
    }
     else{
   const sendUserDailyHabit = await axiosInstance.post('https://api.ghahramaneman.com/api/DailyHabits/InsertDailyHabit',
   {
   StudentID: getCookie("ID"),
   ID: getCookie('ID'),
   Date: today,
   Time: "12:00",
   GlassOfWaterNO: dailiHabit.eatwater,
   TimeOfMovment: dailiHabit.moveTime.$H+':'+dailiHabit.moveTime.$m,
   WakeupTime: dailiHabit.wakeTime.$H+':'+dailiHabit.wakeTime.$m,
   SleepTime: dailiHabit.sleepTime.$H+':'+dailiHabit.sleepTime.$m,
   HoursOfPhoneUse: dailiHabit.socialTime.$H+':'+dailiHabit.socialTime.$m,
   GoodJobToday: dailiHabit.goodwork,
   TheBestExperienceOfTheLastTwoDays: dailiHabit.wish,
 },
{
   headers : {
      'Authorization' : "Bearer "+getCookie("access_token")  
 }
}
,) 
if(sendUserDailyHabit.data.Status === "OK"){
  // notify('success', 'اطلاعات با موفقیت ثبت شد')
  
 }
 else if(sendUserDailyHabit.data.Status === "Error"){
  notify('error', 'همه مقادیر را به درستی وارد کنید')
}
    console.log(sendUserDailyHabit);
    }
  }
    return (
      <form onSubmit={submitHandler}>
        <div className='px-2 lg:px-8 text-black pb-44 text-base'>
            <div className='my-11'>
                <h2 className='text-sm sm:text-lg text-right mb-4 text-[#fb93ae] font-semibold'>اطلاعات کاربری</h2>
                <h3 className='text-xs sm:text-sm text-right text-[#00000080] font-semibold'>در این صفحه شما باید گزارش درس های خوانده شده را وارد کنید.</h3>
            </div>
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-5 mb-3 gap-x-4  '>
   
            <div className='flex flex-col'>
                <label className='labelinput mb-4'>ساعت بیداری</label>
                {/* <input type="text" placeholder=' تعداد لیوان های اب خورده را وارد کنید' 
                className='biginfoinput input' onChange={changeHandler} value={dailiHabit.eatwater}  name='eatwater' /> */}
                <TimePickerCom keyName={"wakeTime"} timeValue={dailiHabit.wakeTime} setTime={setTime}/>
              </div> 
              <div className='flex flex-col'>
                <label className='labelinput mb-4'>ساعت خواب</label>
                {/* <input type="text" placeholder=' تعداد لیوان های اب خورده را وارد کنید' 
                className='biginfoinput input' onChange={changeHandler} value={dailiHabit.eatwater}  name='eatwater' /> */}
                <TimePickerCom keyName={"sleepTime"} timeValue={dailiHabit.sleepTime} setTime={setTime}/>
              </div>
              <div className='flex flex-col'>
                <label className='labelinput mb-1'>تعداد لیوان های اب خورده</label>
                <input type="text" placeholder=' تعداد لیوان های اب خورده را وارد کنید' 
                className='biginfoinput input' onChange={changeHandler} value={dailiHabit.eatwater}  name='eatwater' />
              </div>
                {/* <TimePickerCom /> */}
              <div className='flex flex-col'>
                <label className='labelinput mb-4'>میزان زمان تحرک</label>
                {/* <input type="text" placeholder=' تعداد لیوان های اب خورده را وارد کنید' 
                className='biginfoinput input' onChange={changeHandler} value={dailiHabit.eatwater}  name='eatwater' /> */}
                <TimePickerCom keyName={"moveTime"} timeValue={dailiHabit.moveTime} setTime={setTime}/>
              </div>
              <div className='flex flex-col'>
                <label className='labelinput mb-4'>میزان زمان استفاده از فضای مجازی</label>
                {/* <input type="text" placeholder=' تعداد لیوان های اب خورده را وارد کنید' 
                className='biginfoinput input' onChange={changeHandler} value={dailiHabit.eatwater}  name='eatwater' /> */}
                <TimePickerCom keyName={"socialTime"} timeValue={dailiHabit.socialTime} setTime={setTime}/>
              </div>    
              
         </div>
         <div className='grid grid-cols-1 mt-12 lg:grid-cols-2 lg:gap-6  justify-between'>
         <div className='flex flex-col'>
                <label className='labelinput'>چه کار خوبی رو امروز انجام دادی که دوست داشتی؟</label>
                <textarea cols="60" className='border rounded-lg mt-4 p-3 placeholder:text-xs input' rows="5" placeholder='توضیحات خود را وارد کنید'
                value={dailiHabit.goodwork} onChange={changeHandler} name='goodwork' 
                ></textarea>
              </div>
         <div className='flex flex-col mt-5 lg:mt-0'>
                <label className='labelinput'>دوست داری از دیروز و امروز چه چیزی رو برای فردا تغییر بدی؟</label>
                <textarea cols="60" className='border rounded-lg mt-4 p-3 placeholder:text-xs input' placeholder='توضیحات خود را وارد کنید' rows="5"
                value={dailiHabit.wish} onChange={changeHandler} name='wish' 
                ></textarea>
              </div> 
         </div>
         <div className='flex justify-end mt-7'>
         <button type='submit'>
         <div className='flex  justify-center text-left border-navbarBt border 
 bg-navbarBt text-white py-4 text-sm sm:text-sm font-bold px-5 rounded-lg hover:bg-white hover:text-navbarBt transition-all duration-300 cursor-pointer'>
  ثبت عادت های روزانه
        </div>
         </button>
         </div>
    </div>
    <ToastContainer />
      </form>

    );
};
export default dailyHabit;