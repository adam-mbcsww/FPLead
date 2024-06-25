import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

$(() => {
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
 
  const collectionRef = db.collection('leaderboards');
  
  collectionRef.get().then(querySnapshot => {
    querySnapshot.docs.forEach(doc => {
      doc.ref.update({ timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    });
  });

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
      const timestamp = serverTimestamp().toDate();
      const formattedTimestamp = timestamp.toLocaleString(); // or use a library like moment.js for formatting
      usrArr.push([user.name, user.score, user.time, formattedTimestamp]);
    });

    new DataTable("#table", {
      data: usrArr,
    });
  });
});