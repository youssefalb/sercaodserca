import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';
import BlogCard from './BlogCard'; // Make sure to create this component
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../utils/AuthUtils';

// Blogs Section
const BlogsSection = () => {
    const dummyData = [
        {
            id: 1,
            image: "https://via.placeholder.com/150",
            title: "Blog Post Title 1",
            description: "Brief description for Blog Post 1",
            datePublished: "10/15/2021",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/150",
            title: "Blog Post Title 2",
            description: "Brief description for Blog Post 2",
            datePublished: "11/10/2021",
        },

        // ... other blog posts
    ];

    const { currentUser } = useAuth(); // Use your authentication context
    const navigate = useNavigate(); // For navigation

    return (
        <section className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
                <h2 className="text-2xl font-bold sm:mb-0 mb-4 text-center sm:text-center flex-1">Blogs</h2>
                {/* {isAdminUser(currentUser) && ( */}
                <button
                    className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/add-blog')} // Change to your route to add blogs
                >
                    Add Blog Post
                </button>
                {/* )} */}
            </div>
            <CustomSlider>
                {dummyData.map((item) => (
                    <BlogCard key={item.id} {...item} />
                ))}
            </CustomSlider>
        </section>
    );
};

export default BlogsSection;
