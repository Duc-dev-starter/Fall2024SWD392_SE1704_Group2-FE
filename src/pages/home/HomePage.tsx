import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactTyped } from "react-typed";
import image from '../../assets/banner.png'

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <section className="text-neutralDGrey bg-neutralSilver" style={{
                backgroundImage: `url(${image})`, // Using inline styles for the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='max-w-6xl w-full h-[70vh] mx-auto text-center flex flex-col justify-center'>
                    <p className='text-yellow-300 font-bold p-2'>{t('hero_subtitle')}</p>
                    <h1 className='md:text-6xl text-w sm:text-5xl text-3xl font-bold text-yellow-500'>{t('hero_title')}</h1>
                    <div className='flex lg:flex-row flex-col justify-center items-center '>
                        <span className='md:text-4xl text-yellow-100 sm:text-3xl text-base font-bold'>{t('hero_introduction')}</span>
                        <ReactTyped
                            className='md:text-4xl sm:text-3xl text-yellow-100 text-base font-bold md:pl-4 pl-2'
                            strings={t('hero_types', { returnObjects: true }) as string[]}
                            typeSpeed={120}
                            backSpeed={140}
                            loop
                        />
                    </div>
                    <p className='md:text-2xl texl-xl font-bold text-yellow-200 pt-5'>{t('hero_description')}</p>
                    <button className='bg-[#d02a2a] w-[200px] text-white rounded-md font-medium mx-auto py-3'>{t('get_started_button')}</button>
                </div>
            </section >
            <section>
                test
            </section>
        </>
    )
}

export default HomePage