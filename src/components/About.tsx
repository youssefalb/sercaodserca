import React from 'react';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';

const About = () => {
    return (
        <section id="about" className="max-w-6xl mx-auto bg-white pt-28 pb-28 px-8 sm:px-6 lg:px-8 relative  overflow-hidden flex flex-col md:flex-row-reverse">

            {/* Text Section */}
            <div className="w-full md:w-3/4 p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">About the Fund</h2>
                <p className="mb-4 text-center md:text-left">
                    The fund's mission is to provide financial and non-financial assistance to Ukraine; including support for families and individuals in difficult living situations...
                </p>

                <div className="space-y-2 mb-6 text-center md:text-left">
                    <p className="flex justify-center md:justify-start items-center text-purple font-bold">
                        <EmailIcon className="w-6 h-6 mr-2" />
                        fundhelp2022@example.com
                    </p>
                    <p className="flex justify-center md:justify-start items-center text-purple font-bold">
                        <PhoneIcon className="w-6 h-6 mr-2 " />
                        +48 880 468 972
                    </p>
                </div>
                <div className="text-sm mb-2 text-center md:text-left space-x-4">
                    <span>REGON: 522639821</span>
                    <span>NIP: 6312706316</span>
                    <span>KRS: 0000983816</span>
                </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/4 p-4 flex justify-center md:justify-end">
                <img src="/about_image.png" alt="Heart shapes with flags" className="object-cover object-center w-full  h-full rounded-2xl shadow-lg" />
            </div>
        </section>
    );
};

export default About;
