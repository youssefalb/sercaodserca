import React from 'react';

// Define the types for your component's props
interface SupportCardProps {
  backgroundUrl: string;
  title: string;
  description: string;
  buttonText: string;
  rightImageUrl: string;
}

const SupportCard: React.FC<SupportCardProps> = ({title, description, buttonText, rightImageUrl }) => {
    const backgroundImg = "url('./assets/images/supportCard.png')";
    const mobileBackgroundUrl = "url('./assets/images/heroMobile.svg')";
    return (
      <div className={`relative rounded-2xl overflow-hidden max-w-6xl mx-4 bg-cover ${window.innerWidth < 640 ? 'bg-backgroundImg' : 'bg-desktop-background'}`} style={{ height: window.innerWidth < 640 ? 'auto' : '300px' }}> {/* Use window.innerWidth for a rudimentary mobile check */}
        <div className="flex flex-col lg:flex-row justify-between items-center h-full">
          <div className="space-y-4 p-8">
            <h1 className="text-3xl font-bold text-black">{title}</h1>
            <p className="text-black">{description}</p>
            <button className="bg-blue-500 text-white rounded-lg px-6 py-2">{buttonText}</button>
          </div>
          <img src={rightImageUrl} alt="" className="lg:h-full w-auto lg:w-auto w-full lg:max-w-none max-w-xs mx-auto h-auto object-contain lg:ml-auto" />
        </div>
      </div>
    );
};



  
  
  

export default SupportCard;
