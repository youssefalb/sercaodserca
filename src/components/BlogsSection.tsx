import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config.js'; // Your Firebase configuration file
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlider from './CustomSlider';
import BlogCard from './BlogCard'; // Your BlogCard component
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../utils/AuthUtils';

// Define the structure of your blog post data
interface BlogPost {
    id: string;
    image: string;
    title: string;
    description: string;
    datePublished: string;
}

const BlogsSection: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const fetchBlogPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const posts: BlogPost[] = querySnapshot.docs.map((doc) => ({
            ...doc.data() as BlogPost,
            id: doc.id,
        }));
        setBlogPosts(posts);
    };

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const handleDeleteItem = async (itemId: string) => {
        await deleteDoc(doc(db, "blogPosts", itemId));
        fetchBlogPosts(); 
    };

    return (
        <section className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
                <h2 className="text-2xl font-bold sm:mb-0 mb-4 text-center sm:text-center flex-1">Blogs</h2>
                {isAdminUser(currentUser) && (
                    <button
                        className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate('/add-blog-post')}
                    >
                        Add Blog Post
                    </button>
                )}
            </div>
            <CustomSlider>
                {blogPosts.map((post) => (
                    <BlogCard key={post.id} {...post} onDelete={() => handleDeleteItem(post.id)}/>
                ))}
            </CustomSlider>
        </section>
    );
};

export default BlogsSection;
