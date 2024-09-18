import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const renderGoogleLogin = () => (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                localStorage.setItem("token", credentialResponse.credential as string);
            }}
        />
    );

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

            <div className='relative z-10'>
                <div className='bg-blue-400 text-center p-5 h-[600px] lg:w-[500px] rounded shadow-md'>
                    {isLogin ? (
                        <>
                            <h2 className='text-xl font-semibold mb-4 mt-6 uppercase'>Please login here</h2>
                            <form action="" className='px-4'>
                                <div className='mb-5'>
                                    <input type="email" name='email' id='email' placeholder='example@gmail.com'
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium
                    text-[#6b7280] outline-none focus:border-[#206291] focus:shadow-md' />
                                </div>
                                <div>
                                    <input type="password" name='password' id='password' placeholder='Enter your password'
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium
                    text-[#6b7280] outline-none focus:border-[#206291] focus:shadow-md' />
                                </div>
                                <div className='mt-5'>
                                    <button className='hover:shadow-md rounded-md bg-[#206291] hover:bg-orange-600 py-3
                    px-8 text-base font-semibold text-white outline-none'>Login</button>
                                </div>
                            </form>
                            <p className='mt-4'>Don't have an account? <span onClick={() => setIsLogin(false)} className='text-orange-500 cursor-pointer'>Register here</span></p>
                        </>
                    ) : (
                        <>
                            <h2 className='text-xl font-semibold mb-4 mt-6 uppercase'>Please register here</h2>
                            <form action="" className='px-4'>
                                <div className='mb-5'>
                                    <input type="text" name='name' id='name' placeholder='Your name'
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium
                    text-[#6b7280] outline-none focus:border-[#206291] focus:shadow-md' />
                                </div>
                                <div className='mb-5'>
                                    <input type="email" name='email' id='email' placeholder='example@gmail.com'
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium
                    text-[#6b7280] outline-none focus:border-[#206291] focus:shadow-md' />
                                </div>
                                <div>
                                    <input type="password" name='password' id='password' placeholder='Enter your password'
                                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium
                    text-[#6b7280] outline-none focus:border-[#206291] focus:shadow-md' />
                                </div>
                                <div className='mt-5'>
                                    <button className='hover:shadow-md rounded-md bg-[#206291] hover:bg-orange-600 py-3
                    px-8 text-base font-semibold text-white outline-none'>Register</button>
                                </div>
                            </form>
                            <p className='mt-4'>Already have an account? <span onClick={() => setIsLogin(true)} className='text-orange-500 cursor-pointer'>Login here</span></p>
                        </>
                    )}

                    <button onClick={onClose} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center mt-8'>
                        Close
                    </button>

                    <div>{renderGoogleLogin()}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
