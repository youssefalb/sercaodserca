import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGavel, faUser, faMoneyBillWave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Timestamp, updateDoc } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { User } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import { time } from 'console';

interface AuctionItem {
    id: string;
    image: string;
    title: string;
    currentHighestBid: number;
    currentHighestBidderEmail?: string; // Updated to include email
    buyNowPrice: number;
    timeRemaining: string;
    endOfAuction: Timestamp | null;
    description: string;
    AuctionEnded?: boolean;
}



const AuctionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // console.log(id);
    const { currentUser } = useAuth();
    // console.log(currentUser?.uid);
    const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
    const [liveTimeRemaining, setLiveTimeRemaining] = useState<string>("");
    const [hasAuctionEnded, setHasAuctionEnded] = useState<boolean>(false);
    const [bidAmount, setBidAmount] = useState('');
    const [isImageModalOpen, setImageModalOpen] = useState(false);


    const handleBidSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Ensure there is a currentUser and a bid amount before proceeding
        if (currentUser && bidAmount) {
            const newBid = Number(bidAmount);
            const currentHighestBid = auctionItem?.currentHighestBid ?? 0;
            if (newBid > currentHighestBid && id !== undefined) {
                const auctionRef = doc(db, "auctions", id);
                await updateDoc(auctionRef, {
                    currentHighestBid: newBid,
                    currentHighestBidder: currentUser.email, // Update the current highest bidder to the current user's UID
                });
                fetchAuctionItem(); // Fetch the auction item again to reflect the changes
                alert(`Bid of ${newBid} PLN placed successfully.`);
                // Optionally fetch auction item again or update state directly to reflect changes
            } else {
                alert('Your bid must be higher than the current highest bid.');
            }
        }
    };

    const fetchAuctionItem = async () => {
        if (id) {
            const docRef = doc(db, 'auctions', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const endOfAuction = data.endOfAuction ? data.endOfAuction.toDate() : null;


                setAuctionItem({
                    id: docSnap.id,
                    image: data.image,
                    title: data.title,
                    currentHighestBid: data.currentHighestBid,
                    currentHighestBidderEmail: data.currentHighestBidderEmail,
                    timeRemaining: "",
                    AuctionEnded: data.AuctionEnded,
                    buyNowPrice: data.buyNowPrice,
                    endOfAuction: data.endOfAuction ? data.endOfAuction : null,
                    description: data.description,
                });

                if (endOfAuction) {
                    console.log('End of auction: ', endOfAuction);
                    setHasAuctionEnded(new Date() > endOfAuction || data.AuctionEnded);
                }
            } else {
                console.log('No such document!');
            }
        }
    };

    useEffect(() => {
        fetchAuctionItem();
        console.log('Fetching auction item...');
        console.log('Auction item: ', auctionItem);
        console.log('Has auction ended: ', hasAuctionEnded);
    }, [id]);


    const handleBuyNow = async () => {
        console.log(`Buying now for ${auctionItem?.buyNowPrice} PLN`);
        if (auctionItem?.id && currentUser) {
            try {
                //TODO: here send email to the seller and buyer

                const auctionRef = doc(db, 'auctions', auctionItem.id);
                await updateDoc(auctionRef, {
                    currentHighestBidderEmail: currentUser.email,
                });

                await updateDoc(auctionRef, {
                    AuctionEnded: true,
                    currentHighestBid: auctionItem.buyNowPrice,
                });
                auctionItem.AuctionEnded = true;
                setHasAuctionEnded(true);
                alert('The auction has ended successfully.');

            } catch (error) {
                console.error('Error ending auction: ', error);
                alert('There was an error ending the auction.');
            }
        }
        else {
            alert('There was an error ending the auction.');
        }
    };

    useEffect(() => {
        const calculateTimeRemaining = () => {
            if (!auctionItem || !auctionItem.endOfAuction) return;
            const now = new Date().getTime();
            const end = auctionItem.endOfAuction.toDate().getTime();
            const distance = end - now;

            if (distance < 0 || auctionItem.AuctionEnded) {
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
    const openImageModal = () => setImageModalOpen(true);

    // Function to close the modal
    const closeImageModal = () => setImageModalOpen(false);
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
            <div onClick={openImageModal} className="cursor-pointer">

                <img className="w-full object-cover" style={{ height: '400px' }} src={auctionItem.image} alt="Auction Item" />
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-2">{auctionItem.title}</h1>
                <p className="text-gray-700">{auctionItem.description}</p>
                <div className="mt-4">
                    <div className="flex flex-col justify-between items-center">
                        <span className="flex items-center text-sm text-gray-500">
                            <FontAwesomeIcon icon={faClock} className="mr-2" />End date: {auctionEndDate}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                            <FontAwesomeIcon icon={faGavel} className="mr-2" />Time Remaining: {liveTimeRemaining}
                        </span>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col justify-between items-center">
                            <span className="flex items-center text-lg font-medium text-gray-900">
                                <FontAwesomeIcon icon={faGavel} className="mr-2" />Current Bid: {auctionItem.currentHighestBid} PLN
                            </span>
                            {auctionItem.currentHighestBidderEmail && (
                                <span className="flex items-center text-sm text-gray-500">
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />{auctionItem.currentHighestBidderEmail}
                                </span>
                            )}
                        </div>
                        {!hasAuctionEnded && (
                            <div className="mt-4">
                                <div className="flex flex-col items-center space-y-10 md:flex-row md:justify-center md:items-end md:space-y-0 md:space-x-10">
                                    <div className="text-center">
                                        <div className="text-gray-500 mb-2">
                                            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                                            Buy It Now Price: {auctionItem.buyNowPrice} PLN
                                        </div>
                                        <button
                                            onClick={handleBuyNow}
                                            className="bg-purple hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-6 md:mt-0 w-full md:w-auto"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                                    <div className="w-full sm:w-auto flex items-center border rounded">
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            className="py-2 px-4 w-full"
                                            placeholder="Enter bid"
                                            min="1"
                                        />
                                        <span className="bg-gray-200 py-2 px-4">PLN</span>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={handleBidSubmit}
                                        className="bg-purple hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mt-4 sm:mt-0"
                                    >
                                        Place Bid
                                    </button>
                                </div>
                            </div>
                        )}
                        {isImageModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={closeImageModal}>
                                <div className="bg-white p-4 rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                                    <FontAwesomeIcon icon={faTimes} className="absolute top-0 right-0 m-4 cursor-pointer text-black" onClick={closeImageModal} />
                                    <img
                                        className="max-w-full max-h-full"
                                        src={auctionItem.image}
                                        alt="Auction Item Large View"
                                    />
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionDetail;