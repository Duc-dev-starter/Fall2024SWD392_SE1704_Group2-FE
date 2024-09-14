import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/consts';
import { FaBars, FaXmark } from 'react-icons/fa6';
import LanguageSwitcher from '../language/LanguageSwitcher';
import { useTranslation } from 'react-i18next';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const { t } = useTranslation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    }, [])

    const navItems = [
        { link: t('home'), path: PATHS.HOME },
        { link: t('about'), path: PATHS.ABOUT },
        { link: t('contest'), path: "contest" },
        { link: t('contact_us'), path: "contact" },
    ];

    return (
        <header className='w-full bg-white md:bg-transparent sticky top-0 left-0 right-0'>
            <nav className={`py-4 lg:px-14 px-4 sm:flex-wrap ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" : ""}`}>
                <div className='flex flex-col md:flex-row justify-between items-center text-base gap-8'>
                    <div className='relative flex justify-between items-center text-base gap-8 w-full'>
                        <Link to={PATHS.HOME} className='lg:text-2xl text-base font-semibold flex items-center space-x-3'>
                            <img src="" alt="logo" className='md:w-10 w-5 inline-block items-center' /><span className='text-[#263238]'>KoiChamp</span>
                        </Link>
                        <ul className='md:flex space-x-12 hidden mt-4'>
                            {
                                navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-gray900 hover:text-brandPrimary first:font-medium'>{link}</Link>)
                            }
                        </ul>

                        <LanguageSwitcher />

                        <div className='lg:space-x-12 flex gap-2 items-center'>
                            <Link to={PATHS.LOGIN} className='lg:flex items-center text-brandPrimary hover:text-gray900'>
                                {t('login_button')} {/* Translation for "Login" */}
                            </Link>
                            <button type='button' className='bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGrey'>
                                {t('register_button')} {/* Translation for "Register" */}
                            </button>
                        </div>
                    </div>
                    <div className='absolute w-full top-16 text-end md:hidden bg-red-800 p-2'>
                        <button onClick={toggleMenu} className='text-yellow-50 focus:outline-none focus:text-gray-500'>
                            {
                                isMenuOpen ? (<FaXmark className='h-6 w-6' />) : (<FaBars className='h-6 w-6' />)
                            }
                        </button>
                    </div>
                </div>
                <div className={`space-y-4 px-4 mt-28 py-7 bg-brandPrimary ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-white hover:opacity-80 first:font-medium'>{link}</Link>)
                    }
                </div>
            </nav>

        </header>
    );
};

export default Header;
