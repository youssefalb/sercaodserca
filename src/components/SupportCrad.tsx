import React from 'react';

interface SupportCardProps {
  title: string;
  description: string;
  buttonText: string;
  rightImageUrl: string;
}

const SupportCard: React.FC<SupportCardProps> = ({ title, description, buttonText, rightImageUrl }) => {
    return (
        <div className="relative rounded-2xl overflow-hidden max-w-6xl mx-auto bg-cover lg:h-[300px] h-auto"> {/* Adjust the height for mobile */}
            {/* Separate div for background images to ensure they are behind content */}
            <div className="absolute inset-0">
                <img src="./heroMobile.svg" alt="Mobile Background" className="lg:hidden w-full h-auto object-cover rounded-2xl" /> {/* Adjust height for mobile background */}
                <img src="./supportCard.png" alt="Desktop Background" className="hidden lg:block w-full h-full object-cover rounded-2xl" />
            </div>
            {/* Content div positioned relative to ensure it's above the background images */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center lg:h-full p-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-black">{title}</h1>
                    <p className="text-black">{description}</p>
                    <button className="bg-blue-500 text-white rounded-lg px-6 py-2">{buttonText}</button>
                </div>
                <img src={rightImageUrl} alt="Side image" className="w-full lg:max-w-xs lg:h-auto h-48 object-contain mx-auto lg:ml-auto" /> {/* Ensure full width on mobile */}
            </div>
        </div>
    );
};

export default SupportCard;
