import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from './firebase-config'; // Path to your Firebase config
import { isAdminUser } from './utils/AuthUtils';
import { useAuth } from './AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddOrEditAuctionItem: React.FC = () => {
    const { t } = useTranslation();
    const { auctionId } = useParams<{ auctionId: string }>(); // Assuming you're using React Router v6
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null); // To handle the file upload
    const [imageUrl, setImageUrl] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [buyNowPrice, setBuyNowPrice] = useState('');
    const [endOfAuction, setEndOfAuction] = useState('');


    const isEditMode = auctionId !== undefined;


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0])); // For image preview
        }
    };

    const uploadImage = async (): Promise<string> => {
        if (imageFile) {
            const imageRef = ref(storage, `auctionImages/${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            return await getDownloadURL(imageRef);
        }
        return imageUrl; // Use existing imageUrl if no new file was selected
    };

    useEffect(() => {
        const fetchAuctionItem = async () => {
            if (!isEditMode) return;
            const docRef = doc(db, "auctions", auctionId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title);
                setDescription(data.description);
                setImageUrl(data.image);
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
        // if (!isAdminUser(currentUser)) {
        //     alert('Only admins can modify auction items.');
        //     return;
        // }
        const imageUrl = await uploadImage(); // Upload image and get URL

        const auctionData = {
            title,
            description,
            image: imageUrl || imageUrl,
            startPrice: parseFloat(startPrice),
            buyNowPrice: parseFloat(buyNowPrice),
            endOfAuction: new Date(endOfAuction),
            currentHighestBid: parseFloat(startPrice),
            currentHighestBidder: "",
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
            <h2 className="text-2xl font-bold mb-6 text-center">{isEditMode ? t('addAuctionItem.buttons.editAuctionItem') : t('addAuctionItem.buttons.addAuctionItem')}</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">{t('addAuctionItem.fields.title')}</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder= {t('addAuctionItem.placeholders.enterTitle')}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">{t('addAuctionItem.fields.description')}</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder= {t('addAuctionItem.placeholders.enterDescription')}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">{t('addAuctionItem.fields.imageUrl')}</label>
                <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="startPrice" className="block text-gray-700 text-sm font-bold mb-2">{t('addAuctionItem.fields.startingPrice')}</label>
                <input
                    type="number"
                    id="startPrice"
                    value={startPrice}
                    onChange={e => setStartPrice(e.target.value)}
                    placeholder= {t('addAuctionItem.placeholders.enterStartingPrice')}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="buyNowPrice" className="block text-gray-700 text-sm font-bold mb-2">{t('addAuctionItem.fields.buyNowPrice')}</label>
                <input
                    type="number"
                    id="buyNowPrice"
                    value={buyNowPrice}
                    onChange={e => setBuyNowPrice(e.target.value)}
                    placeholder= {t('addAuctionItem.placeholders.enterBuyNowPrice')}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="endOfAuction" className="block text-gray-700 text-sm font-bold mb-2">{t('addAuctionItem.fields.endOfAuction')}</label>
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
                {isEditMode ? t('addAuctionItem.buttons.editAuctionItem') : t('addAuctionItem.buttons.addAuctionItem')}
            </button>
        </form>
    );

};

export default AddOrEditAuctionItem;
