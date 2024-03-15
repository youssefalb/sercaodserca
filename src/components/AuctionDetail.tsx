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
    currentHighestBid: number;
    timeRemaining: string;
    endOfAuction: Timestamp | null; // Allow for null if the data hasn't loaded yet
    description: string;
}


const AuctionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);

    const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
    const [liveTimeRemaining, setLiveTimeRemaining] = useState<string>("");
    const [hasAuctionEnded, setHasAuctionEnded] = useState<boolean>(false);
    const [bidAmount, setBidAmount] = useState('');
    const handleBidSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Submitting bid of ${bidAmount} PLN for auction ${id}`);
    };

    useEffect(() => {
        const fetchAuctionItem = async () => {
            if (id) {
                const docRef = doc(db, 'auctions', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Extract the data and convert the Timestamp to a readable format
                    const data = docSnap.data();
                    const endOfAuction = data.endOfAuction ? data.endOfAuction.toDate() : null;

                    setAuctionItem({
                        id: docSnap.id,
                        image: data.image,
                        title: data.title,
                        currentHighestBid: data.currentHighestBid,
                        timeRemaining: "",
                        endOfAuction: data.endOfAuction ? data.endOfAuction : null, // Handle null
                        description: data.description,
                    });

                    if (endOfAuction) {
                        setHasAuctionEnded(new Date() > endOfAuction);
                    }
                } else {
                    console.log('No such document!');
                }
            }
        };

        fetchAuctionItem();
    }, [id]);

    useEffect(() => {
        const calculateTimeRemaining = () => {
            if (!auctionItem || !auctionItem.endOfAuction) return;
            const now = new Date().getTime();
            const end = auctionItem.endOfAuction.toDate().getTime();
            const distance = end - now;

            if (distance < 0) {
                setLiveTimeRemaining("Auction ended");
                setHasAuctionEnded(true);
                return;
            }

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in a string format
            setLiveTimeRemaining(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
        };

        const timer = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [auctionItem]);
    if (!id) {
        return null;
    }

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
                    <div className="uppercase tracking-wide text-base text-indigo-500 font-semibold">{auctionItem?.title}</div>
                    <div className="mt-2 text-gray-500">
                        <FontAwesomeIcon icon={faGavel} className="mr-2" />Current Bid: {auctionItem?.currentHighestBid} PLN
                    </div>
                    <div className="mt-4">
                        <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-2" />
                        Time Remaining: {liveTimeRemaining}
                    </div>
                    <div className="mt-4">
                        <FontAwesomeIcon icon={faGavel} className="text-gray-500 mr-2" />
                        End date: {auctionEndDate}
                    </div>
                    {!hasAuctionEnded && (
                        <form onSubmit={handleBidSubmit} className="mt-8 flex justify-center items-center">
                            <div className="flex items-center border rounded overflow-hidden">
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    className="py-2 px-4"
                                    placeholder="Bid"
                                    style={{ width: '120px' }}
                                    min="1"
                                />
                                <span className="bg-gray-200 py-2 px-4">PLN</span>
                            </div>
                            <button type="submit" className="bg-purple hover:bg-blue text-white font-bold py-2 px-4 rounded ml-4">
                                Place Bid
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <div className="p-8">
                <div className="block mt-4 text-lg leading-tight font-medium text-black ">{auctionItem?.description}</div>
            </div>
        </div>
    );
};

export default AuctionDetail;