import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection } from "firebase/firestore"; 
import { db } from './firebase-config'; // Path to your Firebase config
import { isAdminUser } from './utils/AuthUtils';
import { useAuth } from './AuthContext'; 
import { useParams, useNavigate } from 'react-router-dom';

const AddOrEditAuctionItem: React.FC = () => {
    const { auctionId } = useParams<{ auctionId: string }>(); // Assuming you're using React Router v6
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [buyNowPrice, setBuyNowPrice] = useState('');
    const [endOfAuction, setEndOfAuction] = useState('');
    const isEditMode = auctionId !== undefined;

    useEffect(() => {
        const fetchAuctionItem = async () => {
            if (!isEditMode) return;
            const docRef = doc(db, "auctions", auctionId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setStartPrice(data.startPrice);
                setBuyNowPrice(data.buyNowPrice);
    
                // Check if endOfAuction exists and is a Firestore Timestamp
                if (data.endOfAuction && data.endOfAuction.toDate) {
                    setEndOfAuction(data.endOfAuction.toDate().toISOString().substring(0, 16)); // Properly convert Firestore Timestamp
                } else if (data.endOfAuction) {
                    // Here handle other potential formats, just in case
                    setEndOfAuction(new Date(data.endOfAuction).toISOString().substring(0, 16));
                }
            } else {
                console.log("No such document!");
            }
        };
    
        fetchAuctionItem();
    }, [auctionId, isEditMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdminUser(currentUser)) {
            alert('Only admins can modify auction items.');
            return;
        }

        const auctionData = {
            title,
            description,
            image,
            startPrice: parseFloat(startPrice),
            buyNowPrice: parseFloat(buyNowPrice),
            endOfAuction: new Date(endOfAuction),
            currentHighestBid: parseFloat(startPrice), // This might need adjustment based on your app logic
            currentHighestBidder: "", // Consider retaining existing values for edits
        };

        if (isEditMode) {
            await setDoc(doc(db, "auctions", auctionId), auctionData);
            alert('Auction item updated successfully!');
        } else {
            const newItemRef = doc(collection(db, "auctions"));
            await setDoc(newItemRef, auctionData);
            alert('Auction item added successfully!');
        }

        navigate('/'); 
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">{isEditMode ? 'Edit Auction Item' : 'Add Auction Item'}</h2>
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
            <button type="submit" className="bg-purple hover:bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                {isEditMode ? 'Update Auction Item' : 'Add Auction Item'}
            </button>
        </form>
    );
    
};

export default AddOrEditAuctionItem;
