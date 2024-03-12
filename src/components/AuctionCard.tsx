import React from 'react';

interface AuctionCardProps {
    image: string;
    title: string;
    startingPrice: string;
    auctionEnd: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ image, title, startingPrice, auctionEnd }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
            <div className="h-48 w-60 mb-4">
                <img src={image} alt="Auction Item" className="object-cover h-full w-full" />
            </div>
            <h5>{title}</h5>
            <p>{startingPrice}</p>
            <p>{auctionEnd}</p>
            <button className="hidden lg:block text-white bg-black px-4 py-2 rounded-md m-6 hover:bg-gray-500">Learn More</button>
        </div>
    );
};

export default AuctionCard;
