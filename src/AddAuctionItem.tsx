import React, { useState } from 'react';
import { doc, setDoc, collection } from "firebase/firestore"; 
import { db } from './firebase-config'; // Path to your Firebase config
import { isAdminUser } from './utils/AuthUtils';
import { useAuth } from './AuthContext'; 

const AddAuctionItem: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [buyNowPrice, setBuyNowPrice] = useState('');
    const [endOfAuction, setEndOfAuction] = useState('');
    const { currentUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdminUser(currentUser)) {
            alert('Only admins can add auction items.');
            return;
        }

        // Creating a unique ID for each auction item
        const newItemRef = doc(collection(db, "auctions"));

        // Adding a new document to Firestore
        await setDoc(newItemRef, {
            title,
            description,
            image,
            startPrice: parseFloat(startPrice),
            buyNowPrice: parseFloat(buyNowPrice),
            endOfAuction: new Date(endOfAuction),
            currentHighestBid: parseFloat(startPrice),
            currentHighestBidder: "",
        });

        alert('Auction item added successfully!');
        // Reset form or redirect user
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Auction Item</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input 
                    type="text" 
                    id="title"
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Enter Title" 
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea 
                    id="description"
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Enter Description" 
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
                <input 
                    type="text" 
                    id="image"
                    value={image} 
                    onChange={e => setImage(e.target.value)} 
                    placeholder="Enter Image URL" 
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="startPrice" className="block text-gray-700 text-sm font-bold mb-2">Starting Price ($):</label>
                <input 
                    type="number" 
                    id="startPrice"
                    value={startPrice} 
                    onChange={e => setStartPrice(e.target.value)} 
                    placeholder="Enter Starting Price" 
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="buyNowPrice" className="block text-gray-700 text-sm font-bold mb-2">Buy Now Price ($):</label>
                <input 
                    type="number" 
                    id="buyNowPrice"
                    value={buyNowPrice} 
                    onChange={e => setBuyNowPrice(e.target.value)} 
                    placeholder="Enter Buy Now Price" 
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="endOfAuction" className="block text-gray-700 text-sm font-bold mb-2">End of Auction:</label>
                <input 
                    type="datetime-local" 
                    id="endOfAuction"
                    value={endOfAuction} 
                    onChange={e => setEndOfAuction(e.target.value)} 
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Add Auction Item
            </button>
        </form>
    );
    
};

export default AddAuctionItem;
