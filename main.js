import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  updateDoc,
  query,
  where,
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

  const getUsers = async (db) => {
    const userCol = collection(db, "leaderboards");
    const startDate = new Date("2024-06-25T00:00:00.000Z"); // DAILY adjust this to the desired date
    const q = query(userCol, where("timestamp", ">=", startDate));
    const userSnapshot = await getDocs(q);
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
      let formattedTimestamp = "";
      if (user.timestamp) {
        const timestamp = user.timestamp.toDate();
        formattedTimestamp = timestamp.toLocaleString();
      }
      usrArr.push([user.name, user.score, user.time, formattedTimestamp]);
    });

    new DataTable("#table", {
      data: usrArr,
    });
  });
});