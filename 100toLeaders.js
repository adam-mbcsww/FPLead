import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE9tWytUvjpjQ2k0CsUyIhVXC0Vpr4HxI",
  authDomain: "leaderboard-48dfb.firebaseapp.com",
  projectId: "leaderboard-48dfb",
  storageBucket: "leaderboard-48dfb.appspot.com",
  messagingSenderId: "248440155827",
  appId: "1:248440155827:web:c7ae7daff0da23b4bc4ac6",
  measurementId: "G-0LCDSJMXKE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const leaderboardRef = collection(db, 'leaderboard');

for (let i = 0; i < 100; i++) {
  const data = {
    name: `"${i}"`,
    score: `"1450"`,
    time: `"24"`,
    timedate: serverTimestamp()
  };
  addDoc(leaderboardRef, data);
}