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
console.log("Script is running...");
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

  function convertTimeFormat(timeString) {
    const parts = timeString.split(' ');
    const day = parseInt(parts[0].replace('d', ''));
    const month = parseInt(parts[1].replace('m', '')) - 1; // months are 0-based in JS
    const hours = parseInt(parts[2].replace('hrs', ''));
    const minutes = parseInt(parts[3].replace('mins', ''));
  
    const date = new Date(2024, month, day, hours, minutes, 0, 0); // assuming the year is 2024
    return date.toISOString();
  }
    
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
      const timestamp = user.timestamp;
      const isoString = convertTimeFormat(timestamp);
      usrArr.push([user.name, user.score, user.time, isoString]);
    });

 

    new DataTable("#table", {
      data: usrArr,
    });
  }).catch((error) => {
    console.error("Error:", error);
  });
}); 