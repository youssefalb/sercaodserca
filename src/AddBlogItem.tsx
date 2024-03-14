import React, { useState } from 'react';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from './firebase-config'; // Path to your Firebase config
import { isAdminUser } from './utils/AuthUtils';
import { useAuth } from './AuthContext';

const AddBlogPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const { currentUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!isAdminUser(currentUser)) {
        //     alert('Only admins can add blog posts.');
        //     return;
        // }

        const newPostRef = doc(collection(db, "blogPosts"));

        await setDoc(newPostRef, {
            title,
            content,
            image,
            publishDate: new Date(publishDate),
        });

        alert('Blog post added successfully!');
        // Reset form or redirect user
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 mt-10 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Blog Post</h2>
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
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Enter Content"
                    required
                    rows={6}
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
            <div className="mb-6">
                <label htmlFor="publishDate" className="block text-gray-700 text-sm font-bold mb-2">Publish Date:</label>
                <input
                    type="date"
                    id="publishDate"
                    value={publishDate}
                    onChange={e => setPublishDate(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button type="submit" className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Add Blog Post
            </button>
        </form>
    );
};

export default AddBlogPost;
