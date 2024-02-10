import React from 'react';

const Li = (props) => {
    const {text} = props
    return (
            <span className='pr-14 py-0 cursor-pointer'>
            <li className='inline-block pb-0 font-medium border-b border-white  text-base   transition-all duration-200
            hover:border-b  hover:border-navbarBt '>
                {text}
            </li>
            </span>
    );
};

export default Li;