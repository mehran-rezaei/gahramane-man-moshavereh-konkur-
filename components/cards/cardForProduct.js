import React from 'react';

const Card = (props) => {
    const {image , title , date} = props
    return (
        <div>
            <div className='card min-h-[422px] mi text-center shadow-md rounded-md overflow-hidden lg:ml-11 lg:hover:mt-[-20px] transition-all ease-in duration-200 cursor-pointer'>
                        <img src={image} alt="" className='mb-[24px] h-60 object-cover    lg:h-60 w-full' />
                        <div className='px-9 pb-4 '>
                            <div className='flex justify-center items-center'>
                            <span className='icon ml-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2" viewBox="0 0 16 16">
                              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                            </svg>
                        </span> 
                        <h3 className='text-sm font-light text-[#565656]'>
                          {date}                    
                        </h3>
                            </div>
                      
                        <p className='mt-4 leading-7 text-sm text-mostvw'>
                            {title}
                        </p>  
                        </div>
            </div>
        </div>
    );
};

export default Card;