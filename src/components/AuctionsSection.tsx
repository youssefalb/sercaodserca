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
        {
            id: 5,
            image: "https://via.placeholder.com/150",
            title: "Item Name 5",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 6,
            image: "https://via.placeholder.com/150",
            title: "Item Name 6",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 7,
            image: "https://via.placeholder.com/150",
            title: "Item Name 7",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 8,
            image: "https://via.placeholder.com/150",
            title: "Item Name 8",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 9,
            image: "https://via.placeholder.com/150",
            title: "Item Name 9",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 10,
            image: "https://via.placeholder.com/150",
            title: "Item Name 10",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 11,
            image: "https://via.placeholder.com/150",
            title: "Item Name 11",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 12,
            image: "https://via.placeholder.com/150",
            title: "Item Name 12",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 13,
            image: "https://via.placeholder.com/150",
            title: "Item Name 13",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 14,
            image: "https://via.placeholder.com/150",
            title: "Item Name 14",
            startingPrice: "10 USD",
            auctionEnd: "10/15/2021",
        },
        {
            id: 15,
            image: "https://via.placeholder.com/150",
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
