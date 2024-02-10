import React from 'react'


const Button = (props) => {
    const {text } = props
    return (
        <div className='flex justify-center w-full text-center border-navbarBt border 
 bg-navbarBt text-white py-2 text-sm sm:text-base font-bold px-10 rounded-lg hover:bg-white hover:text-navbarBt transition-all duration-300 cursor-pointer'>
            {text}
        </div>
    );
};

export default Button;