import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase-config'; // Your Firebase configuration file
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';
import AuctionCard from './AuctionCard'; // Your AuctionCard component
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../utils/AuthUtils';
import { useTranslation } from 'react-i18next';

// Define the structure of your auction data
interface AuctionItem {
    id: string;
    image: string;
    title: string;
    startPrice: string;
    endOfAuction: Timestamp;
}

const AuctionsSection: React.FC = () => {
    const { t } = useTranslation();
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
        <section id="auctions" className="p-6 bg-gray-100 pb-20 mx-auto">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center mb-6 p-10">
                <h2 className="text-3xl font-bold sm:mb-0 mb-4 text-center sm:text-center flex-1">{t('auctions.title')}</h2>
                {isAdminUser(currentUser) && (
                    <button
                        className="bg-purple hover:bg-black text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate('/add-auction')}
                    >
                        {t('auctions.addItem')}
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
