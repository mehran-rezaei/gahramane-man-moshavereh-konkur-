import React from 'react';

//componets
import ButtonLink from '../button/buttonlink';
const Card2 = (props) => {
    const {title , info , images,color} = props
    return (
        <div className='card  shadow-lg  py-8 px-8 rounded-lg text-center flex flex-col items-center '>
                 <div>
                    <div className='flex justify-center' >
                        <span className='colors rounded-full' style={{backgroundColor : [color]}}>
                        <img src={images} alt="" className=' text-black  overflow-hidden p-5  '  />
                     </span>
                    </div>

                     <h3 className='text-lg my-8 font-medium'>{title}</h3>
                     <p className='text-sm text-navbar leading-[28px] font-light '> {info} </p>
                     <ButtonLink text={'مطالعه بیشتر'} />
                </div>
        </div>
    );
};

export default Card2;