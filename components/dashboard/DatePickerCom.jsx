import React, { useEffect } from "react";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import InputIcon from "react-multi-date-picker/components/input_icon"


function DatePickerCom(props){

    const { defaultDate, setTime, keyName } = props;

    const callSetTime = (timeObj) => {
      const { month : {number}, year, day } = timeObj;

      const date = year+"/"+checkNumber(number)+"/"+checkNumber(day);
      console.log(date);
      setTime( date, keyName);
    }

    const checkNumber = (number) => {
      return number < 10 ? "0"+number : number ;
    } 

    return (
        <DatePicker 
          onChange={callSetTime}
          value={defaultDate}
          render={<InputIcon/>}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-left"
      />
    )
}

export default DatePickerCom;