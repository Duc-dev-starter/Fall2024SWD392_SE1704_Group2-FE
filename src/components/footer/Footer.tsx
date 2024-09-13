import React from 'react';
import { BiLocationPlus, BiMailSend, BiPhoneCall } from 'react-icons/bi';
import { FaDribbbleSquare, FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black'>
            <div>
                <h1 className='w-full text-3xl font-bold text-brandPrimary'>KoiChamp</h1>
                <p><BiLocationPlus className='inline-flex' /> Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Long Thạnh Mỹ, Hồ Chí Minh, 700000, Việt Nam</p>
                <p><BiPhoneCall className='inline-flex' /> 0898320059</p>
                <p><BiMailSend className='inline-flex' /> koichamp@gmail.com</p>
                <div className='flex justify-between md:[75%] my-6'>
                    <FaFacebookSquare size={30} />
                    <FaInstagram size={30} />
                    <FaTwitter size={30} />
                    <FaGithubSquare size={30} />
                    <FaDribbbleSquare size={30} />
                </div>
            </div>
            <div className='lg:col-span-3 flex justify-between'>
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
        </div >
    )
}

export default Footer