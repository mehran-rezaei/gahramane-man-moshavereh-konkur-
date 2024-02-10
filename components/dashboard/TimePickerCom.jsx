import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function TimePickerCom(props) {
    
    const { timeValue, setTime, keyName }  = props; 
    const [hours , setHours] = useState('')
    const [min , setMin] = useState('')
    let value = ''
    if(timeValue){
        if(timeValue.length >= 1){
            value = timeValue.split(':')
            console.log('yes')
        }
    }
    console.log(value); 
    console.log(min)
    console.log(hours)
useEffect(() => {
    setMin(value[1])
    setHours(value[0])
}, [hours, min ,timeValue])
    return (
        <div>
            <LocalizationProvider 
            dateAdapter={AdapterDayjs}
            >  
                <Stack spacing={3}>
                <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={['hours', 'minutes']}
                //  inputFormat={'hh:mm'}
                    // inputFormat={'hh:mm'}
                    inputFormat={ hours ? `${hours}:${min}` : 'hh:mm'}

                    // defaultValue={'11:22'}
                    mask="__:__"
                    // defaultTime={'11:22'} 
                    // label="With seconds"
                    value={timeValue}
                    onChange={(time) => setTime(time, keyName) }
                    renderInput={(params) => <TextField sx={{border:"5px soild red"}} {...params} />}
                />
                </Stack>
            </LocalizationProvider>
        </div>
  );
}

export default TimePickerCom;