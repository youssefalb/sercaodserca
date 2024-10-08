import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SupportCardProps {
    title: string;
    description: string;
    buttonText: string;
    rightImageUrl: string;
    id: string;
}

const SupportCard: React.FC<SupportCardProps> = ({ title, description, buttonText, rightImageUrl, id }) => {
    
    const navigate = useNavigate();

    return (
        <div id={id} className="relative rounded-2xl overflow-hidden max-w-6xl mx-auto bg-cover lg:h-[300px] h-auto m-24"> {/* Adjust the height for mobile */}
            {/* Separate div for background images to ensure they are behind content */}
            <div className="absolute inset-0">
                <img src="./heromobile.svg" alt="Mobile Background" className="lg:hidden w-full h-auto object-cover rounded-2xl" /> {/* Adjust height for mobile background */}
                <img src="./supportCard.png" alt="Desktop Background" className="hidden lg:block w-full h-full object-cover rounded-2xl" />
            </div>
            {/* Content div positioned relative to ensure it's above the background images */}
            <div className="relative flex flex-col lg:flex-row justify-between items-center lg:h-full">
                <div className="space-y-4 p-8">
                    <h1 className="text-3xl font-bold text-black">{title}</h1>
                    <p className="text-black">{description}</p>
                    <button className="bg-purple text-white rounded-lg px-6 py-2" onClick={() => navigate('/payment')}>{buttonText}</button>
                </div>
                <img src={rightImageUrl} alt="Side image" className="lg:max-w-xs object-contain" /> {/* Ensure full width on mobile */}
            </div>
        </div>
    );
};

export default SupportCard;
