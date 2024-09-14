import React from 'react';
import { useTranslation } from 'react-i18next';
import fishImage from '../../assets/fish.png';
import { SectionProps } from '@/interfaces';


const Section = ({ title, subtitle, description, imageFirst = false, bg = 'bg-white' }: SectionProps) => (
    <section className={`py-10 px-10 xl:px-0 ${bg}`}>
        <div className='max-w-6xl mx-auto'>
            <h1 className='text-4xl text-center text-brandPrimary mb-12'>{title}</h1>
            <div className={`flex flex-col ${imageFirst ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 mb-24 items-center`}>
                {/* Left side - text content */}
                <div className='lg:flex-1 flex flex-col gap-5 justify-center text-left'>
                    <h2 className='text-3xl font-semibold'>{subtitle}</h2>
                    <p className='text-lg text-gray-600'>{description}</p>
                </div>
                {/* Right side - image */}
                <div className='lg:flex-1 h-96 relative'>
                    <img src={fishImage} alt="Koi fish" className='object-cover h-full w-full rounded-lg' />
                </div>
            </div>
        </div>
    </section>
);

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <>
            {/* Banner Section */}
            <section className='text-neutralDGrey bg-neutralSilver'>
                <div className='max-w-6xl w-full h-[70vh] mx-auto text-center flex flex-col justify-center'>
                    <h1 className='md:text-6xl sm:text-5xl text-3xl font-bold'>{t('about_title')}</h1>
                    <p className='md:text-2xl texl-xl font-bold text-gray-500'>{t('about_us_description')}</p>
                    <button className='bg-[#d02a2a] w-[150px] text-white rounded-md font-medium mx-auto py-3'>
                        {t('see_more_button')}
                    </button>
                </div>
            </section>

            {/* Mission Section */}
            <Section
                title={t('our_mission')}
                subtitle={t('mission_subtitle')}
                description={t('mission_description')}
            />

            {/* Vision Section */}
            <Section
                title={t('our_vision')}
                subtitle={t('vision_subtitle')}
                description={t('vision_description')}
                imageFirst={true}
                bg="bg-neutralSilver"
            />

            {/* Why Choose Us Section */}
            <Section
                title={t('why_choose_us')}
                subtitle={t('why_choose_us_subtitle')}
                description={t('why_choose_us_description')}
                imageFirst={true}
            />
        </>
    );
}

export default AboutPage;
