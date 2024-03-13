import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGavel } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

interface AuctionItem {
    image: string;
    title: string;
    currentBid: number;
    timeRemaining: string;
    auctionEnd: string;
    description: string;
}

const getAuctionItemById = (id: number): AuctionItem => {
    // Mock data, replace with data fetching logic
    return {
        image: "https://via.placeholder.com/150",
        title: "Unique Art Piece",
        currentBid: 1100,
        timeRemaining: "6 days 9 hours 35 minutes",
        auctionEnd: "Ends on 21.09.2024",
        description: "This is a unique paragraph that has historical value and an aesthetical meaning.",
    };
};

const AuctionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return null;
    }
    const auctionItem = getAuctionItemById(parseInt(id));

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-4xl pt-20">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-full w-full object-cover md:h-full md:w-48" src={auctionItem.image} alt="Auction Item" />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{auctionItem.title}</div>
                    <div className="block mt-4 text-lg leading-tight font-medium text-black hover:underline">{auctionItem.description}</div>
                    <div className="mt-2 text-gray-500">
                        <FontAwesomeIcon icon={faGavel} className="mr-2" />Current Bid: {auctionItem.currentBid} PLN
                    </div>
                    <div className="mt-4">
                        <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-2" />
                        Time Remaining: {auctionItem.timeRemaining}
                    </div>
                    <div className="mt-4">
                        <FontAwesomeIcon icon={faGavel} className="text-gray-500 mr-2" />
                        {auctionItem.auctionEnd}
                    </div>
                    <div className="mt-8">
                        <span className="text-teal-600 text-md font-semibold">0 PLN</span>
                        <button className="mx-6 bg-purple hover:bg-blue text-white font-bold py-2 px-4 rounded">
                            Place a Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionDetail;