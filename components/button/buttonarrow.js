import React from 'react';
import { useState } from 'react';

const ButtonArrow = (props) => {
    const [showin , setShowin] = useState(true)
    const {text} = props
    const showHandler = () => {
        setShowin(!showin)
    }

    return (
        <button className='bg-navbarBt cursor-pointer text-center w-32 h-12
         p-4 text-white flex items-center justify-between rounded-md hover:bg-[#fb93ae] hover:text-white transition-all duration-300 '
         onMouseEnter={showHandler}
         onMouseLeave={showHandler}>
            <span className='ml-4 text-lg font-normal'>{text}</span>
            {showin &&
            <svg className=''  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
             </svg> }

        </button>
    );
};

export default ButtonArrow;