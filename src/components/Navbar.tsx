
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User } from 'firebase/auth';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import logo from '../assets/images/logo.svg';
import i18n from '../i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const { t } = useTranslation();
    const { login, signup, logout, currentUser } = useAuth(); // Destructure the needed functions and state
    const navigate = useNavigate();

    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    navLinksRef.current = [];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const logoRef = useRef(null);
    const loginBtnRef = useRef(null);
    const registerBtnRef = useRef(null);
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState(''); // Add state for email
    const [password, setPassword] = useState(''); // Add state for password
    const navItems = [
        { id: 'about', name: t('navbar.about') },
        { id: 'partners', name: t('navbar.partners') },
        { id: 'help-army', name: t('navbar.helpArmy') },
        { id: 'auctions', name: t('navbar.auctions') },
        { id: 'help-refugees', name: t('navbar.helpRefugees') },
        { id: 'news', name: t('navbar.news') },
    ];

    const [showLanguageOptions, setShowLanguageOptions] = useState(true);



    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleNavLinkClick = async (id: string) => {
        if (id === 'login') {
            navigate('/login');
        } else if (id === 'register') {
            navigate('/register');
        } else {
            navigate('/');
            setActiveSection(id);
            setIsMenuOpen(false);
        }
    };
    useEffect(() => {
        navItems.forEach(item => {
            gsap.to({}, {
                scrollTrigger: {
                    trigger: `#${item.id}`,
                    start: "top center",
                    end: "bottom center",
                    onToggle: self => self.isActive && setActiveSection(item.id),
                },
            });
        });
        // const [showLanguageOptions, setShowLanguageOptions] = useState(false);

        // Clean up ScrollTriggers when component unmounts or navItems change
        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, [navItems]);


    useEffect(() => {
        // Set initial states for animation if needed
        gsap.set([logoRef.current, ...navLinksRef.current, loginBtnRef.current, registerBtnRef.current], { opacity: 0, x: -50 });


        // Animate to fully visible state
        gsap.to(logoRef.current, { duration: 1, opacity: 1, x: 0, ease: 'power1.out' });
        gsap.to([...navLinksRef.current, loginBtnRef.current, registerBtnRef.current], { duration: 0.5, opacity: 1, x: 0, stagger: 0.1, ease: 'power1.out' });


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const addToNavLinksRef = (el: HTMLAnchorElement | null) => {
        if (el && !navLinksRef.current.includes(el)) {
            navLinksRef.current.push(el);
        }
    };

    return (
        <header className="fixed top-0 z-50 bg-white p-4 w-full border-b">
            <div className="lg:px-10 mx-auto flex justify-between items-center">
                <div className="flex">
                    <a
                        href="#hero"
                        className="text-black text-2xl font-bold"
                        onClick={() => handleNavLinkClick('hero')}
                    >
                        <img src={logo} alt="WeboKraft" ref={logoRef} style={{ width: '40px', height: 'auto' }} />
                    </a>


                </div>
                {/* Desktop Menu */}

                <div className="hidden lg:flex items-center space-x-4">
                    {/* Language Switcher */}
                    <div className="flex pl-4">
                        <button onClick={() => changeLanguage('en')} title="English" className="p-2 hover:bg-gray-100">
                            <img src="/en.png" alt="English" className="w-5 h-auto" />
                        </button>
                        <button onClick={() => changeLanguage('pl')} title="Polish" className="p-2 hover:bg-gray-100">
                            <img src="pl.png" alt="Polish" className="w-5 h-auto" />
                        </button>
                        <button onClick={() => changeLanguage('ua')} title="Ukrainian" className="p-2 hover:bg-gray-100">
                            <img src="/ua.png" alt="Ukrainian" className="w-5 h-auto" />
                        </button>
                    </div>
                </div>
                <nav className="hidden lg:flex justify-center flex-1 space-x-6 ">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`text-gray-600 hover:text-gray-900 nav-link ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => handleNavLinkClick(item.id)}
                            ref={addToNavLinksRef}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
                {/* CTA button */}
                {/* Conditional CTA buttons */}
                {currentUser ? (
                    <button
                        className="hidden lg:block text-red-500 hover:text-white bg-white px-4 py-2 rounded-md mx-6 hover:bg-red-400 border-red-500 border-2"
                        onClick={async () => {
                            try {
                                await logout();
                            } catch (error) {
                                console.error('Error logging out: ', error);
                            }
                        }}
                    >
                        {t('navbar.logout')}
                    </button>
                ) : (
                    <>
                        <button
                            className="hidden lg:block text-white bg-purple border-purple border-2 px-4 py-2 rounded-md hover:bg-purple"
                            onClick={() => handleNavLinkClick('login')}
                            ref={loginBtnRef}
                        >
                            {t('navbar.login')}
                        </button>
                        <button
                            className="hidden lg:block text-purple border-purple border-2 px-4 py-2 rounded-md ml-2 hover:bg-purple hover:text-white"
                            onClick={() => handleNavLinkClick('register')}
                            ref={registerBtnRef}
                        >
                            {t('navbar.register')}
                        </button>
                    </>
                )}


                {currentUser ? (
                    <button
                        className="lg:hidden flex text-red-500 hover:text-white bg-white px-2 py-1 rounded-md mx-6 hover:bg-red-400 border-red-500 border-2"
                        onClick={async () => {
                            try {
                                await logout();
                            } catch (error) {
                                console.error('Error logging out: ', error);
                            }
                        }}
                    >
                        {t('navbar.logout')}
                    </button>
                ) : (
                    <div className='flex'>
                        <button
                            className="lg:hidden flex text-white bg-purple border-purple border-2 px-2 py-1 rounded-md hover:bg-purple"
                            onClick={() => handleNavLinkClick('login')}
                            ref={loginBtnRef}
                        >
                            {t('navbar.login')}
                        </button>
                        <button
                            className="lg:hidden flex text-purple border-purple border-2 px-2 py-1 rounded-md ml-2 hover:bg-purple hover:text-white"
                            onClick={() => handleNavLinkClick('register')}
                            ref={registerBtnRef}
                        >
                            {t('navbar.register')}
                        </button>
                    </div>
                )}

                {/* <div className="flex lg:hidden">
                    <button
                        className="text-white bg-black px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                        onClick={() => handleNavLinkClick('login')}
                    >
                        Login
                    </button>
                    <button
                        className="text-white bg-black px-4 py-2 rounded-md hover:bg-gray-500"
                        onClick={() => handleNavLinkClick('register')}
                    >
                        Register
                    </button>
                </div> */}

                {/* Hamburger Icon for mobile */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    {/* <button onClick={() => setShowLanguageOptions(!showLanguageOptions)}>
                        <span role="img" aria-label="Language" className="text-xl">🌐</span>
                    </button> */}

                </div>
            </div>

            {
                isMenuOpen && (
                    <div className="absolute top-full right-0 w-full bg-white shadow-lg lg:hidden">
                        <nav className="flex flex-col p-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => {
                                        handleNavLinkClick(item.id);
                                        setIsMenuOpen(false); // Close the mobile menu on selection
                                    }}
                                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                >
                                    {item.name}
                                </a>
                            ))}

                            {showLanguageOptions && (
                                <div className="flex flex-col mt-2">
                                    <button onClick={() => changeLanguage('en')} title="English" className="flex items-center p-2 text-left">
                                        <img src="/en.png" alt="Ukrainian" className="w-5 h-auto mr-2" /> English
                                    </button>
                                    <button onClick={() => changeLanguage('pl')} title="Polish" className="flex items-center p-2 text-left">
                                        <img src="/pl.png" alt="Ukrainian" className="w-5 h-auto mr-2" /> Polski
                                    </button>
                                    <button onClick={() => changeLanguage('ua')} title="Ukrainian" className="flex items-center p-2 text-left">
                                        <img src="/ua.png" alt="Ukrainian" className="w-5 h-auto mr-2" /> Українська
                                    </button>

                                </div>
                            )}
                        </nav>
                    </div>
                )
            }

        </header>
    );
}    