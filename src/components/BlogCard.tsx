import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
    id: number;
    image: string;
    title: string;
    description: string;
    datePublished: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, image, title, description, datePublished }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
            <div className="h-48 w-60 mb-4">
                <img src={image} alt={title} className="object-cover h-full w-full rounded-t-lg" />
            </div>
            <h5 className="text-lg font-bold">{title}</h5>
            <p className="text-gray-600 mt-2">{description}</p>
            <p className="text-gray-500 text-sm mt-2">{datePublished}</p>
            <Link to={`/blog/${id}`} className="hidden lg:block text-white bg-purple px-4 py-2 rounded-md m-6 hover:bg-gray-500">
                Read More
            </Link>
        </div>
    );
};

export default BlogCard;
