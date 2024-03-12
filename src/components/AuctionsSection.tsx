import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';
import AuctionCard from './AuctionCard';


// Auctions Section
const AuctionsSection = () => {
    const dummyData = [
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 1",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 2",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 3",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 4",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },

        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 5",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 6",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 7",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 8",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 9",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 10",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 11",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 12",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 13",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 14",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            image: "https://via.placeholder.com/150", // Replace with your image path
            title: "Item Name 15",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },


    ];

    return (
        <section className="p-6">
            <h2 className="text-center text-2xl font-bold mb-6">Auctions</h2>
            <CustomSlider>
                {dummyData.map((item, index) => (
                    <AuctionCard key={index} {...item} />
                ))}
            </CustomSlider>
        </section>
    );
};


export default AuctionsSection;
