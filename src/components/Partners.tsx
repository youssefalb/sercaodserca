import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { isAdminUser } from '../utils/AuthUtils';
import PartnerCard from './PartnerCard'; // Import the PartnerCard component

interface Partner {
    id: string;
    name: string;
    logo: string;
    website: string;
}

const Partners: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [partners, setPartners] = useState<Partner[]>([]);
    const { currentUser } = useAuth();
    const fetchPartners = async () => {
        const partnersCol = collection(db, 'partners');
        const partnerSnapshot = await getDocs(partnersCol);
        const partnerList = partnerSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Partner, 'id'>),
        }));
        setPartners(partnerList);
    };

    useEffect(() => {


        fetchPartners();
    }, []);

    const refreshPartners = () => {
        // Call fetchPartners again to refresh the list after deletion
        fetchPartners();
    };

    return (
        <section id="partners" className="bg-gray-100 pt-10 pb-5 px-8 sm:px-6 lg:px-8 relative">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold mb-6 mt-6 text-center flex-1">{t('partners.title')}</h2>
                {isAdminUser(currentUser) && (
                    <button
                        className="text-white bg-purple px-4 py-2 rounded-md hover:bg-black"
                        onClick={() => navigate('/add-partner')}
                    >
                        Add Partner
                    </button>
                )}
            </div>
            <div className="flex flex-wrap justify-center items-center">
                {partners.map(partner => (
                    <PartnerCard key={partner.id} {...partner} onDelete={refreshPartners} />
                ))}
            </div>
        </section>
    );
};

export default Partners;
