import React from 'react';

const Title = (props) => {
    const {title } = props
    return (
        <div className='text-[28px] text-navbarBt text-center mb-8 md:mb-14'>
             <span className='border-b-2 border-navbarBt border-dashed pb-2'>{title} </span>
        </div>
    );
};

export default Title;