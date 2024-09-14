import React from 'react';
import { BiLocationPlus, BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PATHS } from '@/consts';

const Footer = () => {
    return (
        <>
            <footer className='bg-neutralSilver'>
                <div className='max-w-[1240px] mx-auto pt-16 px-8 xl:px-4 grid lg:grid-cols-2 gap-8 text-black'>
                    <div>
                        <div className='mb-2'>
                            <Link to={PATHS.HOME} className='w-full text-3xl font-bold text-brandPrimary'>KoiChamp</Link>
                        </div>
                        <p><BiLocationPlus className='inline-flex mt-1' /> Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Long Thạnh Mỹ, Hồ Chí Minh, 700000, Việt Nam</p>
                        <p><BiPhoneCall className='inline-flex' /> 0898320059</p>
                        <p><BiMailSend className='inline-flex' /> koichamp@gmail.com</p>
                    </div>
                    <div>
                        <h2 className='flex lg:justify-end justify-start text-lg'>Social</h2>
                        <div className='flex lg:justify-end justify-start gap-6 md:[75%] my-6'>
                            <Link to="https://www.facebook.com/">
                                <FaFacebookSquare
                                    size={30}
                                    className="text-blue-500 icon-transition"
                                />
                            </Link>
                            <Link to="https://www.instagram.com/">
                                <FaInstagram
                                    size={30}
                                    className="text-purple-600 icon-transition"
                                />
                            </Link>
                            <Link to="https://www.twitter.com">
                                <FaTwitter
                                    size={30}
                                    className="text-blue-400 icon-transition"
                                />
                            </Link>
                            <Link to="https://www.youtube.com">
                                <FaYoutube
                                    size={30}
                                    className="text-red-600 icon-transition"
                                />
                            </Link>

                        </div>
                    </div>
                    <div className='lg:col-span-3 grid-cols-2  lg:flex grid justify-between'>
                        <div>
                            <h6 className='font-bold text-black'>Solutions</h6>
                            <ul>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Analytics</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Marketing</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Commerce</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Insights</li>
                            </ul>
                        </div>

                        <div>
                            <h6 className='font-bold text-black'>Support</h6>
                            <ul>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Pricing</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Documentation</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Guide</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Api Status</li>
                            </ul>
                        </div>

                        <div>
                            <h6 className='font-bold text-black'>Company</h6>
                            <ul>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>About</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Blog</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Jobs</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Press</li>
                            </ul>
                        </div>

                        <div>
                            <h6 className='font-bold text-black'>Legal</h6>
                            <ul>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Claim</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Policy</li>
                                <li className='py-2 text-sm hover:underline hover:decoration-brandPrimary cursor-pointer'>Terms</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border-t border-gray-400 mt-8'>
                    <p className='regular-14 w-full text-center text-gray900 font-bold py-4'>
                        &copy;Copyright 2024 KoiChamp | All right reserved
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer