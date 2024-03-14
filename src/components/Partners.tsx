import React from 'react';

// Dummy partner data - replace with real data
const partners = [
    {
        id: 1,
        name: "Biedronka",
        logo: "/biedronka-logo.png",
        website: "https://www.biedronka.pl/pl"
    },
    {
        id: 2,
        name: "Kaufland",
        logo: "/kaufland-logo.png",
        website: "https://www.kaufland.com/"
    },


    // Add more partners as needed
];

const Partners = () => {
    return (
        <section id="hero" className="bg-gray-100 pt-10 pb-5 px-8 sm:px-6 lg:px-8 relative ">
            <h2 className="text-3xl font-semibold mb-6 mt-6 text-center">Partners</h2>
            <div className="flex flex-wrap justify-center items-center">
                {partners.map(partner => (
                    <a key={partner.id} href={partner.website} target="_blank" rel="noopener noreferrer" className="border border-gray-300 rounded-lg overflow-hidden m-2 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <img src={partner.logo} alt={partner.name} className="h-52 w-52 object-contain" />
                    </a>
                ))}
            </div>
            <div className="flex justify-center mt-10 p-4">

                <button
                    className="text-white bg-black px-4 py-2 mb-10 rounded-md hover:bg-gray-500"
                    onClick={() => { }}
                >
                    Become a Partner with a Donation
                </button>
            </div>
        </section>
    );
};

export default Partners;
