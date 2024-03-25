import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { storage, db } from '../firebase-config';
import { isAdminUser } from '../utils/AuthUtils';
import { useAuth } from '../AuthContext';
import { useTranslation } from 'react-i18next';


interface FileMetadata {
  id: string;
  name: string;
  customName: string;
  url: string;
  uploadedDate: string;
  displayDate: string;
}

const ReportsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState<string>('');

  const fetchFiles = async () => {
    setLoading(true);
    const filesCol = collection(db, 'reports');
    const filesSnapshot = await getDocs(filesCol);


    const filesList = filesSnapshot.docs.map(doc => {
      const data = doc.data();
      const uploadedDate = data.uploadedDate.toDate(); // Convert Firestore Timestamp to JavaScript Date
      const displayDate = uploadedDate.toLocaleString('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      return {
        id: doc.id,
        ...data,
        uploadedDate: uploadedDate.toISOString(), // Keep as ISO string for sorting if needed
        displayDate: displayDate // Human-readable format
      };
    }) as FileMetadata[];

    filesList.sort((a, b) => b.uploadedDate.localeCompare(a.uploadedDate));

    setFiles(filesList);
    setLoading(false);
  };


  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    if (file) {
      const storageRef = ref(storage, `reports/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      const uploadedDate = Timestamp.fromDate(new Date()); // Convert current date to Firestore Timestamp
      await addDoc(collection(db, 'reports'), {
        name: file.name,
        customName: customName || file.name,
        url: url,
        uploadedDate: uploadedDate // Use Firestore Timestamp
      });
      setCustomName('');
      setFile(null);
      fetchFiles(); // Refresh the list after uploading
    }
  };


  const deleteFile = async (fileId: string, storagePath: string) => {
    await deleteDoc(doc(db, 'reports', fileId));
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);
    fetchFiles();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div className='bg-gray-100'>
      <div className="p-3 h-auto pb-60 max-w-6xl mx-auto pt-28">
        <h1 className="text-3xl font-bold mb-8">  {t('reports.title')}</h1>
        {/* <p className="text-lg mb-8">On this page you can view and download all the reports of our company</p> */}
        {isAdminUser(currentUser) && (
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-4 bg-white rounded-2xl p-4">
            <input type="file" onChange={handleFileChange} className="ml-10" />
            <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder={t('reports.reportName')} className="mr-2 p-2 pl-4 bg-gray-100 rounded-md" />
            <button onClick={uploadFile} className="px-4 py-2 bg-purple text-white rounded hover:bg-purple transition duration-300">{t('reports.publishReport')}</button>
          </div>
        )}

        <div className="space-y-8 sm:space-y-4 bg-white rounded-2xl p-4 px-6">
          {files.map((file) => (
            <div key={file.id} className="flex flex-col md:flex-row items-center justify-between space-y-1 sm:space-y-0">
              <span className="text-lg">{file.customName}</span>
              <span className="text-sm text-gray-600">{file.displayDate}</span>
              <div className="space-x-2">
                <a href={file.url} download={file.customName} className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-purple hover:text-white transition duration-300">{t('reports.download')}</a>
                {isAdminUser(currentUser) && (
                  <button onClick={() => deleteFile(file.id, `reports/${file.name}`)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300">{t('reports.delete')}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default ReportsPage;
