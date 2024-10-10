import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDn46Phac3QqKVP0icZAfZUPtmtkKO45Tk',
  authDomain: 'life-shift.firebaseapp.com',
  projectId: 'life-shift',
  storageBucket: 'life-shift.appspot.com',
  messagingSenderId: '582487592474',
  appId: '1:582487592474:web:ad8aa6e39e48d72d838ba3',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
