import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from './firebase-config'; // Adjust the path as necessary
import { useAuth } from './AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddOrEditPartner: React.FC = () => {
    const { t } = useTranslation();
    const { partnerId } = useParams<{ partnerId: string }>();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoUrl, setLogoUrl] = useState('');

    const isEditMode = partnerId !== undefined;

    useEffect(() => {
        const fetchPartner = async () => {
            if (!isEditMode) return;
            const docRef = doc(db, "partners", partnerId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name);
                setWebsite(data.website);
                setLogoUrl(data.logo);
            } else {
                console.log("No such document!");
            }
        };

        fetchPartner();
    }, [partnerId, isEditMode]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setLogoFile(e.target.files[0]);
            setLogoUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const uploadLogo = async (): Promise<string> => {
        if (logoFile) {
            const logoRef = ref(storage, `partnerLogos/${logoFile.name}`);
            await uploadBytes(logoRef, logoFile);
            return await getDownloadURL(logoRef);
        }
        return logoUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const logoUrl = await uploadLogo();

        const partnerData = {
            name,
            website,
            logo: logoUrl,
        };

        if (isEditMode) {
            await setDoc(doc(db, "partners", partnerId), partnerData);
            alert('Partner updated successfully!');
        } else {
            const newPartnerRef = doc(collection(db, "partners"));
            await setDoc(newPartnerRef, partnerData);
            alert('Partner added successfully!');
        }

        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 mt-20 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">{isEditMode ? t('partners.editTitle') : t('partners.addTitle')}</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">{t('partners.name')}</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('partners.enterName')}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="website" className="block text-gray-700 text-sm font-bold mb-2">{t('partners.website')}</label>
                <input
                    type="text"
                    id="website"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    placeholder={t('partners.enterWebsite')}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="logo" className="block text-gray-700 text-sm font-bold mb-2">{t('partners.logo')}</label>
                <input
                    type="file"
                    id="logo"
                    onChange={handleLogoChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {logoUrl && (
                    <div className="mt-4">
                        <img src={logoUrl} alt="Logo Preview" className="max-h-20 mx-auto" />
                    </div>
                )}
            </div>
            <button type="submit" className="bg-purple hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                {isEditMode ? t('partners.updateButton') : t('partners.addButton')}
            </button>
        </form>

    );
};


export default AddOrEditPartner;