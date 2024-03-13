import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface BlogPost {
    id: number;
    image: string;
    title: string;
    description: string;
    publishDate: string;
}

// Mock function to simulate fetching data
const getBlogPostById = (id: number): BlogPost => {
    // Replace with your data fetching logic
    return {
        id,
        image: "https://via.placeholder.com/150",
        title: "Exciting Blog Post Title",
        description: "This blog post discusses interesting topics and insights.",
        publishDate: "Published on 15/10/2021",
    };
};

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <p>No blog post found.</p>;
    }

    const blogPost = getBlogPostById(parseInt(id));

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-4xl pt-20">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src={blogPost.image} alt="Blog Post" />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{blogPost.title}</div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{blogPost.description}</div>
                    <div className="mt-2">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                        {blogPost.publishDate}
                    </div>
                    <div className="mt-4">
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
