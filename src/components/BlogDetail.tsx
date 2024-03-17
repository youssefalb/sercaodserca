import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Update with the correct path to your firebase config
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
    id: string;
    image: string;
    title: string;
    content: string;
    publishDate: Date;
}

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchBlogPost = async () => {
            if (id) {
                const docRef = doc(db, 'blogPosts', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setBlogPost({
                        id: docSnap.id,
                        image: data.image,
                        title: data.title,
                        content: data.content,
                        publishDate: data.publishDate.toDate() // Assuming publishDate is a Timestamp
                    });
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchBlogPost();
    }, [id]);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    if (!blogPost) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <article className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
                <div className="cursor-pointer" onClick={openModal}>
                    <img className=" object-cover w-full" style={{ maxHeight: '50vh' }} src={blogPost.image} alt="Blog Post" />
                </div>
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
                    <p className="mb-4">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                        Published on: {blogPost.publishDate.toLocaleDateString()}
                    </p>
                    <section className="prose max-w-none">
                        {blogPost.content}
                    </section>
                </div>
            </article>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
                    <div className="bg-white p-4 rounded max-w-lg max-h-full overflow-auto" onClick={e => e.stopPropagation()}>
                        <FontAwesomeIcon icon={faTimes} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={closeModal} />
                        <img src={blogPost.image} alt="Blog Post" className="max-h-screen" />
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogDetail;
