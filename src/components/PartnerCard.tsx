import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config'; // Adjust the import path as needed
import { useAuth } from '../AuthContext'; // Assuming this is where your authentication context is
import { isAdminUser } from '../utils/AuthUtils'; // Assuming this checks if the current user is an admin

interface PartnerCardProps {
    id: string;
    name: string;
    logo: string;
    website: string;
    onDelete: () => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ id, name, logo, website, onDelete }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Assuming useAuth returns an object including currentUser

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            await deleteDoc(doc(db, 'partners', id));
            onDelete(); // Call the onDelete function passed as a prop
        }
    };

    const goToWebsite = () => {
        window.open(website, '_blank');
    };

    return (
        <div onClick={goToWebsite} className="flex flex-col items-center border border-gray-300 rounded-2xl overflow-hidden m-2 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={logo} alt={name} className="h-52 w-52 object-contain" />
            <div className="p-4">
                <p className='p-4'>{name}</p>
                {isAdminUser(currentUser) && (
                    <div className="flex justify-center space-x-2">
                        <button onClick={() => navigate(`/edit-partner/${id}`)} className="text-white bg-black px-3 py-2 rounded-md hover:bg-blue-700">Редагувати</button>
                        <button onClick={handleDelete} className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-700">Видалити</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerCard;
