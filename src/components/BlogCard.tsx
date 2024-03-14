import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { isAdminUser } from '../utils/AuthUtils'; // Adjust the path as necessary
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Adjust the path as necessary

interface BlogCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
    datePublished: string;
    onDelete: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, image, title, description, datePublished, onDelete }) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if(window.confirm('Are you sure you want to delete this auction item?')) {
            await deleteDoc(doc(db, "auctions", id));
            onDelete(); // Call the onDelete handler passed down from the parent
        }
    };

    const handleEdit = () => {
        navigate(`/edit-blog-post/${id}`); // Assuming you have this route set up for editing
    };

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
            {isAdminUser(currentUser) && (
                <div className="">
                    <button onClick={handleEdit} className="text-white bg-black px-3 py-2 rounded-md hover:bg-blue-700">Edit</button>
                    <button onClick={handleDelete} className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-700">Delete</button>
                </div>
            )}
        </div>
    );
};

export default BlogCard;
