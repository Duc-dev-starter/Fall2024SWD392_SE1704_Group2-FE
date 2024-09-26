import { GoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCloseLargeLine } from "react-icons/ri";
import { BaseService } from '../../services';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


interface ModalProps {
    isOpen: boolean;
    isLoginForm: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, isLoginForm }) => {
    const [isLogin, setIsLogin] = useState(isLoginForm);
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogin(isLoginForm);
    }, [isLoginForm])

    const renderGoogleLogin = () => (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                localStorage.setItem("googleToken", credentialResponse.credential as string);
            }}
        />
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const payload = {
                email: email,
                password: password,
            };

            const response = await BaseService.post({
                url: '/api/auth/login',
                payload,
            });

            console.log("Login successful:", response.data);
            navigate('/')
            message.success("Login successful");
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

            <div className='relative z-20 justify-normal'>
                <div className='bg-slate-100 h-full text-center p-5 lg:w-[500px] rounded shadow-md'>
                    {isLogin ? (
                        <div>
                            <h2 className='text-xl font-semibold mb-4 mt-6 uppercase text-red-950'>{t('login_title')}</h2>
                            <form onSubmit={handleSubmit} className='px-4'>
                                <div className='mb-5'>
                                    <input type="email" name='email' id='email' placeholder='example@gmail.com'
                                        className='login-register-input' />
                                </div>
                                <div>
                                    <input type="password" name='password' id='password' placeholder='Enter your password'
                                        className='login-register-input' />
                                </div>
                                <div className='mt-5'>
                                    <button className='hover:shadow-md rounded-md bg-[#c83424] hover:bg-[#5d2019] py-3
                    px-8 text-base font-semibold text-white outline-none w-full transition-all duration-300'>{t('login_button')}</button>
                                </div>
                            </form>
                            {/* <p className='mt-4'>Don't have an account? <span onClick={() => setIsLogin(false)} className='text-sky-700 cursor-pointer'>Register here</span></p> */}
                        </div>
                    ) : (
                        <div>
                            <h2 className='text-xl font-semibold mb-4 mt-6 uppercase'>{t('register_title')}</h2>
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
                                    <button className='hover:shadow-md rounded-md bg-[#c83424] hover:bg-[#5d2019] py-3
                    px-8 text-base font-semibold text-white outline-none w-full'>{t('register_button')}</button>
                                </div>
                            </form>
                            {/* <p className='mt-4'>Already have an account? <span onClick={() => setIsLogin(true)} className='text-sky-700 cursor-pointer'>Login here</span></p> */}
                        </div>
                    )}

                    <span className='flex flex-col justify-between gap-6 mt-6'>
                        <div className="flex items-center justify-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">{t('or')}</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className='flex align-center justify-center rounded-full'>{renderGoogleLogin()}</div>
                        {/* 
                            login with github
                            login with facebook
                        */}
                        {isLogin ? <p className='mt-4'>{t('havent_account')} <span onClick={() => setIsLogin(false)} className='text-[#c83424] hover:text-[#6d2a22] cursor-pointer'>{t('register_title')}</span></p>
                            : <p className='mt-4'>{t('have_account')} <span onClick={() => setIsLogin(true)} className='text-[#c83424] hover:text-[#6d2a22] cursor-pointer'>{t('login_title')}</span></p>
                        }
                    </span>
                </div>

                <button onClick={onClose} className='absolute top-0 right-0 bg-transparent hover:bg-transparent text-3xl text-gray-800 hover:text-red-600 font-semibold p-3 transition-all duration-150'>
                    <RiCloseLargeLine />
                </button>
            </div>
        </div >
    );
};

export default Modal;
