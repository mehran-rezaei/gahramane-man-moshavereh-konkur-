import axios from 'axios';
import axiosProvider from "../../apiRequest/axiosInstance";
import React, { useState ,useEffect } from 'react';
import Button from '../button/button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../helpers/toust'
import { getCookie } from '../../apiRequest/cookieProvider';
import axiosInstance from '../../apiRequest/axiosInstance';
import DropDown from './DropDown';
import TableReport from './TableReport';

const workReport = () => {
  const [StudentTable , setStudentTable ] = useState([]) 
  const [ studentINfo , setStudentInfo ] = useState({
    SleepTime : '',
    WakeupTime : '',
    HoursOfPhoneUse : '',
    TimeOfMovment : '',
    GoodJobToday : '',
    TheBestExperienceOfTheLastTwoDays : '',
    Time : '',
    ConsultantComment : '',
    GlassOfWaterNO : ''
  })
 const [studentID , setStudentID] = useState('')
  const [state, setState] = useState({
    studentList: [],
    weekList: [],
    tableData : [
      {week : "هفته 1", comment:"نیاز به تلاش", description: "توضیح 1", point: "10"},
      {week : "هفته 2", comment:"نیاز به تلاش", description: "توضیح 2", point: "10"},
      {week : "هفته 3", comment:"نیاز به تلاش", description: "توضیح 3", point: "10"},
      {week : "هفته 4", comment:"نیاز به تلاش", description: "توضیح 4", point: "10"},
      {week : "هفته 5", comment:"نیاز به تلاش", description: "توضیح 5", point: "10"},
      {week : "هفته 6", comment:"نیاز به تلاش", description: "توضیح 6", point: "10"},
      {week : "هفته 7", comment:"نیاز به تلاش", description: "توضیح 7", point: "10"}
    ],
    activeWeek : null,
    startDate : null,
    endDate : null,
    selectedStudent: null,
    selectedDate : null,
    selectedComment : null
  });

  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
  console.log(today);
  let splitDay = today.split('/')
  // if(splitDay[2] >32){
  //   console.log(splitDay[2] -1);
  // } else if(splitDay[1]> 1){
  //   console.log(splitDay[1] -1);
  //   splitDay[2] =30
  //   console.log(splitDay[2]);
  // } else if(splitDay[1] ==1){
  //     if(splitDay[2] >1){
  //       console.log(splitDay[2] -1);
  //     }
  // }
  let splitedDay = `${splitDay[0]}/${splitDay[1]}/${splitDay[2] -1}`
  console.log(splitDay[2] -1);
  console.log(splitedDay);
  console.log();
  useEffect(() => {(async function(){
    
    try{
      const weeksResponse = (await axiosProvider.get("/Week/GetAllWeek")).data.Result;
      console.log(weeksResponse)
      const activeWeek = weeksResponse.find( item => item.Active );
      const ConsultantID = getCookie("access_token");
      const FromDate = activeWeek.StartWeekDate;
      
     const ToDate = '1401/11/23'
      const id = getCookie("ID")
      const count = 1000
      const page = 0
          // useEffect(()=>{

          // },[])
          const studentResponse = await axiosInstance.get(`https://api.ghahramaneman.com/Api/WeeklyAnalysis/GetSutdentConsultantList?Page=${page}&Count=${count}&ConsultantID=${id}`,{
       
        headers : {
          'Authorization' : "Bearer "+getCookie("access_token")
        }
      });
      console.log(studentResponse.data.Result);
      setState({
        ...state,
        activeWeek,
        weekList : weeksResponse,
        studentList : studentResponse.data.Result,
        // ConsultantComment : studentResponse.data.Result.ConsultantComment
      });
    }
    catch( err ){
      console.log(err)
    }


    console.log(studentINfo);
  })() }, []);
  
  function selectOption(item, key) {
    console.log(key)
    setState({
      ...state,
      [key]: item
    });
    console.log(item);
    setStudentID(item.StudentsID)
  }

    // useEffect(()=>{

    // },[setStudentID])
    useEffect(()=>{

    
    if(studentID){
    const OneStudentData =  async() => {
      const studentReport = await axiosInstance.get(`https://api.ghahramaneman.com/api/DailyHabits/GetDailyHabitsByStudent?Page=0&Count=1000&StudentID=${studentID}`,{
        headers : {
        'Authorization' : "Bearer "+getCookie("access_token")
        }
        });
        console.log(studentReport.data.Result[0]);
        if(studentReport.data.Result[0]){
          setStudentInfo({
            SleepTime : studentReport.data.Result[0].SleepTime,
            WakeupTime : studentReport.data.Result[0].WakeupTime,
            HoursOfPhoneUse : studentReport.data.Result[0].HoursOfPhoneUse,
            GoodJobToday : studentReport.data.Result[0].GoodJobToday,
            TheBestExperienceOfTheLastTwoDays : studentReport.data.Result[0].TheBestExperienceOfTheLastTwoDays,
            Time : studentReport.data.Result[0].Time,
            TimeOfMovment : studentReport.data.Result[0].TimeOfMovment,
            ConsultantComment : studentReport.data.Result[0].ConsultantComment,
            GlassOfWaterNO : studentReport.data.Result[0].GlassOfWaterNO
          })
        }else{
          setStudentInfo({
            SleepTime : '',
            WakeupTime : '',
            HoursOfPhoneUse : '',
            TimeOfMovment : '',
            GoodJobToday : '',
            TheBestExperienceOfTheLastTwoDays : '',
            Time : '',
            ConsultantComment : '',
            GlassOfWaterNO : ''
          })
        }
        console.log(studentReport.data.Result[0]);
    }
    OneStudentData()
    const gettable = async () => {
    
      const userTable = await axiosInstance.get(`https://api.ghahramaneman.com/api/DailyStudy/GetDailyStudyDate1Student?Page=0&Count=100&thisdate=${splitedDay}&student=${studentID}`,{
        headers : {
        'Authorization' : "Bearer "+getCookie("access_token")
       }, 
       });
       console.log(userTable.data.Result);
    setStudentTable(userTable.data.Result)
    }
    gettable()
  }
},[studentID])
  
  console.log(StudentTable);
  console.log(studentINfo);
  const sendcomment = async (event) => { 
    event.preventDefault()
    if(studentINfo.ConsultantComment){
     const userComment = await axiosInstance.post('https://api.ghahramaneman.com/api/DailyHabits/EditDailyHabit',
      {
        ConsultantComment : studentINfo.ConsultantComment,
        ConfirmByConsultant : true,
        Date: today,
        GlassOfWaterNO: studentINfo.GlassOfWaterNO,
        GoodJobToday:  studentINfo.GoodJobToday,
        HoursOfPhoneUse: studentINfo.HoursOfPhoneUse,
        ID: getCookie('ID'),
        SleepTime: studentINfo.SleepTime,
        StudentID: studentID,
        TheBestExperienceOfTheLastTwoDays: studentINfo.TheBestExperienceOfTheLastTwoDays,
        Time: '22:59',
        TimeOfMovment: studentINfo.TimeOfMovment,
        WakeupTime: studentINfo.WakeupTime,
      },
     {  
      headers : {
       'Authorization' : "Bearer "+getCookie("access_token")
      }
    }, 
      );
      console.log(userComment);
      if(userComment.data.Status === 'OK'){
        notify('success', 'با موفقیت ثبت شد')
      };

    }else{
      notify('error', 'نمیتوانید نظری بدون عبارت ثبت کنید')
    }
  }
  console.log(studentINfo.ConsultantComment);
  const sendcommentFalse = async(event) => {
    event.preventDefault()
    if(studentINfo.ConsultantComment){
      const userCommentfalse = await axiosInstance.post('https://api.ghahramaneman.com/api/DailyHabits/EditDailyHabit',
      {
        ConsultantComment : studentINfo.ConsultantComment,
        ConfirmByConsultant : false,
        Date: today,
        GlassOfWaterNO: studentINfo.GlassOfWaterNO,
        GoodJobToday:  studentINfo.GoodJobToday,
        HoursOfPhoneUse: studentINfo.HoursOfPhoneUse,
        ID: getCookie('ID'),
        SleepTime: studentINfo.SleepTime,
        StudentID: studentID,
        TheBestExperienceOfTheLastTwoDays: studentINfo.TheBestExperienceOfTheLastTwoDays,
        Time: '22:59',
        TimeOfMovment: studentINfo.TimeOfMovment,
        WakeupTime: studentINfo.WakeupTime,
      },
     {  
      headers : {
       'Authorization' : "Bearer "+getCookie("access_token")
      }
    }, 
      );
      console.log(userCommentfalse);
      if(userCommentfalse.data.Status === 'OK'){
        notify('success', 'با موفقیت ثبت شد')
      };
    }else{
      notify('error', 'نمیتوانید نظری بدون عبارت ثبت کنید')
    }

  }
  const commentHandler =(event) => {
    console.log(event.target.value);
    setStudentInfo({
      ...studentINfo ,  
      ConsultantComment : event.target.value
    })
  }
 
    return (
      <form>
                <div className='px-8 text-black pb-44 text-base'>
              <div className='mt-11'>
                <h2 className='text-lg text-right mb-4 text-[#fb93ae] font-semibold'>گزارش کار های دانش آموزان</h2>
            </div>
            <div className='flex  flex-col mb-6'>
                   <div className='dropDown-container'>
            <DropDown titleKeys={["StudentName", "LastNameStudent"]} optionList={state.studentList} selectOption={selectOption} keyName={"selectedStudent"} selected={state.selectedStudent} dropDownTitle="لیست دانش آموزان" />
          </div>
                </div>
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-3  mb-3  '>
   
            <div className='flex flex-col'>
                <label className='labelinput'>ساعت بیداری</label>
                <input type="text" placeholder='ساعت بیداری ' required 
                className='biginfoinput input'  disabled value={studentINfo.WakeupTime} name=''/>
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>ساعت خواب</label>
                <input type="text" placeholder='ساعت خواب   ' required
                className='biginfoinput input' disabled value={studentINfo.SleepTime} name=''/>
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>ساعت مطالعه</label>
                <input type="text" placeholder='ساعت مطالعه' required
                className='biginfoinput input' disabled value={studentINfo.Time}  name='' />
              </div>

              <div className='flex flex-col'>
                <label className='labelinput'>میزان زمان تحرک</label>
                <input type="text" placeholder='میزان زمان تحرک' required
                className='biginfoinput input' disabled value={studentINfo.TimeOfMovment}  name=''/>
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>میزان زمان استفاده از  تلفن</label>
                <input type="text" placeholder='میزان زمان استفاده از تلفن  ' required
                 className='biginfoinput input' disabled  value={studentINfo.HoursOfPhoneUse}  name=''/>
              </div>    
              
         </div>
         <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-6  justify-between'>
         <div className='flex flex-col'>
                <label className='labelinput'>چه کار خوبی رو امروز انجام دادی که دوست داشتی؟</label>
                <textarea cols="60" disabled className='border rounded-lg mb-4 lg:mb-0 mt-4 p-3 placeholder:text-xs' rows="5" placeholder=''
                value={studentINfo.GoodJobToday} name='' required
                ></textarea>
              </div>
         <div className='flex flex-col'>
                <label className='labelinput'>دوست داری از دیروز و امروز چه چیزی رو برای فردا تغییر بدی؟</label>
                <textarea cols="60" disabled className='border rounded-lg mt-4 p-3 placeholder:text-xs' placeholder='' rows="5"
                value={studentINfo.TheBestExperienceOfTheLastTwoDays} name='' required
                ></textarea>
              </div> 
         </div>
         <div className='flex justify-end mt-7'>
         <button type='submit'>
         </button>
         </div>
         <TableReport StudentTable={StudentTable} 
         headTitles={ ["#","نام درس","مبحث","زمان مطالعه","زمان مرور","زمان تست","تعداد تست","تست درست" ,"تست غلط" ,"درصد"] }/>
          { studentINfo.SleepTime &&  
         <div className='flex flex-col'>
                <label className='labelinput'>نظر مشاور: </label>
                <div className='grid grid-cols-1 lg:flex justify-between items-center ' >
                <textarea cols="60"  className='input shadow-sm w-full mb-4  md:w-3/4 border rounded-lg mt-4 md:p-3 placeholder:text-xs' placeholder='' rows="3"
                value={studentINfo.ConsultantComment} onChange={commentHandler} name='ConsultantComment' 
                ></textarea>
                <div>
                  <button onClick={sendcomment} className='w-28 h-10 ml-3 mb-2 rounded-md text-white bg-[#00c853]'>تایید</button>
                  <button onClick={sendcommentFalse} className='w-28 h-10 ml-3 rounded-md text-white bg-[#ff1744]'>رد</button>
                </div>
                </div>
         </div>}
    </div>
    
    <ToastContainer />
      </form>
    
    );
};
export default workReport;