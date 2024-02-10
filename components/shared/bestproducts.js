import React, { useEffect, useState } from 'react';
import axios from 'axios';
// components
import Card from '../cards/cardForProduct';
import Card2 from '../cards/cardForInfo';
import Title from './title';

//components
import ButtonArrow from '../button/buttonarrow';

const BestProducts = () => {
  const [photo1 , setPhoto1] = useState('')
  // const [photo2 , setPhoto2] = useState('')
  const [title1 , setTitle1] = useState('')
  const [title2 , setTitle2] = useState('')
  const [category1 , setcategory1] = useState('')
  const [category2 , setcategory2] = useState('')
    useEffect(() => {
      axios.get('https://api.ghahramaneman.com/api/Product/GetBestProduct')
      .then( Response => {
        setPhoto1(Response.data.Result[0].PhotoAddress)
        // setPhoto2(Response.data.Result[1].PhotoAddress)
        setTitle1(Response.data.Result[0].ProductDescription)
        setTitle2(Response.data.Result[1].ProductDescription)
        setcategory1(Response.data.Result[0].ProductTitle)
        setcategory2(Response.data.Result[1].ProductTitle)
      })
    },[])
    return (
        <div className='topProducts px-5 md:px-20'>
        <div  className='mt-24 xl:mt-36 mb-16 text-center' >
        <Title title={'برترین محصولات'}/>
        </div> 
        {/* card sections */}
        <div className='grid grid-cols-1  items-start gap-y-8  lg:grid-cols-2  xl:grid-cols-3  '>
             <div className=''>
             <Card 
                image='../images/Rectangle1.png'  
                title={title1} 
                date={category1} />
             </div>
             <div>
              <Card 
                image='../images/Rectangle2.png' 
                title={title2} 
                date={category2} />
             </div>
             <div className='hidden xl:block  '>
              <Card
                image='../images/Rectangle2.png'  
                title={title1} 
                date={category1} />
              </div>
        </div>

            <div className='moreInfo flex justify-center text-center mt-16'>
                    <ButtonArrow text={'بیشتر'} />
            </div>
        </div>
    );
};

export default BestProducts;