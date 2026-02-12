import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJK74rJQ_1QYXF4bnJRnuxvXtXoPNfNjQ",
    authDomain: "tokyo-toilet-explorer.firebaseapp.com",
    projectId: "tokyo-toilet-explorer",
    storageBucket: "tokyo-toilet-explorer.appspot.com",
    messagingSenderId: "1021950966308",
    appId: "1:1021950966308:web:62cba3d16152566728f6b1",
    measurementId: "G-3N01B3XGY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, storage, analytics };
