import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the path as necessary
import { isAdminUser } from '../utils/AuthUtils'; // Adjust the path as necessary
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this auction item?')) {
            await deleteDoc(doc(db, "auctions", id));
            onDelete(); // Call the onDelete handler passed down from the parent
        }
    };

    const handleEdit = () => {
        navigate(`/edit-blog-post/${id}`); // Assuming you have this route set up for editing
    };


    const truncateString = (str: string, maxLength: number) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    };
    return (
        <div className="border border-gray-300 bg-white rounded-2xl p-4 flex flex-col items-center max-w-sm">
            <div className="mb-4">
                <img src={image} alt={title} className="object-cover h-48 w-60 rounded-t-lg" />
            </div>
            <h5 className="text-lg font-bold">{truncateString(title, 28)}</h5>
            <p className="text-gray-600 mt-2">{description}</p>
            <p className="text-gray-500 text-sm mt-2">{datePublished}</p>
            <Link to={`/blog/${id}`} className="lg:block text-white bg-purple px-4 py-2 rounded-md m-6 hover:bg-gray-500">
                {t('blogs.readMore')}
            </Link>
            {isAdminUser(currentUser) && (
                <div className="space-x-2">
                    <button onClick={handleEdit} className="text-white bg-black px-3 py-2 rounded-md hover:bg-blue-700">{t('blogs.edit')}</button>
                    <button onClick={handleDelete} className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-700">{t('blogs.delete')}</button>
                </div>
            )}
        </div>
    );
};

export default BlogCard;
