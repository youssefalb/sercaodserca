import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; 
import { db } from '../firebase-config'; // Your Firebase configuration file
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';
import AuctionCard from './AuctionCard'; // Your AuctionCard component
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../utils/AuthUtils';

// Define the structure of your auction data
interface AuctionItem {
    id: string;
    image: string;
    title: string;
    startingPrice: string;
    auctionEnd: string;
}

const AuctionsSection: React.FC = () => {
    const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchAuctionItems = async () => {
    //         const querySnapshot = await getDocs(collection(db, "auctions"));
    //         const items: AuctionItem[] = querySnapshot.docs.map((doc) => ({
    //             ...doc.data() as AuctionItem,
    //             id: doc.id,
    //         }));
    //         setAuctionItems(items);
    //     };

    //     fetchAuctionItems();
    // }, []);
    

    const fetchAuctionItems = async () => {
        const querySnapshot = await getDocs(collection(db, "auctions"));
        const items: AuctionItem[] = querySnapshot.docs.map(doc => ({
            ...doc.data() as AuctionItem,
            id: doc.id
        }));
        setAuctionItems(items);
    };

    useEffect(() => {
        fetchAuctionItems();
    }, []);


    const handleDeleteItem = async (itemId: string) => {
        await deleteDoc(doc(db, "auctions", itemId));
        fetchAuctionItems(); // Re-fetch the auction items after one is deleted
    };

    return (
        <section className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
                <h2 className="text-2xl font-bold sm:mb-0 mb-4 text-center sm:text-center flex-1">Auctions</h2>
                {isAdminUser(currentUser) && (
                    <button
                        className="bg-purple hover:bg-purple text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate('/add-auction')}
                    >
                        Add Auction Item
                    </button>
                )}
            </div>
            <CustomSlider>
                {auctionItems.map((item) => (
                    <AuctionCard key={item.id} {...item} onDelete={() => handleDeleteItem(item.id)} />
                ))}
            </CustomSlider>
        </section>
    );
};

export default AuctionsSection;
