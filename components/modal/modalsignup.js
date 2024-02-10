import React , {useContext,useEffect,useState} from 'react';
import  Link  from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// images
// import logo from '../images/logogreen.svg'
// import student from '../images/student.png'
// components
import Button from '../button/button';
import { validate } from '../../helpers/validate';
import {notify} from '../../helpers/toust'
//context
import { modalHandler } from '../../context/ModalReducer';
import axios from 'axios';
import { setCookie , getCookie} from '../../apiRequest/cookieProvider';
const ModalSignUp = () => {
    const { dispatch} = useContext(modalHandler)
    let router = useRouter()

    const [data , setData] = useState({
      name : "",
      phoneNumber : "",
      password : "",
      lastname : "",

  })
  const [error , setError] = useState({})
  const [touched , setTouched] = useState({
      name : false,
      phoneNumber : false,
      lastname : false,
  })
  const changeHandler = (event) => {
        setData({ ...data , [event.target.name] : event.target.value })
         console.log(data);
  }
  const focusHandler = (event) => {
      setTouched({ ...touched , [event.target.name] : true })
  }

  const submitHandler = (event) => {
      event.preventDefault()
      if(!Object.keys(error).length){
        axios.post(`https://api.ghahramaneman.com/api/Person/InsertUserPerson?Name=${data.name}&LastName=${data.lastname}&Phone=${data.phoneNumber}`)
        .then(Response => {
            console.log(Response);
            if(Response.data.ErrorMessage === "شما با این شماره قبلا ثبت نام نموده اید."){
              notify('err','"شما با این شماره قبلا ثبت نام نموده اید."')
            } else if(Response.data.Status === 'OK'){
              setCookie('ID', (Response.data.Result.ID));
            dispatch({type : 'ON_VALIDATION', payload: data.phoneNumber})
            }
            console.log(data);
        })

      } else {
          setTouched({
              name : true,
              phoneNumber : true,
              password : true,
              lastname : true,
          })
       notify("failed","inavalid data")
      }
  } 

  useEffect( () => {
      setError(validate(data , "singup"))
  },[data])
  console.log(error);

    return (
        <div >
            <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex sm:min-h-full items-end justify-center p-4 text-right sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pt-3 pb-4 sm:px-8 sm:py-3 sm:pb-4">
          <div class="sm:flex flex-col ">
            <div className='flex justify-between items-center'>
                <div className='flex items-center text-right'>
                <img src='../images/logogreen.svg' alt="" />
                <div className='mr-5'>
                <h2 className='text-navbarBt text-sm sm:text-lg'>تعیین وقت مشاوره</h2>
                <h2 className='text-xs sm:text-sm text-black font-light mt-1'>آیندتو همین الان تصاحب کن!!</h2>
                </div>
                </div>
                <div className='cursor-pointer' onClick={() => dispatch({type : 'OFF_SIGNUP'})}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="modalOff" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            </div>
            </div>
            <form onSubmit={submitHandler}>
            <div >
                    <div className='flex flex-col justify-center items-center text-center mt-4 sm:mt-8'>
                        <img src='../images/student.png' alt="" className='h-14 w-14 sm:h-20 sm:w-20' />
                        <h2 className='mt-3 mb-3 sm:mb-6 text-navbarBt font-medium sm:text-lg'>
                            ثبت نام      
                        </h2>
                    </div> 
                    <div className='text-right text-xs sm:text-sm'>
                        <div className='flex flex-col justify-between mb-4'>
                              <label  className='mb-2'>نام</label>  
                              <input 
                               className='border px-4 py-2 rounded-md placeholder:text-xs placeholder:font-extralight' 
                               placeholder='نام خود را وارد کنید' type="text"
                               name='name'  value={data.name}  onChange={changeHandler}   onFocus={focusHandler} />  
                        </div>
                        <div className='flex flex-col justify-between mb-4'>
                              <label className='mb-2' >نام خانوادگی</label>  
                              <input   
                              className='border px-4 py-2 rounded-md placeholder:text-xs placeholder:font-extralight'
                               placeholder='نام خانوادگی خود را وارد کنید' type="text"  
                               name='lastname' value={data.lastname}  onChange={changeHandler}   onFocus={focusHandler} />  
                        </div>
                        <div className='flex flex-col justify-between'>
                              <label  className='mb-2'>شماره تماس</label>  
                              <input  
                              className='border px-4 py-2 rounded-md placeholder:text-xs placeholder:font-extralight' 
                              type='text'
                               placeholder='شماره تماس خود را وارد کنید'
                               value={data.phoneNumber} name='phoneNumber' onChange={changeHandler} onFocus={focusHandler} />  
                        </div>
                    </div> 
                    <div>
                    <button className='block w-full mt-4 sm:mt-8' type='submit'>
                     <Button text={'ثبت نام'}/>
                     </button></div>  
            </div>
            </form>
          </div>
        </div>
        <div class="px-4 pb-4 flex flex-col sm:px-6">
            <div className=''>
            </div>
          <p className='text-[11px] sm:text-[12px] text-right px-3 '>
                                <span> با ورود و یا ثبت نام در قهرمان من شما </span>
                                <Link onClick={() => dispatch({type: 'OFF_SIGNUP'})} href='ourrules' className='text-navbarBt' >  شرایط و قوانین</Link>
                                <span> استفاده از سرویس های سایت قهرمان من   و</span>
                                <Link  onClick={() => dispatch({type: 'OFF_SIGNUP'})}  href='privacy' className='text-navbarBt' >  قوانین حریم خصوصی </Link>
                                <span> آن را می‌پذیرید.</span>
             </p>
        </div>
      </div>
    </div>
  </div>
</div>
<ToastContainer />
        </div>
    );
};

export default ModalSignUp;