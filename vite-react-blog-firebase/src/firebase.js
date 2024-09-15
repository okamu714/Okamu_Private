import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAl14bTd6PkOgOWH0g5V3FpcyEfaYU5p2E',
  authDomain: 'react-blog-98c5a.firebaseapp.com',
  projectId: 'react-blog-98c5a',
  storageBucket: 'react-blog-98c5a.appspot.com',
  messagingSenderId: '914330357424',
  appId: '1:914330357424:web:1641957a7dc1f9868bb575',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
