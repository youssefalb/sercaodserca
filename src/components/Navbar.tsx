import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from '../assets/images/logo.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    navLinksRef.current = [];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const logoRef = useRef(null);

    const navItems = [
        { id: 'home', name: 'Головна' },
        { id: 'about-fund', name: 'Про фонд' },
        { id: 'partners', name: 'Партнери' },
        { id: 'help-army', name: 'Допомога армії' },
        { id: 'auctions', name: 'Аукціони' },
        { id: 'news', name: 'Новини' },
        { id: 'reports', name: 'Звіти' },
    ];

    // This function should scroll to the right section
    const handleNavLinkClick = (id: any) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        // Set initial states for animation if needed
        gsap.set(logoRef.current, { opacity: 0, x: -50 });
        gsap.set(navLinksRef.current, { opacity: 0, x: -50 });

        // Animate to fully visible state
        gsap.to(logoRef.current, { duration: 1, opacity: 1, x: 0, ease: 'power1.out' });
        gsap.to(navLinksRef.current, { duration: 0.5, opacity: 1, x: 0, stagger: 0.1, ease: 'power1.out' });


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
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <a
                        href="#hero"
                        className="text-black text-2xl font-bold"
                        onClick={() => handleNavLinkClick('hero')}
                    >
                        <img src={logo} alt="WeboKraft" ref={logoRef} style={{ width: '80px', height: 'auto' }} />
                    </a>


                </div>
                {/* Desktop Menu */}
                <nav className="hidden lg:flex justify-center flex-1 space-x-8">
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

                {/* Hamburger Icon for mobile */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-full right-0 w-full bg-white shadow-lg lg:hidden">
                    <nav className="flex flex-col p-4">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => handleNavLinkClick(item.id)}
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
