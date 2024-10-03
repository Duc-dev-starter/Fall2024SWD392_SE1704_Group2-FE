import React, { useState } from 'react'
import { PATHS } from '../../consts'
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LoadingOverlay } from '../../components';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className='py-20 px-0 bg-[#e9ebee]'>
                <div>
                    <div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="pt-2 border-none rounded-lg shadow-sm mx-auto md:w-[500px] w-[300px] bg-white text-[#1c1e21]">
                                <div className='mt-2 border-[rgba(0,0,0,0.1)] mx-0 p-0 border-b pb-0'>
                                    <div>
                                        <h2 className='text-[20px] mt-[-15px] pt-4 pb-2 pr-4 pl-6'>Find Your Account</h2>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className='md:text-lg text-sm my-4 md:ml-6 ml-3'>Vui lòng nhập email để tìm kiếm tài khoản</p>
                                    </div>
                                    <div>
                                        <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' className='rounded-md text-base h-auto md:p-2 p-[2px] pl-4 md:ml-5 ml-2 mb-4 md:w-[444px] w-[180px] border border-[#ccd0d5]' />
                                    </div>
                                </div>
                                <div className='border-t border-[rgba(0,0,0,0.1)] rounded-b-lg p-4'>
                                    <div className='md:ml-72'>
                                        <Link to={PATHS.FORGOT_PASSWORD} className='py-2 md:px-5 px-2 bg-[#e4e6eb] border-none rounded-md text-[15px] ml-2 mb-3 text-[#4b4f56] cursor-pointer inline-block text-center'>
                                            Hủy
                                        </Link>
                                        <button type='submit' className='py-2 md:px-5 px-2 bg-brandPrimary border-none rounded-md text-[15px] ml-2 text-white font-bold cursor-pointer inline-block text-center'>Submit</button>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword