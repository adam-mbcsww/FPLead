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

  //// Refresh DAILY ////
  const getUsers = async (db) => {
    const userCol = collection(db, "leaderboards");
    const startDate = new Date("2024-06-25T00:00:00.000Z"); // DAILY adjust this to the desired date
    const q = query(userCol, where("timestamp", ">=", startDate));
    const userSnapshot = await getDocs(q);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    return userList;
  };

  //// Refresh WEEKLY ////
  // const getUsers = async (db) => {
  //   const userCol = collection(db, "leaderboards");
  //   const startDate = new Date("2024-06-16T00:00:00.000Z"); // get current date
  //   startDate.setDate(startDate.getDate() - startDate.getDay()); // set to first day of the week
  //   const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // set to last day of the week
  //   const q = query(userCol, where("timestamp", ">=", startDate), where("timestamp", "<", endDate));
  //   const userSnapshot = await getDocs(q);
  //   const userList = userSnapshot.docs.map((doc) => doc.data());
  //   return userList;
  // };

  const users_data = getUsers(db);
  users_data.then((users) => {
    const usrObj = {
      data: [],
    };
    usrObj.data = users;

    const usrArr = [];

    usrObj.data.forEach((user) => { 
      usrArr.push([user.name, user.score, user.time, user.created]);
    });

    $(document).ready(function () {
      $("#table").DataTable({
        data: usrArr,
        columns: [
          { title: "Name" },
          { title: "Score" },
          { title: "Time" },
          { title: "Created" },
        ],
        order: [[1, "desc"]], // sort by score in descending order
      });
    });
  });
});