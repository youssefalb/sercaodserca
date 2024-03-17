import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactComponent as EmailIcon } from '../assets/icons/email-white.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone-white.svg';
const Footer = () => {
    const leftColumnRef = useRef(null);
    const middleColumnRef = useRef(null);
    const bottomRowRef = useRef(null); // Ref for the bottom row on desktop

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const elements = [
            { ref: leftColumnRef.current, x: '-100%', opacity: 0 },
            { ref: middleColumnRef.current, x: '100%', opacity: 0 },
            { ref: bottomRowRef.current, y: '50%', opacity: 0 }
        ];

        elements.forEach(({ ref, x = 0, y = 0, opacity }) => {
            if (ref) {
                gsap.fromTo(ref, { x, y, autoAlpha: opacity }, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref,
                        start: "top bottom+=50",
                        toggleActions: "play none none none",
                    }
                });
            }
        });
    }, []);

    return (
        <footer className="mt-auto bg-blue text-white p-10 rounded-t-xl">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-9 ">
                <div ref={leftColumnRef} className="flex flex-col mb-8 lg:mb-0">
                    <h3 className="font-bold text-lg mb-2">Charity Fund</h3>
                    <p className="mb-4 text-gray-300">Serca od Serca</p>
                    <a href="mailto:fundacjaopomocy2022@gmail.com" className="mb-4 text-gray-300 flex items-center">
                        <EmailIcon className="w-6 h-6 mr-2" />
                        <span>fundacjaopomocy2022@gmail.com</span>
                    </a>
                    <a href="tel:+48880468972" className="mb-4 text-gray-300 flex items-center">
                        <PhoneIcon className="w-6 h-6 mr-2" />
                        <span>+48 880 468 972</span>
                    </a>
                    <p className="text-gray-300">REGON: 522639821 NIP: 6132706316 </p>
                    <p className="text-gray-300">KRS: 0000983816</p>
                </div>
                <div ref={middleColumnRef} className="flex flex-row mb-8 lg:mb-0 lg:space-x-10 lg:col-span-1">
                    <div className="flex flex-col mb-4 w-full space-y-3">
                        <a href="#about" className="text-gray-300 whitespace-nowrap">About the Fund</a>
                        <a href="#partners" className="text-gray-300 whitespace-nowrap">Partners</a>
                        <a href="#help-army" className="text-gray-300 whitespace-nowrap">Army Support</a>
                    </div>
                    <div className="flex flex-col w-full space-y-3">
                        <a href="#auctions" className="text-gray-300 whitespace-nowrap">Auctions</a>
                        <a href="#news" className="text-gray-300 whitespace-nowrap">News</a>
                    </div>
                </div>

                <div ref={bottomRowRef} className="lg:col-span-3 mt-10">
                    <h4 className="text-sm text-gray-300">@ Od Serca do Serca. All rights reserved.</h4>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
