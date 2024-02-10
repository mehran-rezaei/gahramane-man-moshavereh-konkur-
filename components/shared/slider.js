import React, { useEffect , useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import axios from 'axios';
import NumberToPersianWord from "number_to_persian_word";
import 'swiper/css';
import "swiper/css/pagination";
// images
// componets
import Title from './title';

const Slider = ({props}) => {
    // const [photo1 , setPhoto1] = useState('')
    const [photo2 , setPhoto2] = useState('')
    const [title1 , setTitle1] = useState('')
    const [title2 , setTitle2] = useState('')
    let [date1 , setDate1] = useState('')
    let [date2 , setDate2] = useState('')
    let [article1 , setArticle1] = useState('')
    let [article2 , setArticle2] = useState('')
    article1 =(NumberToPersianWord.convertEnToPe((article1)))
    article2 =(NumberToPersianWord.convertEnToPe((article2)))
    date1 =(NumberToPersianWord.convertEnToPe((date1)))
    date2 =(NumberToPersianWord.convertEnToPe((date2)))
    useEffect(() => {
        axios.get('https://api.ghahramaneman.com/api/Article/GetBestArticlePhoto?page=0&Count=3')
        .then(Response => {
        //   console.log(Response.data.Result);
        //   setPhoto1(Response.data.Result[0].PhotoAddress)
          setPhoto2(Response.data.Result[1].PhotoAddress)
          setTitle1(Response.data.Result[0].Title)
          setTitle2(Response.data.Result[1].Title)
          setDate1(Response.data.Result[0].ArticleDate)
          setDate2(Response.data.Result[1].ArticleDate)
          setArticle1(Response.data.Result[0].Description)
          setArticle2(Response.data.Result[1].Description)
        })
    },[])
    return (
        <div className='px-5 md:px-20 bg-[#fafafa] py-16'>
            <h1><Title title={'پر بازدیدترین مقالات'}/></h1>
            <Swiper
             pagination={{clickable: true ,dynamicBullets: true, }}
              modules={[Pagination]}
               className="mySwiper"
             spaceBetween={50}
             slidesPerView={1}
             breakpoints={{
                1280:{
                    // width : 1280,
                    slidesPerView: 2,
                },
             }}
              >
             <SwiperSlide className=' rounded-lg shadow-md' >
                <div>
                <img src={photo2} alt=""  />
                <h2 className='text-lg px-6' >
                            {title1}
                        </h2>
                </div>
                        <div className='sliderItem px-6 '>
                        <p >
                             {article1}
                        </p>
                        <div className='sliderBt '>
                            <span className='sliderDate '>{date1}</span>
                            <span className='sliderMore '>مطالعه بیشتر</span>
                        </div>
                        </div>
                </SwiperSlide>
                <SwiperSlide className=' rounded-lg shadow-md' >
                    <div>
                    <img src={photo2} alt=""  />
                    <h2 className='text-lg px-6'>
                            {title2}
                        </h2>
                    </div>
                        <div className='sliderItem px-6'>
                        <p>
                           {article2}
                        </p>
                        <div className='sliderBt'>
                            <span className='sliderDate '>{date2}</span>
                            <span className='sliderMore'>مطالعه بیشتر</span>
                        </div>
                        </div>
                </SwiperSlide>
                <SwiperSlide className='rounded-lg shadow-md' >
                    <div>
                    <img src={photo2} alt=""  />
                    <h2 className='text-lg px-6'>
                            {title2}
                        </h2>
                    </div>
                        <div className='sliderItem px-6'>
                        <p>
                           {article2}
                        </p>
                        <div className='sliderBt'>
                            <span className='sliderDate '>{date2}</span>
                            <span className='sliderMore'>مطالعه بیشتر</span>
                        </div>
                        </div>

                </SwiperSlide>

           </Swiper>
        </div>
    );
};

export default Slider;

