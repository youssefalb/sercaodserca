import React from 'react';
import { Link } from 'react-router-dom';

interface AuctionCardProps {
    id: Number;
    image: string;
    title: string;
    startingPrice: string;
    auctionEnd: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ id, image, title, startingPrice, auctionEnd }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
            <div className="h-48 w-60 mb-4">
                <img src={image} alt="Auction Item" className="object-cover h-full w-full" />
            </div>
            <h5>{title}</h5>
            <p>{startingPrice}</p>
            <p>{auctionEnd}</p>
            <Link to={`/auction/${id}`} className="hidden lg:block text-white bg-black px-4 py-2 rounded-md m-6 hover:bg-gray-500">
                learn more
            </Link>
        </div>
    );
};

export default AuctionCard;
