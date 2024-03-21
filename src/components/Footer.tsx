import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactComponent as EmailIcon } from '../assets/icons/email-white.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone-white.svg';
import { useTranslation } from 'react-i18next';


const Footer = () => {
    const leftColumnRef = useRef(null);
    const middleColumnRef = useRef(null);
    const bottomRowRef = useRef(null); // Ref for the bottom row on desktop

    const { t } = useTranslation();

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const elements = [
    //         { ref: leftColumnRef.current, x: '-100%', opacity: 0 },
    //         { ref: middleColumnRef.current, x: '100%', opacity: 0 },
    //         { ref: bottomRowRef.current, y: '50%', opacity: 0 }
    //     ];

    //     elements.forEach(({ ref, x = 0, y = 0, opacity }) => {
    //         if (ref) {
    //             gsap.fromTo(ref, { x, y, autoAlpha: opacity }, {
    //                 x: 0,
    //                 y: 0,
    //                 autoAlpha: 1,
    //                 duration: 1.5,
    //                 ease: 'power3.out',
    //                 scrollTrigger: {
    //                     trigger: ref,
    //                     start: "top bottom+=50",
    //                     toggleActions: "play none none none",
    //                 }
    //             });
    //         }
    //     });
    // }, []);

    return (
        <footer className="mt-auto bg-blue text-white p-10 rounded-t-xl">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-9 ">
                <div ref={leftColumnRef} className="flex flex-col mb-8 lg:mb-0">
                    <h3 className="font-bold text-lg mb-2">{t('footer.charityFund')}</h3>
                    <div className="mb-4 text-gray-300 flex">
                        <div className="flex-shrink-0"> {/* Keep the icon from shrinking */}
                            <EmailIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-grow ml-2"> {/* Ensure space between icon and text, allow text to wrap */}
                            <a href="mailto:fundacjaopomocy2022@gmail.com" className="block text-sm sm:inline break-words">
                                fundacjaopomocy2022@gmail.com
                            </a>
                        </div>
                    </div>


                    <a href="tel:+48880468972" className="mb-4 text-gray-300 flex items-center space-x-2">
                        <PhoneIcon className="w-6 h-6 flex-shrink-0" />
                        <span className="text-sm sm:text-base">+48 880 468 972</span>
                    </a>

                    <p className="text-gray-300">REGON: 522639821 NIP: 6132706316 </p>
                    <p className="text-gray-300">KRS: 0000983816</p>
                </div>
                <div ref={middleColumnRef} className="flex flex-row mb-8 lg:mb-0 lg:space-x-10 lg:col-span-1">
                    <div className="flex flex-col mb-4 w-full space-y-3">
                        <a href="#about" className="text-gray-300 whitespace-nowrap">{t('footer.about')}</a>
                        <a href="#partners" className="text-gray-300 whitespace-nowrap">{t('footer.partners')}</a>
                        <a href="#help-army" className="text-gray-300 whitespace-nowrap">{t('footer.armySupport')}</a>
                    </div>
                    <div className="flex flex-col w-full space-y-3">
                        <a href="#auctions" className="text-gray-300 whitespace-nowrap">{t('footer.auctions')}</a>
                        <a href="#news" className="text-gray-300 whitespace-nowrap">{t('footer.news')}</a>
                    </div>
                </div>

                <div ref={bottomRowRef} className="lg:col-span-3 mt-10">
                    <h4 className="text-sm text-gray-300">{t('footer.rights')}</h4>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
