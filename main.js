import { initializeApp } from './node_modules/firebase/app';
import { getFirestore, addDoc, getDocs, collection } from 'firebase/firestore';

// Initialize Firebase
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

  const getUsers = async (db) => {
    const userCol = collection(db, "leaderboards");
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList;
  };

  const users_data = getUsers(db);
  users_data.then((users) => {
    const usrObj = {
      data: [],
    };
    usrObj.data = users;

    const usrArr = [];

    usrObj.data.forEach((user) => {
      usrArr.push([user.name, user.score, user.time, user.timestamp.toDate().toLocaleString()]);
    });
    new DataTable("#table", {
      data: usrArr,
    });
  }); 
