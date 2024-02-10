import React, { useState, useEffect, useRef } from 'react';
import axiosProvider from "../../apiRequest/axiosInstance";
import Button from '../button/button'
import QueryString from 'qs';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../helpers/toust'
import { getCookie } from "../../apiRequest/cookieProvider";
import DropDown from './DropDown';
import DatePickerCom from './DatePickerCom';
import ChartCom from './ChartCom';
import TableCom from './TableCom';
import axiosInstance from '../../apiRequest/axiosInstance';
import moment from 'jalali-moment';
import { object, string, number } from "yup";


const Analiz = () => {

  const [state, setState] = useState({
    studentList: [],
    weekList: [],
    tableData: [],
    activeWeek: null,
    StartWeekDate: null,
    EndWeekDate: null,
    selectedStudent: null,
    selectedWeek: null,
    selectedDescptiveComment: null,
    chart1Data: null,
    chart2Data: null,
    chart3Data: null,
    descriptiveList: []
  });

  useEffect(() => {
    (async function () {

      try {
        const weeksResponse = (await axiosProvider.get("/Week/GetAllWeek")).data.Result;
        const activeWeek = weeksResponse.find(item => item.Active);
        console.log(activeWeek);
        console.log(weeksResponse);
        const ConsultantID = getCookie("ID")
        const studentResponse = await axiosInstance.get(`/WeeklyAnalysis/GetSutdentConsultantList?ConsultantID=${ConsultantID}&Page=0&Count=1000`);
        console.log(studentResponse);
        setState({
          ...state,
          activeWeek,
          selectedWeek: activeWeek,
          StartWeekDate: activeWeek.StartWeekDate,
          EndWeekDate: activeWeek.EndWeekDate,
          weekList: weeksResponse,
          studentList: studentResponse.data.Result
        });
      }
      catch (err) {
        console.log(err);
      }

    })()
  }, []);

  const pointRef = useRef(null);
  const commentRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    (async function () {

      try {

        if (state.selectedStudent) {
          const tableResponse = await axiosInstance.get(`/WeeklyAnalysis/GetWeeklyAnalysiFromDateToDate?FromDate=${state.StartWeekDate}&ToDate=${state.EndWeekDate}&Page=0&Count=1000&studentID=${state.selectedStudent.StudentsID}`);
          const chart1Response = await axiosInstance.get(`/DailyStudy/Chart_TimeStudy_StudentID?StudentID=${state.selectedStudent.StudentsID}&FromDate=${state.StartWeekDate}&ToDate=${state.EndWeekDate}`);
          const chart2Response = await axiosInstance.get(`/DailyStudy/Chart_TimeStudy_StudentID_Daily?StudentID=${state.selectedStudent.StudentsID}&FromDate=${state.StartWeekDate}&ToDate=${state.EndWeekDate}`)
          const chart3Response = await axiosInstance.get(`/DailyStudy/Chart_TimeStudy_StudentID_BookName?StudentID=${state.selectedStudent.StudentsID}&FromDate=${state.StartWeekDate}&ToDate=${state.EndWeekDate}`)
          const descriptiveResponse = await axiosInstance.get("/WeeklyAnalysis/GetStudentDescriptiveModeList");

          setState({
            ...state,
            tableData: tableResponse.data.Result,
            chart1Data: chart1Response.data.Result,
            chart2Data: chart2Response.data.Result,
            chart3Data: chart3Response.data.Result,
            descriptiveList: descriptiveResponse.data.Result
          });
        }
      }
      catch (err) {
        console.log(err);
      }

    })()
  }, [state.selectedStudent, state.StartWeekDate, state.EndWeekDate]);

  function selectOption(item, key) {
    let extra = {};
    if (key == "selectedWeek") {
      extra = {
        StartWeekDate: item.StartWeekDate,
        EndWeekDate: item.EndWeekDate
      };
    }
    setState({
      ...state,
      ...extra,
      [key]: item
    });
  }

  const schema = object().shape({
    commentText : string().required().trim(),
    point : number().required().min(1).max(5),
    descriptiveMode : number().required()
  });

  async function sendData() {

    try{
      const data = {
        commentText: commentRef.current.value,
        point: pointRef.current.value,
        descriptiveMode : state.selectedDescptiveComment.ID
      }

      const validatedData = await schema.validate(data);
      moment.locale('fa', { useGregorianParser: true });
      const currentDate = moment().format("YYYY/MM/DD");
      const bodyData = {
        ID: 0,
        StudentID: state.selectedStudent.StudentsID,
        ConsultantID: state.selectedStudent.ConsultantsID,
        Txt: validatedData.commentText,
        Score: validatedData.point,
        StudentDescriptiveModeID: validatedData.descriptiveMode,
        WeeksID: state.activeWeek.ID,
        MonthsID: state.activeWeek.Month,
        CommentStatusID: "",
        ViewModeID: 8,
        Date: currentDate,
      };

      errorRef.current.innerText = "";
      axiosInstance.post("/WeeklyAnalysis/InsertWeeklyAnalysis", bodyData).then(response => {
        console.log(response.data.ErrorMessage);
        if(response.data.ErrorMessage ==='گزارشی برای این هفته موجود است امکان ثبت گزارش جدید موجود نیست'){
          notify('err','گزارشی برای ثبت وجود ندارد')
        }
        
        setState({
          ...state,
          tableData: [
            ...state.tableData,
            {
              ...response.data.Result,
              StudentDescriptiveMode: state.selectedDescptiveComment.Name
            }
          ]
        });
       
      }).catch(err => console.log(err));
    }
    catch( err ){
      errorRef.current.innerText = `لطفا اطلاعات را به درستی وارد کنید!`
    }

  }

  return (
    <div>
      <div className='text-black lg:pb-44 p-2 text-base'>

        <div className='mb-5 mt-7'>
          <h2 className='text-lg text-right mb-5 text-[#fb93ae] font-semibold'>آنالیز دانش آموزان</h2>
          <div className='dropDown-container'>
            <DropDown titleKeys={["StudentName", "LastNameStudent"]} optionList={state.studentList} selectOption={selectOption} keyName={"selectedStudent"} selected={state.selectedStudent} dropDownTitle="لیست دانش آموزان" />
          </div>
        </div>
      
        {
          state.selectedStudent ?
            <div className='mt-7'>
              <div className='flex lg:flex-row flex-col items-end weeks-container'>
                <div className='dropDown-container'>
                  <DropDown titleKeys={["WeekTitle"]} optionList={state.weekList} selectOption={selectOption} keyName={"selectedWeek"} selected={state.selectedWeek} dropDownTitle="انتخاب هفته" />
                </div>

                <div className='flex lg:mt-0 mt-5 flex-col sm:flex-row flex-start lg:w-auto w-full'>
                  <div className='mr-7 text-start'>
                    <div className='mb-2 text-pink'>تاریخ شروع</div>
                    <DatePickerCom setTime={selectOption} keyaName={"StartWeekDate"} defaultDate={state.StartWeekDate} />
                  </div>

                  <div className='mr-7 text-start'>
                    <div className='mb-2 mt-4 sm:mt-0 text-pink'>تاریخ پایان</div>
                    <DatePickerCom setTime={selectOption} keyName={"EndWeekDate"} defaultDate={state.EndWeekDate} />
                  </div>
                </div>

              </div>

              <div className='flex justify-center lg:flex-row flex-col mt-10'>
                {
                  state.chart1Data ? <div className='chart-container lg:ml-5 ml-0' style={{ marginRight: "0em" }}>
                    <ChartCom chartLabels={state.chart1Data.xAxis.categories} dataList={state.chart1Data.series} chartTitle={"میزان مطالعه، تست و مرور دانش آموز"} color={"rgba(255, 99, 132, 0.5)"} />
                  </div> : <></>
                }

                {
                  state.chart2Data ? <div className=' lg:mt-0 mt-10 chart-container'>
                    <ChartCom chartLabels={state.chart2Data.xAxis.categories} dataList={state.chart2Data.series} chartTitle={"میزان مطالعه ی روزانه دانش آموز"} color={"rgba(53, 162, 235, 0.5)"} />
                  </div> : <></>
                }

              </div>

              {
                state.chart3Data ? <div className='chart-container lg:mr-8 mr-0 mt-10' style={{ display: "flex", justifyContent: "center" }}>
                  <ChartCom chartLabels={state.chart3Data.xAxis.categories} dataList={state.chart3Data.series} chartTitle={" میزان مطالعه ی دانش آموز بر اساس درس"} color={"rgba(75, 188, 175, .5)"} />
                </div> : <></>
              }

              <TableCom tableData={state.tableData} headTitles={["نمره", "نظر کلی", "توضیحات", "هفته"]} />

              <div className="dashboard-comment-container">

                <div ref={errorRef} className='err'></div>

                <label className='mb-4'>ثبت نظر</label>

                <textarea ref={commentRef} className='input'>
                </textarea>

              </div>

              <div className='dropDown-container mt-5'>
                <DropDown titleKeys={["Name"]} optionList={state.descriptiveList} selectOption={selectOption} keyName={"selectedDescptiveComment"} selected={state.selectedDescptiveComment} dropDownTitle="نظر کلی" />
              </div>

              <div className='flex sm:flex-row flex-col justify-between mt-6'>

                <div className='flex items-center'>
                  <div>نمره :</div>
                  <input type="number" min={1} max={5} ref={pointRef} style={{ width: "50px" }} className='input mr-3 ml-3' />
                  <div>بین 1 تا 5</div>
                </div>

                <div className='flex mt-8 sm:mt-0 justify-end'>
                  <button onClick={sendData} className='submit-btn'>ثبت</button>
                </div>

              </div>

            </div>
            :
            <></>
        }

      </div>

      <ToastContainer />

    </div>
  );
}


export default Analiz;