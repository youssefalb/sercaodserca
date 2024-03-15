import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGavel } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

interface AuctionItem {
    id: string;
    image: string;
    title: string;
    currentBid: number;
    timeRemaining: string;
    endOfAuction: Timestamp | null; // Allow for null if the data hasn't loaded yet
    description: string;
}

// const getAuctionItemById = (id: number): AuctionItem => {
//     // Mock data, replace with data fetching logic
//     return {
//         image: "https://via.placeholder.com/150",
//         title: "Unique Art Piece",
//         currentBid: 1100,
//         timeRemaining: "6 days 9 hours 35 minutes",
//         auctionEnd: "Ends on 21.09.2024",
//         description: "This is a unique paragraph that has historical value and an aesthetical meaning.",
//     };
// };

const AuctionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);
    if (!id) {
        return null;
    }
    const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
    useEffect(() => {
        const fetchAuctionItem = async () => {
            if (id) {
                const docRef = doc(db, 'auctions', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Extract the data and convert the Timestamp to a readable format
                    const data = docSnap.data();
                    setAuctionItem({
                        id: docSnap.id,
                        image: data.image,
                        title: data.title,
                        currentBid: data.currentBid,
                        timeRemaining: data.timeRemaining,
                        endOfAuction: data.endOfAuction ? data.endOfAuction : null, // Handle null
                        description: data.description,
                    });
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchAuctionItem();
    }, [id]);

    
    if (!auctionItem) {
        return <div>Loading...</div>;
    }
    const auctionEndDate = auctionItem.endOfAuction ? auctionItem.endOfAuction.toDate().toLocaleString() : 'Not specified';

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-4xl pt-20">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-full w-full object-cover md:h-full md:w-48" src={auctionItem?.image} alt="Auction Item" />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{auctionItem?.title}</div>
                    <div className="block mt-4 text-lg leading-tight font-medium text-black hover:underline">{auctionItem?.description}</div>
                    <div className="mt-2 text-gray-500">
                        <FontAwesomeIcon icon={faGavel} className="mr-2" />Current Bid: {auctionItem?.currentBid} PLN
                    </div>
                    <div className="mt-4">
                        <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-2" />
                        Time Remaining: {auctionItem?.timeRemaining}
                    </div>
                    <div className="mt-4">
                        <FontAwesomeIcon icon={faGavel} className="text-gray-500 mr-2" />
                        {auctionEndDate}
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