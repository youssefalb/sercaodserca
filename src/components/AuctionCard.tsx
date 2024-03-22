import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { isAdminUser } from '../utils/AuthUtils'; // Adjust the path as necessary
import { collection, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase-config'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next';

interface AuctionCardProps {
    id: string;
    image: string;
    title: string;
    startPrice: string;
    endOfAuction: Timestamp;
    onDelete: () => void; // Add this line
}

const AuctionCard: React.FC<AuctionCardProps> = ({ id, image, title, startPrice, endOfAuction, onDelete }) => {

    const { t } = useTranslation();

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    console.log(id);
    console.log(image);
    console.log(title);
    console.log(startPrice);
    console.log(endOfAuction);
    const formatDate = (timestamp: Timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    console.log(formatDate);
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this auction item?')) {
            await deleteDoc(doc(db, "auctions", id));
            onDelete(); // Call the onDelete handler passed down from the parent
        }
    };

    const handleEdit = () => {
        navigate(`/edit-auction/${id}`); // Assuming you have this route set up for editing
    };

    const truncateString = (str: string, maxLength: number) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    };

    return (
        <div className="border border-gray-300 bg-white rounded-2xl p-4 flex flex-col items-center max-w-sm">
            <div className=" mb-4">
                <img src={image} alt="Auction Item" className="object-cover h-48 w-60" />
            </div>
            <h5 className='font-bold'>{truncateString(title, 28)}</h5>
            <p>{t('auctions.startingPrice')} {startPrice} zł</p>
            <p>{t('auctions.ends')} {formatDate(endOfAuction)} zł</p>
            <Link to={`/auction/${id}`} className="text-white bg-purple px-4 py-2 rounded-md m-6 hover:bg-gray-500">
                {t('auctions.learnMore')}
            </Link>
            {isAdminUser(currentUser) && (
                <div className="space-x-2">
                    <button onClick={handleEdit} className="text-white bg-black px-3 py-2 rounded-md hover:bg-blue-700">{t('auctions.edit')}</button>
                    <button onClick={handleDelete} className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-700">{t('auctions.delete')}</button>
                </div>
            )}
        </div>
    );
};

export default AuctionCard;
