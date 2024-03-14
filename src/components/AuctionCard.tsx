import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { isAdminUser } from '../utils/AuthUtils'; // Adjust the path as necessary
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Adjust the path as necessary

interface AuctionCardProps {
    id: string;
    image: string;
    title: string;
    startingPrice: string;
    auctionEnd: string;
    onDelete: () => void; // Add this line
}

const AuctionCard: React.FC<AuctionCardProps> = ({ id, image, title, startingPrice, auctionEnd, onDelete }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if(window.confirm('Are you sure you want to delete this auction item?')) {
            await deleteDoc(doc(db, "auctions", id));
            onDelete(); // Call the onDelete handler passed down from the parent
        }
    };

    const handleEdit = () => {
        navigate(`/edit-auction/${id}`); // Assuming you have this route set up for editing
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
            <div className="h-48 w-60 mb-4">
                <img src={image} alt="Auction Item" className="object-cover h-full w-full" />
            </div>
            <h5>{title}</h5>
            <p>Starting Price: ${startingPrice}</p>
            <p>Ends: {auctionEnd}</p>
            <Link to={`/auction/${id}`} className="text-white bg-black px-4 py-2 rounded-md m-6 hover:bg-gray-500">
                Learn More
            </Link>
            {isAdminUser(currentUser) && (
                <div className="flex justify-around w-full">
                    <button onClick={handleEdit} className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-700">Edit</button>
                    <button onClick={handleDelete} className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-700">Delete</button>
                </div>
            )}
        </div>
    );
};

export default AuctionCard;
