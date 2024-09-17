import React from 'react';
import { BiLocationPlus, BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import image from '../../assets/banner.png';
import Map from '../../components/map';

function ContactPage() {
    const { t } = useTranslation();

    return (
        <div>
            <section className="text-neutralDGrey bg-neutralSilver" style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='max-w-6xl w-full h-[70vh] mx-auto text-center flex flex-col justify-center'>
                    <h1 className='md:text-6xl text-w sm:text-5xl text-3xl font-bold text-yellow-500'>{t('contact_us')}</h1>
                    <div className='flex lg:flex-row flex-col justify-center items-center '>
                        <span className='md:text-4xl text-yellow-100 sm:text-3xl text-base font-bold'>{t('contact_intro')}</span>
                    </div>
                </div>
            </section >

            <div className="flex flex-col items-center h-[70vh] w-full gap-40">
                {/* Map and Contact Information Section */}
                <div className="flex flex-col md:flex-row w-4/5 mt-12 gap-6">
                    {/* Map Component */}
                    <div className="flex-1">
                        {/* Replace with Map component */}
                        <Map />
                    </div>

                    {/* Contact Information */}
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold mt-6 mb-6">
                            Contact Information
                        </h2>
                        <div className="space-y-3">
                            <div className="flex">
                                <h3 className="font-medium w-1/3 text-gray-800 flex items-center gap-2 align-middle">
                                    <BiLocationPlus className='inline-flex mt-1' />
                                    Main Address:
                                </h3>
                                <p className="text-gray-600">
                                    Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Long Thạnh Mỹ, Hồ Chí Minh, 700000, Việt Nam
                                </p>
                            </div>

                            <div className="flex">
                                <h3 className="font-medium w-1/3 text-gray-800 flex items-center gap-2 align-middle">
                                    <BiMailSend className='inline-flex' />
                                    Email Address:
                                </h3>
                                <p className="text-gray-600">koichamp@gmail.com</p>
                            </div>

                            <div className="flex">
                                <h3 className="font-medium w-1/3 text-gray-800 flex items-center gap-2 align-middle">
                                    <BiPhoneCall className='inline-flex' />                                Phone Number:
                                </h3>
                                <p className="text-gray-600">08 98 32 00 59</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage
