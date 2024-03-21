import React, { useEffect, useRef } from 'react';
import heroImage from '../assets/images/hero.svg';
import heroImageMobile from '../assets/images/heromobile.svg';
//import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
     const { t } = useTranslation();

    // References to DOM elements you want to animate
    const textRef = useRef(null);
    const imageRef = useRef(null);

    // useEffect(() => {
    //     // GSAP animations
    //     gsap.fromTo(textRef.current,
    //         { x: -200, opacity: 0 },
    //         { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    //     );
    //     gsap.fromTo(imageRef.current,
    //         { x: 200, opacity: 0 },
    //         { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    //     );
    // }, []);

    return (
        <section id="hero" className="bg-gray-100 pt-20 pb-20 px-8 sm:px-6 lg:px-8 relative ">
            <div className="absolute inset-0 w-full h-full lg:p-4">
                {/* Add your mobile image with lg:hidden to only show on small screens and hide on large */}
                <img src={heroImageMobile} alt="Background" className="lg:hidden w-full h-full object-cover rounded-2xl" />
                {/* Keep your existing desktop image and add hidden lg:block to hide on small screens and show on large */}
                <img src={heroImage} alt="Background" className="hidden lg:block w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="max-w-6xl h-[90vh] text-center lg:text-left mx-auto flex flex-col lg:flex-row justify-center items-center relative"> {/* Ensure content is on top of the background image */}
                <div className="lg:flex-1">
                    <p className="text-lg text-black mb-4">
                    {t('hero.foundation')}
                    </p>
                    <h1 className="lg:text-7xl text-6xl font-bold text-gray-900 mb-6">{t('hero.slogan')}<br></br>{t('hero.slogan1')}</h1>

                    <div className="flex justify-center md:justify-start space-x-4 mt-10">
                        <a href="/payment" className="bg-black text-white text-md font-medium px-6 py-2 rounded-full transition duration-300 ease-in-out hover:bg-gray-700">{t('hero.makePledge')}</a>
                        <a href="#about" className="text-md font-medium px-5 py-2 underline decoration-black decoration-2 underline-offset-4 hover:text-gray-600">{t('hero.learnMore')}</a>
                    </div>
                </div>
                {/* Commented out PricingSection in case it's not needed here */}
            </div>
        </section>
    );
}
