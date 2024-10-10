import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB5HO9zm0x16NpMrQb0Ii-HzjzQxR8QNeg',
  authDomain: 'householdapp-c933c.firebaseapp.com',
  projectId: 'householdapp-c933c',
  storageBucket: 'householdapp-c933c.appspot.com',
  messagingSenderId: '713019564887',
  appId: '1:713019564887:web:dd8774f3230d1bad75d412',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
