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
import ConfirmationModal from './ConfirmationModal';
import { useTranslation } from 'react-i18next';

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


enum Action {
    BuyNow,
    PlaceBid,
}

const AuctionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // console.log(id);
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    // console.log(currentUser?.uid);
    const [auctionItem, setAuctionItem] = useState<AuctionItem | null>(null);
    const [liveTimeRemaining, setLiveTimeRemaining] = useState<string>("");
    const [hasAuctionEnded, setHasAuctionEnded] = useState<boolean>(false);
    const [bidAmount, setBidAmount] = useState('');
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
    const [action, setAction] = useState<Action | null>(null); // New state to track the current action

    const handleBuyNowClick = () => {
        setAction(Action.BuyNow);
        setConfirmationModalOpen(true);
    };

    const handlePlaceBidClick = () => {
        if (Number(bidAmount) > (auctionItem?.currentHighestBid ?? 0)) {
            console.log('Placing bid...');
            console.log('Bid amount: tryyyyyyyyyyy');
            setAction(Action.PlaceBid);
            setConfirmationModalOpen(true);
        } else {
            alert('Your bid must be higher than the current highest bid.');
        }
    };


    const handleConfirm = async () => {
        setConfirmationModalOpen(false);

        if (action === Action.BuyNow && auctionItem?.id && currentUser) {
            console.log(`Buying now for ${auctionItem.buyNowPrice} PLN`);
            try {
                const auctionRef = doc(db, 'auctions', auctionItem.id);
                await updateDoc(auctionRef, {
                    currentHighestBidderEmail: currentUser.email,
                    AuctionEnded: true,
                    currentHighestBid: auctionItem.buyNowPrice,
                });
                alert('The auction has ended successfully.');
            } catch (error) {
                console.error('Error ending auction: ', error);
                alert('There was an error ending the auction.');
            }
        } else if (action === Action.PlaceBid && currentUser && bidAmount) {
            const newBid = Number(bidAmount);
            const currentHighestBid = auctionItem?.currentHighestBid ?? 0;
            if (auctionItem?.buyNowPrice !== undefined && newBid >= auctionItem.buyNowPrice) {
                alert(`Your bid meets or exceeds the Buy Now price of ${auctionItem.buyNowPrice} PLN. Consider using the Buy Now option instead.`);
            } else if (newBid > currentHighestBid && auctionItem?.id) {
                try {
                    const auctionRef = doc(db, "auctions", auctionItem.id);
                    await updateDoc(auctionRef, {
                        currentHighestBid: newBid,
                        currentHighestBidderEmail: currentUser.email,
                    });
                    alert(`Bid of ${newBid} PLN placed successfully.`);
                } catch (error) {
                    console.error('Error placing bid: ', error);
                    alert('There was an error placing your bid.');
                }
            } else {
                alert('Your bid must be higher than the current highest bid.');
            }
        }

        // Reset action and fetch the latest auction item state
        setAction(null);
        fetchAuctionItem();
        setHasAuctionEnded(auctionItem?.AuctionEnded ?? false);
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
                            <FontAwesomeIcon icon={faClock} className="mr-2" />{t('auctionDetails.endDate')} {auctionEndDate}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                            <FontAwesomeIcon icon={faGavel} className="mr-2" />{t('auctionDetails.timeRemaining')} {liveTimeRemaining}
                        </span>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col justify-between items-center">
                            <span className="flex items-center text-lg font-medium text-gray-900">
                                <FontAwesomeIcon icon={faGavel} className="mr-2" />{t('auctionDetails.currentBid')} {auctionItem.currentHighestBid} PLN
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
                                            {t('auctionDetails.buyNowPrice')} {auctionItem.buyNowPrice} zł
                                        </div>
                                        <button
                                            onClick={handleBuyNowClick}
                                            className="bg-purple hover:bg-blue-600 text-white font-bold py-2 px-4 rounded my-6 md:mt-0 w-full md:w-auto"
                                        >
                                            {t('auctionDetails.buyNow')}
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
                                            placeholder={t('auctionDetails.enterBid')}
                                            min="1"
                                        />
                                        <span className="bg-gray-200 py-2 px-4">zł</span>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={handlePlaceBidClick}
                                        className="bg-purple hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mt-4 sm:mt-0"
                                    >
                                        {t('auctionDetails.placeBid')}
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
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setConfirmationModalOpen(false)}
                onConfirm={handleConfirm}
                title={`Confirm ${action === Action.BuyNow ? 'Purchase' : 'Bid'}`}
                message={`Are you sure you want to ${action === Action.BuyNow ? 'buy this item now' : 'place this bid'}?`}
            />
            <hr className="my-4 border-t border-gray-300" />
            <p className="text-red-500 text-xs m-10">
                We'll email the auction winner within 24 hours after the auction ends. When you get this email, please reply quickly with your payment. Remember to include your name, address, email, and last name in your reply, along with the payment proof. We need this info to confirm you won and to sort everything out quickly. If you don't send all the details, there might be delays.
            </p>
        </div>
    );
};

export default AuctionDetail;