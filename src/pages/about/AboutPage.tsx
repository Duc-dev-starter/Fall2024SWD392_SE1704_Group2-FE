import React from 'react'
import { useTranslation } from 'react-i18next'
import fishImage from '../../assets/fish.png';

const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <>
            {/* Banner Section */}
            <section className='text-neutralDGrey bg-neutralSilver'>
                <div className='max-w-6xl w-full h-[70vh] mx-auto text-center flex flex-col justify-center'>
                    <h1 className='md:text-6xl sm:text-5xl text-3xl font-bold'>{t('about_title')}</h1>
                    <p className='md:text-2xl texl-xl font-bold text-gray-500'>{t('about_us_description')}</p>
                    <button className='bg-[#d02a2a] w-[150px] text-white rounded-md font-medium mx-auto py-3'>{t('see_more_button')}</button>
                </div>
            </section>

            <section>
                {/* Section 1 */}
                <section className='py-16'>
                    <div className='max-w-6xl mx-auto'>
                        <h1 className='text-4xl text-center text-brandPrimary mb-12'>{t('our_mission')}</h1>
                        <div className='flex flex-col lg:flex-row gap-12 mb-24 items-center'>
                            {/* Left side - text content */}
                            <div className='lg:flex-1 flex flex-col gap-5 justify-center text-left'>
                                <h2 className='text-3xl font-semibold'>{t('mission_subtitle')}</h2>
                                <p className='text-lg text-gray-600'>{t('mission_description')}</p>
                            </div>

                            {/* Right side - image */}
                            <div className='lg:flex-1 h-96 relative'>
                                <img src={fishImage} alt="Koi fish" className='object-cover h-full w-full rounded-lg' />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2 (Alternate layout) */}
                <section className='py-16 bg-neutralSilver'>
                    <div className='max-w-6xl mx-auto'>
                        <h1 className='text-4xl text-center text-brandPrimary mb-12'>{t('our_vision')}</h1>
                        <div className='flex flex-col-reverse lg:flex-row gap-12 mb-24 items-center'>
                            {/* Left side - image */}
                            <div className='lg:flex-1 h-96 relative'>
                                <img src={fishImage} alt="Koi fish" className='object-cover h-full w-full rounded-lg' />
                            </div>

                            {/* Right side - text content */}
                            <div className='lg:flex-1 flex flex-col gap-5 justify-center text-left'>
                                <h2 className='text-3xl font-semibold'>{t('vision_subtitle')}</h2>
                                <p className='text-lg text-gray-600'>{t('vision_description')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 1 */}
                <section className='py-16'>
                    <div className='max-w-6xl mx-auto'>
                        <h1 className='text-4xl text-center text-brandPrimary mb-12'>{t('our_mission')}</h1>
                        <div className='flex flex-col lg:flex-row gap-12 mb-24 items-center'>
                            {/* Left side - text content */}
                            <div className='lg:flex-1 flex flex-col gap-5 justify-center text-left'>
                                <h2 className='text-3xl font-semibold'>{t('mission_subtitle')}</h2>
                                <p className='text-lg text-gray-600'>{t('mission_description')}</p>
                            </div>

                            {/* Right side - image */}
                            <div className='lg:flex-1 h-96 relative'>
                                <img src={fishImage} alt="Koi fish" className='object-cover h-full w-full rounded-lg' />
                            </div>
                        </div>
                    </div>
                </section>
            </section>

        </>
    )
}

export default AboutPage;
