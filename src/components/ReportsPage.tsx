// src/components/ReportsPage.tsx

import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { storage, db } from '../firebase-config'; // Adjust path as necessary
import { isAdminUser } from '../utils/AuthUtils';
import { useAuth } from '../AuthContext';

interface FileMetadata {
  id: string;
  name: string;
  customName: string;
  url: string;
  uploadedDate: string;
}

const ReportsPage: React.FC = () => {

  const { currentUser } = useAuth();

  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState<string>('');

  const fetchFiles = async () => {
    setLoading(true);
    const filesCol = collection(db, 'reports');
    const filesSnapshot = await getDocs(filesCol);
    const filesList = filesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      uploadedDate: new Date(doc.data().uploadedDate.seconds * 1000).toLocaleDateString() // Adjust depending on your date format
    })) as FileMetadata[];
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
      const uploadedDate = new Date();
      await addDoc(collection(db, 'reports'), {
        name: file.name,
        customName: customName || file.name,
        url: url,
        uploadedDate: uploadedDate
      });
      setCustomName('');
      setFile(null);
      fetchFiles(); // Refresh the list after uploading
    }
  };

  const deleteFile = async (fileId: string, storagePath: string) => {
    // Delete from Firestore
    await deleteDoc(doc(db, 'reports', fileId));
    // Delete from Firebase Storage
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);
    fetchFiles(); // Refresh the list after deleting
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='bg-gray-100'>
      <div className="container h-screen max-w-6xl mx-auto pt-28">
        <h1 className="text-3xl font-bold mb-8">Reports</h1>
        {/* <p className="text-lg mb-8">On this page you can view and download all the reports of our company</p> */}
        {isAdminUser(currentUser) && (
          <div className="flex items-center justify-between mb-4 bg-white rounded-2xl p-4 px-6">
            <input type="file" onChange={handleFileChange} className="mr-2" />
            <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Enter a meaningful name" className="mr-2 p-2 pl-4 bg-gray-100 rounded-md" />
            <button onClick={uploadFile} className="px-4 py-2 bg-purple text-white rounded hover:bg-purple transition duration-300">Upload New Report</button>
          </div>
        )}

        <div className="space-y-4 bg-white rounded-2xl p-4 px-6">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between">
              <span className="text-lg">{file.customName}</span>
              <span className="text-sm text-gray-600">{file.uploadedDate}</span>
              <div className="space-x-2">
                <a href={file.url} download={file.customName} className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-purple hover:text-white transition duration-300">Download</a>
                {isAdminUser(currentUser) && (
                  <button onClick={() => deleteFile(file.id, `reports/${file.name}`)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300">Delete</button>
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
