import React from 'react';
import { Link } from 'next/link';

const LiFirst = (props) => {
    const {text} = props
    return (
            <span className='pr-14 py-0 '>
            <li className='inline-block pb-0 font-medium text-navbarBt text-base hover:text-navbarBt transition-all duration-200
            hover:border-b  border-navbarBt'>
                {text}
            </li>
            </span>
    );
};

export default LiFirst;