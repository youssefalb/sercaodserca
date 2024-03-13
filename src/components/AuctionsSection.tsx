import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';
import AuctionCard from './AuctionCard';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../utils/AuthUtils';



// Auctions Section
const AuctionsSection = () => {
    const dummyData = [
        {
            id: 1,
            image: "https://via.placeholder.com/150",
            title: "Item Name 1",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/150",
            title: "Item Name 2",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 3,
            image: "https://via.placeholder.com/150",
            title: "Item Name 3",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 4,
            image: "https://via.placeholder.com/150",
            title: "Item Name 4",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },

    ];

    const { currentUser } = useAuth(); // Use your authentication context
    const navigate = useNavigate(); // For navigation to the add auction page

    return (
        <section className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
                <h2 className="text-2xl font-bold sm:mb-0 mb-4 text-center sm:text-center flex-1">Auctions</h2>
                {isAdminUser(currentUser) && (
                    <button
                        className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate('/add-auction')} // Assuming '/add-auction' is your route to add auctions
                    >
                        Add Auction
                    </button>
                )}
            </div>



            <CustomSlider>
                {dummyData.map((item, index) => (
                    <AuctionCard key={index} {...item} />
                ))}
            </CustomSlider>
        </section>
    );
};


export default AuctionsSection;
