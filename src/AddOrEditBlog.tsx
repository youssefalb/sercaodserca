import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from './firebase-config'; // Path to your Firebase config
import { useAuth } from './AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const AddBlogPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const { currentUser } = useAuth();
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    // Check if the user is editing an existing blog post
    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const docRef = doc(db, "blogPosts", postId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const post = docSnap.data();
                    setTitle(post.title);
                    setContent(post.content);
                    setImage(post.image);
                    // Check if post.publishDate is a Firestore Timestamp object
                    if (post.publishDate && typeof post.publishDate.toDate === 'function') {
                        setPublishDate(post.publishDate.toDate().toISOString().substring(0, 10)); // Convert Firestore Timestamp to JavaScript Date then to ISO string
                    } else if (post.publishDate) {
                        // This case handles if publishDate is already a string or other format
                        // You might want to handle this differently based on your data
                        setPublishDate(new Date(post.publishDate).toISOString().substring(0, 10));
                    }

                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchPost();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = {
            title,
            content,
            image,
            publishDate: new Date(publishDate),
        };

        try {
            if (postId) {
                // If postId exists, update the existing post
                const postRef = doc(db, "blogPosts", postId);
                await setDoc(postRef, postData);
                alert('Blog post updated successfully!');
            } else {
                // Otherwise, add a new post
                const newPostRef = doc(collection(db, "blogPosts"));
                await setDoc(newPostRef, postData);
                alert('Blog post added successfully!');
            }
            navigate('/blog'); // Navigate to blog list or dashboard after submission
        } catch (err) {
            console.error(err);
            alert('Failed to save blog post');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 mt-20 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">{postId ? 'Edit' : 'Add'} Blog Post</h2>
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
            <button type="submit" className="bg-purple hover:bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                {postId ? 'Update' : 'Add'} Blog Post
            </button>
        </form>
    );
};

export default AddBlogPost;
