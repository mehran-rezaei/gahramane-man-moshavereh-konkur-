import React, { use, useEffect, useRef, useState } from 'react';
// import QueryString from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../helpers/toust'
import { getCookie } from '../../apiRequest/cookieProvider';
import axiosInstance from '../../apiRequest/axiosInstance';
import moment from 'jalali-moment';
import { object, string, number } from "yup";

import DropDown from './DropDown';
import TimePickerCom from "./TimePickerCom";


const DailyReport = () => {
  let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
  // let today = '1401/11/19'
  const [submitType ,setSubmitType] = useState('insert')
  
  console.log(today);
  let userID = getCookie('ID')
  let payeDarsi = getCookie('PAYE')
  console.log(payeDarsi)
  const [datasended , setDataSended] = useState(false)
  const [state, setState] = useState({
    // studentMajor: '',
    selectedLesson: '',
    selectedLessonTopic: '',
    lessonTopsList: [],
    lessonsList: [],
    studyTime: '',
    repeatTime: '',
    testTime: '',
    rightTest : '',
    wrongTest :  '',
    percendtest : '',
    numberTest : '',
    editLesson : '',
    editTopic : '',
    lessonID : ''
  });
  const [userLessons ,setUserLessons] = useState([])
  console.log(state.selectedLesson)
  const changeHandler = (event) => {
    setState({ ...state , [event.target.name] : event.target.value})
    console.log(state);
   }  
  
   useEffect(() => {
    (async function () {

      const sendUserDailyHabit = await axiosInstance.get(`https://api.ghahramaneman.com/api/DailyStudy/GetDailyStudybyPrsIDDate?Page=0&Count=10000&PersonID=${userID}&FromDate=${today}&ToDate=${today}`,
   {
      headers : {
          'Authorization' : "Bearer "+getCookie("access_token")  
    }
   }
   ,)
      console.log(sendUserDailyHabit.data.Result)
      setUserLessons(sendUserDailyHabit.data.Result)
    })()
  }, [datasended ,setDataSended]);


  console.log(state)
  useEffect(() => {
    (async function () {
      //to get student field
      // const studentMajorResponse = await axiosInstance.get();
      if(payeDarsi){
        const lessonsResponse = await axiosInstance.get(`/DailyStudy/GetBookbyFieldAndPaye?field=${payeDarsi}`);
        console.log(lessonsResponse)
       setState({
         ...state,
         lessonsList: lessonsResponse.data.Result,
      
       });
      }
    })()
  }, []);
  useEffect(() => {

    if (state.selectedLesson) {
      // console.log(state.selectedLesson)

      axiosInstance.get(`/DailyStudy/GetTopic?BookID=${state.selectedLesson.ID}&Field=${payeDarsi}`).then(response => {
        console.log(response);
        setState({
          ...state,
          lessonTopsList: response.data.Result,
          editLesson : '',
          editTopic : ''
        });
      }).catch(err => console.log(err));

    }

  }, [state.selectedLesson]);

  function selectOption(value, key) {
    setState({
      ...state,
      [key]: value,
      editLesson : '',
      editTopic : ''
    });
  }

  const schema = object().shape({
    selectedLesson : number().required(),
    selectedLessonTopic : number().required(),
    allTests : number().required(),
    repeatTime : string().required(),
    testTime : string().required(),
    studyTime : string().required(),
    correctTest : number().required(),
    wrongTests : number().required()
  });
  console.log(state)
  const submitHandler = async (event) => {
 
    
    event.preventDefault();
    const { selectedLesson, selectedLessonTopic, testTime, repeatTime, studyTime } = state;
    
    const sendData = await axiosInstance.post('https://api.ghahramaneman.com/api/DailyStudy/InsertDailyStudy',
    {
        ID: 0,
        PersonID: getCookie("ID"),
        date: today,
        BookID: selectedLesson.ID,
        Topic:  selectedLessonTopic.Topic,
        ReViewTime: repeatTime.$H+':'+repeatTime.$m,
        StudyTime: studyTime.$H+':'+studyTime.$m,
        TestTime: testTime.$H+':'+testTime.$m,
        TestNumber: state.numberTest,
        RightTestNumber: state.rightTest,
        WrongTestNumber: state.wrongTest,
        CreatorID: "",
        CreatorName: "",
        CreateDate: "",
        CreateTime: '',
        EditID: 0,
        EditorName: "",
        EditDate: "",
        lessonID : ''
    },
    {
      headers : {
        'Authorization' : "Bearer "+getCookie("access_token")  
     }
    }
    )
    console.log(sendData)
    setDataSended(!datasended)
    if(sendData.data.Status === 'OK'){
      if(sendData.data.Result.BookID){
        notify('success' , 'گزارش کار با موفقیت ثبت شد')
      } else{
      notify('err' , 'لطفا تمام موارد را بررسی کرده و دوباره امتحان کنید.')
      }     
    } else{
      notify('err' , 'لطفا تمام موارد را بررسی کرده و دوباره امتحان کنید.')
    }
  }
 
 const  deleteWorkReport = async (id) => {
  console.log(id)
  const deleteLesonss = await axiosInstance.get(`https://api.ghahramaneman.com/api/DailyStudy/DeleteDailyStudy?ID=${id}`,
  {
    headers : {
      'Authorization' : "Bearer "+getCookie("access_token")  
   }
  }
  )
  console.log(deleteLesonss)
  if(deleteLesonss.data.Status === 'OK'){
    notify('success' , 'گزارش کار با موفقیت حذف شد')
  } else{
    notify('err' , 'خطا')

  }
  setDataSended(!datasended)
 
 } 
 const EditWorkReport = async(item) => {
  setSubmitType('edit')
  console.log(item)

   setState({
    ...state,
    selectedLessonTopic : {
      BookID : item.BookID,
      Topic : item.Topic
    },
    selectedLesson :{
      Name : item.BookName,
      ID : item.BookID ,
      Field : payeDarsi,
    },
    testTime: item.TestTime,
    rightTest : item.RightTestNumber,
    wrongTest :  item.WrongTestNumber,
    numberTest : item.TestNumber,
    studyTime: item.StudyTime,
    repeatTime: item.ReViewTime,
    lessonID  : item.DailystudyID
 })
 console.log(state)

 }
 const sendEditData =async (event)=> {
  event.preventDefault();

  console.log(state)
  const { selectedLesson, selectedLessonTopic, testTime, repeatTime, studyTime } = state;
  try{
  const sendEditData = await axiosInstance.post('https://api.ghahramaneman.com/api/DailyStudy/EditDailyStudy',
  {
      ID: state.lessonID,
      PersonID: getCookie("ID"),
      date: today,
      BookID: selectedLesson.ID,
      // Topic:  selectedLessonTopic.ID,
      Topic:  selectedLessonTopic.Topic,
      // Topic:  "مجموعه  های متناهی و نامتناهی",
      ReViewTime: repeatTime.$H+':'+repeatTime.$m,
      StudyTime: studyTime.$H+':'+studyTime.$m,
      TestTime: testTime.$H+':'+testTime.$m,
      TestNumber: state.numberTest,
      RightTestNumber: state.rightTest,
      WrongTestNumber: state.wrongTest,
      CreatorID: "",
      CreatorName: "",
      CreateDate: "",
      CreateTime: '',
      EditID: 0,
      EditorName: "",
      EditDate: "",
  },
  {
    headers : {
      'Authorization' : "Bearer "+getCookie("access_token")  
   }
  }
  )
  // console.log(sendEditData)
  setDataSended(!datasended)
  if(sendEditData.data.Status === 'OK'){
    notify('success' , 'گزارش کار با موفقیت ثبت شد')
  } 
  // else{
  //   // console.log('sss')
  //   // notify('err' , 'لطفا تمام موارد را بررسی کرده و دوباره امتحان کنید.')
  // }
}
catch(err){
  console.log(err)
    notify('err' , 'لطفا تمام موارد را بررسی کرده و دوباره امتحان کنید.')

}
}
 



 let percentNumber = 0
 let percentFixed = 0
 if(state.rightTest && state.numberTest){
  if(state.numberTest >= state.rightTest){
    percentNumber = parseInt(state.rightTest) / parseInt(state.numberTest) *100
    percentFixed = percentNumber.toFixed(0)
  }
 } 
 console.log(percentNumber)

 console.log(percentFixed)
  return (
    <div className='pb-20'>
  
    <form onSubmit={submitHandler}>
      <div className='px-2 lg:px-8 text-black pb-1 text-base'>
        <div className='my-10'>
          <h2 className='text-sm sm:text-lg text-right mb-4 text-[#fb93ae] font-semibold'>اطلاعات کاربری</h2>
          <h3 className='text-xs sm:text-sm text-right text-[#00000080] font-semibold'>در این صفحه شما باید گزارش درس های خوانده شده را وارد کنید.</h3>
          { payeDarsi ? '' :
          <h3  className='mt-3 text-xs sm:text-xs text-right text-[#00000080] font-semibold'>
          توجه داشته باشید که حتما در قسمت اطلاعات کاربری رشته خود را انتخاب کرده باشید</h3>
        }
        </div>
        <div className='grid grid-cols-1 gap-x-6 lg:grid-cols-3  '>
          <div className='flex  flex-col w-full '>
            <label className='labelinput mb-4 font-bold'>نام درس</label>
            <DropDown titleKeys={["Name"]} optionList={state.lessonsList} selectOption={selectOption} keyName={"selectedLesson"} selected={state.selectedLesson} 
            dropDownTitle="انتخاب کنید"  />
          </div>

          <div className='flex flex-col lg:mt-0 mt-6'>
            <label className='labelinput mb-4'>مبحث درس</label>
            <DropDown titleKeys={["Topic"]} optionList={state.lessonTopsList} selectOption={selectOption} keyName={"selectedLessonTopic"} selected={state.selectedLessonTopic}
             dropDownTitle="انتخاب کنید"   />
          </div>
          <div className='flex flex-col lg:mt-0 mt-7'>
            <label className='labelinput mb-3'>میزان ساعت مطالعه</label>
            <TimePickerCom setTime={selectOption} keyName={"studyTime"} timeValue={state.studyTime} />
          </div>
        </div>

        <div className='grid grid-cols-1 mt-10 gap-x-6 lg:grid-cols-3 gap-y-6 mb-3 '>

          <div className='flex flex-col'>
            <label className='labelinput mb-3'> زمان مرور</label>
            <TimePickerCom setTime={selectOption} keyName={"repeatTime"} timeValue={state.repeatTime} />
          </div>
          <div className='flex flex-col'>
            <label className='labelinput mb-3'>میزان زمان تست زنی</label>
            <TimePickerCom setTime={selectOption} keyName={"testTime"} timeValue={state.testTime} />
          </div>
          <div className='flex flex-col'>
            <label className='labelinput'>تعداد تست زده شده </label>
            <input type="number"  placeholder='تعداد تست زده شده را وارد کنید' className='biginfoinput input' 
            name='numberTest' onChange={changeHandler} value={state.numberTest} />
          </div>
          
          <div className='flex flex-col'>
            <label className='labelinput'> تعداد تست درست</label>
            <input type="number"  placeholder='تعداد تست درست را وارد کنید' className='biginfoinput input'
             name='rightTest'  onChange={changeHandler} value={state.rightTest}/>
          </div>
          <div className='flex flex-col'>
            <label className='labelinput'>تعداد تست غلط</label>
            <input type="number"  placeholder='تعداد تست غلط را وارد کنید' className='biginfoinput input' 
            name='wrongTest' onChange={changeHandler} value={state.wrongTest}  />
          </div>
          {percentNumber ?
          <div className='flex flex-col'>
            <label className='labelinput'>درصد تست های درست</label>
            <input type="text" disabled placeholder='درصد تست های درست' className='biginfoinput input' 
            // name='percendtest'  onChange={changeHandler} value={'100%'} 
            value={`${percentFixed}%`}
              />
          </div> : ''}

        </div>

        <div className='flex justify-end mt-7'>

              {submitType === 'insert' ? 
          <button type='submit'>

            <div className='flex  justify-center text-left border-navbarBt border 
               bg-navbarBt text-white py-4 text-sm sm:text-sm font-bold px-5 rounded-lg hover:bg-white hover:text-navbarBt transition-all duration-300 cursor-pointer'>
              ثبت گزارش کار
            </div>

          </button> :
           <button onClick={sendEditData}>

          <div className='flex  justify-center text-left border-navbarBt border 
             bg-navbarBt text-white py-4 text-sm sm:text-sm font-bold px-5 rounded-lg hover:bg-white hover:text-navbarBt transition-all duration-300 cursor-pointer'>
            ویرایش گزارش کار
          </div>

          </button> 
        }

        </div>

      </div>
      <ToastContainer />
    </form>
    <div className='text-black px-2 lg:pr-5 pl-8 rounded-xl shadow-xl py-4 w-fit border border-gray-100'>
      {userLessons &&
      <table className='workReportTable   '>
        <thead className='text-sm'>
            <tr className=''>
              <th>نام درس</th>
              <th>مبحث درس</th>
              <th>میزان ساعت مطالعه</th>
            </tr>
        </thead>
        <tbody className='text-base'>
              {/* <tr className=''>
                <td className='text-navbarBt'>زیست شناسی 1	</td>
                <td>گسترده حیات	</td>
                <td>00:00	</td>
                <td className='text-[#2626ff]'>ویرایش</td>
                <td className='text-[#FE5656]'>حذف</td>
              </tr> */}
              {
                    userLessons.map((item) =>  <tr key={item.DailystudyID}>
                        <td className='text-navbarBt'>{item.BookName}</td>
                        <td>{item.Topic}</td>
                        <td>{item.StudyTime}</td>
                        {/* <td>{item.BookID}</td> */}
                        <td>
                          <span onClick={() => EditWorkReport(item)} 
                          className='text-[#2626ff] cursor-pointer'>ویرایش</span>
                        </td>
                        <td >
                          <span onClick={() => deleteWorkReport(item.DailystudyID)} className='text-[#FE5656] cursor-pointer' >
                              حذف
                          </span>
                          </td>
                    </tr>
                    )
                }
        </tbody>
      </table> }
    </div>
    </div>
  );
};

export default DailyReport;