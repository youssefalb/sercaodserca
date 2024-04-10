import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

interface ShutdownNoticeProps {
    setHasPaid: (value: boolean) => void;
}

const ShutdownNotice: React.FC<ShutdownNoticeProps> = ({ setHasPaid }) => {
    const [shutdownMessage, setShutdownMessage] = useState<string>('');
    const [hasPaid, setLocalHasPaid] = useState<boolean>(true);

    useEffect(() => {
        const firestore = getFirestore();
        const configDoc = doc(firestore, 'config/paymentStatus');

        const fetchPaymentStatus = async () => {
            const docSnap = await getDoc(configDoc);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setLocalHasPaid(data.hasPaid ?? true);
                setHasPaid(data.hasPaid ?? true);
                setShutdownMessage(data.shutdownMessage ?? 'Everything is fine');
            } else {
                // Set default values if document doesn't exist
                const defaultData = { hasPaid: true, shutdownMessage: 'Everything is fine' };
                await setDoc(configDoc, defaultData);
                setLocalHasPaid(defaultData.hasPaid);
                setHasPaid(defaultData.hasPaid);
                setShutdownMessage(defaultData.shutdownMessage);
            }
        };

        fetchPaymentStatus();
    }, [setHasPaid]);

    if (!hasPaid) {
        return (
            <div className="flex items-center p-6 justify-center h-screen bg-black">
                <div className="text-center p-6 bg-red-600 rounded-2xl">
                    <h1 className="text-xl font-bold text-white">{shutdownMessage}</h1>
                </div>
            </div>
        );
    }

    return null;
};

export default ShutdownNotice;
