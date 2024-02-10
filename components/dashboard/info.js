import React , {useEffect, useState} from 'react';
import Button from '../button/button'
import QueryString from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from '../../helpers/toust'
import { getCookie, setCookie } from '../../apiRequest/cookieProvider';
import axiosInstance from '../../apiRequest/axiosInstance';
import axios from 'axios';
import axiosProvider from "../../apiRequest/axiosInstance";
import DropDown from './DropDown';
import { object, string, number } from "yup";
const info = () => {
  let data = {}
  let userID = getCookie('ID')
  const [userInfo , setUserInfo ]  = useState({
    CreatorID: getCookie('ID'),
    ID: getCookie('ID'),
    maritalStatus: "",
    Name: '',
    LastName: '',
    Phone: '',
    Email: "",
    PersonTypeID: getCookie('PersonType'),
    PayeTahsiliID: 0,
    Gender: "",
    NationalCode: "",
    FatherName: "",
    // State: "",
    Address: "",
    fildStudy : '',
  })
 useEffect(() => {
  setCookie('PAYE' , userInfo.fildStudy)
 },[userInfo.fildStudy])
  const [field , setField] = useState([])  
  const [fieldID , setFieldID] = useState()
  const [userReshte , setUserReshte] = useState('')
   const changeHandler = (event) => {
   setUserInfo({ ...userInfo , [event.target.name] : event.target.value})
   console.log(userInfo);
   } 
   useEffect(()  => {
    const getStudentData = async() => {
      const getStudentInfo = await axiosInstance.get(`https://api.ghahramaneman.com/api/Person/GetPerson_byID?ID=${userID}`,
      {
       headers : {
           'Authorization' : "Bearer "+getCookie("access_token")  
     }},)
     setUserInfo({
      Name: getStudentInfo.data.Result.Name,
      LastName: getStudentInfo.data.Result.LastName,
      Phone: getStudentInfo.data.Result.Phone,
      Email: getStudentInfo.data.Result.Email,
      PayeTahsiliID: getStudentInfo.data.Result.PayeTahsiliID,
      Gender: getStudentInfo.data.Result.Gender,
      NationalCode: getStudentInfo.data.Result.NationalCode,
      FatherName: getStudentInfo.data.Result.FatherName,
      // State: getStudentInfo.data.Result.State,
      Address: getStudentInfo.data.Result.Address,
      maritalStatus: getStudentInfo.data.Result.maritalStatus,
      fildStudy : getStudentInfo.data.Result.fieldOfStudy
     })
      console.log(getStudentInfo.data.Result);
    }

    getStudentData()
  


    const getField = async () =>{
      const getFieldItem = await axiosInstance.get('https://api.ghahramaneman.com/api/Person/GetFiled')
      console.log(getFieldItem.data.Result);
      setField(getFieldItem.data.Result)
    }
    getField()
   },[])
   console.log(field);
    const [selectedItem , setSeletedItem]  = useState({
      selectedID : null
    })
   function selectOption(item, key) {
    console.log(key)
    setSeletedItem({
      [key]: item
    });
    console.log(item.ID)
    setFieldID(item.ID)
  }

    const submitHandler = async(event) => {
     event.preventDefault()
    const sendUserData = await axiosInstance.post('https://api.ghahramaneman.com/api/Person/EditPerson',
    {
    // CreatorID: userInfo.ID,
    ID: getCookie('ID'),
    // maritalStatus: userInfo.maritalStatus,
    maritalStatus : userInfo.maritalStatus,
    Name: userInfo.Name,
    LastName: userInfo.LastName,
    Phone: userInfo.Phone,
    Email: userInfo.Email,
    PersonTypeID: userInfo.PersonTypeID, 
    PayeTahsiliID: userInfo.PayeTahsiliID,
    // Gender: userInfo.Gender,
    Gender : userInfo.Gender,
    NationalCode: userInfo.NationalCode,
    FatherName: userInfo.FatherName,
    // State: userInfo.State,
    Address: userInfo.Address,
    fieldOfStudy : fieldID
  },
 {
    headers : {
        'Authorization' : "Bearer "+getCookie("access_token")  
  }
}
,)
 localStorage.setItem('FirstName', userInfo.Name)
 localStorage.setItem('LastName',  userInfo.LastName)
console.log(sendUserData)

if(sendUserData.data.Status === 'OK'){
  notify('success' , 'اطلاعات با موفقیت ثبت شد')
} else{
  notify('err' , 'لطفا تمام موارد را بررسی کرده و دوباره امتحان کنید.')
}
   }
   useEffect(() => {
    if(userInfo.fildStudy){
      const numberFilter = field.find(item => item.ID === userInfo.fildStudy)
      // console.log(numberFilter.Name);
      setUserReshte (numberFilter.Name)
      console.log(userReshte);
    // console.log(field.map(item => item.ID));
     }
   },[field])


   const schema = object().shape({
    // valueI : string().required().trim(),
    valueIII : number().required(),

    // point : number().required().min(1).max(5),
    // descriptiveMode : number().required()
  });
  

   const [valueI , setValueI] = useState({
    valueIII : ''
   })
   const changeHandlerI = (event) => {
    setValueI(event.target.value)
    console.log(valueI);
  }
   const submitKON = async(event) => {
    event.preventDefault()
    try{
      const validatedData = await schema.validate({
        valueIII : 'kn'
      });
    }
    catch(err){
   console.log(err)
  //  console.log(validatedData.valueIII);
  //  console.log(valueI);
   console.log(err)


    }
    console.log(valueI);
    // console.log(validatedData.valueIII);
   }
  //  console.log(validatedData);
  console.log(userInfo.Gender)
  console.log(userInfo.maritalStatus)
    return (
      <>
      <form 
      onSubmit={submitHandler}
      >
    <div className=' px-2 lg:px-8 text-black pb-44'>
            <div className='my-10'>
                <h2 className='text-sm sm:text-lg text-right mb-4 text-[#fb93ae] font-semibold'>گزارش کار روزانه </h2>
                <h3 className='text-xs sm:text-sm text-right text-[#00000080] font-semibold'>برای دسترسی کامل به پنل، اطلاعات کاربری خود را وارد کنید.</h3>
            </div>
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4'>
              <div className='flex flex-col'>
                <label className='labelinput'>نام </label>
                <input type="text" placeholder='نام خود را وارد کنید' className='biginfoinput input font-' 
                onChange={changeHandler} name='Name' value={userInfo.Name} />
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>نام خانوادگی</label>
                <input type="text" placeholder='نام خانوادگی خود را وارد کنید' className='biginfoinput input '  
                 onChange={changeHandler} name='LastName' value={userInfo.LastName} />
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>نام پدر</label>
                <input type="text" placeholder='نام پدر را وارد کنید' className='biginfoinput input  ' 
                onChange={changeHandler} name='FatherName' value={userInfo.FatherName} />
              </div>  
 

              <div className='flex flex-col'>
                <label className='labelinput'>کد ملی</label>
                <input type="text" placeholder='کد ملی خود را وارد کنید' className='biginfoinput input' 
                onChange={changeHandler} name='NationalCode' value={userInfo.NationalCode} />
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>شماره تماس</label>
                <input type="text" placeholder='شماره تماس خود را با کیبورد انگلیسی وارد کنید' className='biginfoinput input' 
                   onChange={changeHandler} name='Phone' value={userInfo.Phone} />
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>ایمیل </label>
                <input type="text" placeholder='ایمیل را وارد کنید' className='biginfoinput input' 
                       onChange={changeHandler} name='Email' value={userInfo.Email} />
              </div>


              <div className='flex flex-col'>
                <label className='labelinput'>آدرس محل سکونت</label>
                <input type="text" placeholder='آدرس محل سکونت خود را وارد کنید' className='biginfoinput input'  
               onChange={changeHandler} name='Address' value={userInfo.Address} />
              </div>
              <div className='flex flex-col'>
                <label className='labelinput'>شغل</label>
                <input type="text" placeholder='شغل خود را وارد کنید' className='biginfoinput input' disabled
                name='' value={'دانشجو / دانش آموز'}  />
              </div>     
              
         </div>
         <div  className='grid grid-cols-1 lg:grid-cols-3'>
         <div className='flex  flex-col '>
                   <label className='labelinput'>وضعیت تاهل</label>
                   <select className='biginfoinput  text-base' 
                   value={userInfo.maritalStatus} name='maritalStatus' onChange={changeHandler} >
                      {userInfo.maritalStatus === 'single'? 
                    <option value="" key="0" hidden >مجرد  </option>
                    : userInfo.maritalStatus === 'rel' ? 
                    <option value="" key="0" hidden >متاهل  </option> :
                   <option value="0"  key="" hidden>مجرد / متاهل</option>}
                    <option value="single" key="مجرد">مجرد</option>
                    <option value="rel"    key="متاهل">متاهل</option>
                   </select>
                </div>
                <div className='text-right flex flex-col'>
                   <label className='labelinput '>رشته تحصیلی</label>
                   <div  className=' w-full text-[12px]  p-4' >
                <DropDown 
                 titleKeys={["Name"]}
                 optionList={field} 
                 selectOption={selectOption}
                  keyName={"selectedID"} 
                  selected={selectedItem.selectedID} 
                  dropDownTitle={ userReshte ? userReshte : "رشته تحصیلی خود را انتخاب کنید"}
                />
                   </div>
                </div>
                <div className='flex flex-col '>
                   <label className='labelinput'>جنسیت</label>
                   <select className='biginfoinput text-base  '
                   value={userInfo.Gender} name='Gender' onChange={changeHandler}  >
                    {userInfo.Gender === 'man'? 
                    <option value="" key="0" hidden >مذکر  </option>
                    : userInfo.Gender === 'woman' ? 
                    <option value="" key="0" hidden >مونث  </option> :
                    
                    <option  value="" key="0" hidden >  مذکر / مونث  </option>}
                    <option className='DropDown-options-item' value="man" key="مذکر">مذکر</option>
                    <option className='DropDown-options-item' value="woman" key="مونث">مونث</option>
                   </select>
                </div>
         </div>
         <div className='flex justify-end'>
         <button  type='submit'
        //  onClick={setData}
          className='text-left flex justify-end mt-7'>
       <div
       className='  justify-end text-left border-navbarBt border 
       bg-navbarBt text-white py-4 text-sm sm:text-sm font-bold px-5 rounded-lg hover:bg-white hover:text-navbarBt transition-all duration-300 cursor-pointer'>
             ثبت اطلاعات
       </div>
         </button>
         </div>


       

  
    </div>
    <ToastContainer />
    </form>

    {/* <div>
      <form onSubmit={submitKON}>
      <input style={{backgroundColor : 'aqua'}} type="text"
      onChange={changeHandlerI} name='valueIII' value={valueI.valueIII}  />
      <button>5555555555555555555555555+</button>
      </form>
      
    </div> */}

    </>
    );
};

export default info;