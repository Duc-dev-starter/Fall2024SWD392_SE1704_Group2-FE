import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { RiCloseLargeLine } from "react-icons/ri";


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

            <div className='relative z-20'>
                <div className='bg-slate-100 h-full text-center p-5 lg:w-[500px] rounded shadow-md'>
                    {isLogin ? (
                        <>
                            <h2 className='text-xl font-semibold mb-4 mt-6 uppercase text-red-950'>Please login here</h2>
                            <form action="" className='px-4'>
                                <div className='mb-5'>
                                    <input type="email" name='email' id='email' placeholder='example@gmail.com'
                                        className='login-register-input' />
                                </div>
                                <div>
                                    <input type="password" name='password' id='password' placeholder='Enter your password'
                                        className='login-register-input' />
                                </div>
                                <div className='mt-5'>
                                    <button className='hover:shadow-md rounded-md bg-[#206291] hover:bg-blue-950 py-3
                    px-8 text-base font-semibold text-white outline-none w-full transition-all duration-300'>Login</button>
                                </div>
                            </form>
                            <p className='mt-4'>Don't have an account? <span onClick={() => setIsLogin(false)} className='text-sky-700 cursor-pointer'>Register here</span></p>
                        </>
                    ) : (
                        <>
                            <h2 className='text-xl font-semibold mb-4 mt-6 uppercase'>Please register here</h2>
                            <form action="" className='px-4'>
                                <div className='mb-5'>
                                    <input type="text" name='name' id='name' placeholder='Your name'
                                        className='login-register-input' />
                                </div>
                                <div className='mb-5'>
                                    <input type="email" name='email' id='email' placeholder='example@gmail.com'
                                        className='login-register-input' />
                                </div>
                                <div>
                                    <input type="password" name='password' id='password' placeholder='Enter your password'
                                        className='login-register-input' />
                                </div>
                                <div className='mt-5'>
                                    <button className='hover:shadow-md rounded-md bg-[#206291] hover:bg-sky-900 py-3
                    px-8 text-base font-semibold text-white outline-none w-full'>Register</button>
                                </div>
                            </form>
                            <p className='mt-4'>Already have an account? <span onClick={() => setIsLogin(true)} className='text-sky-700 cursor-pointer'>Login here</span></p>
                        </>
                    )}

                    <div>{renderGoogleLogin()}</div>
                </div>

                <button onClick={onClose} className='absolute top-0 right-0 bg-transparent hover:bg-transparent text-3xl text-gray-800 hover:text-red-600 font-semibold p-3 transition-all duration-150'>
                    <RiCloseLargeLine />
                </button>
            </div>
        </div >
    );
};

export default Modal;
