import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
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
    const userSnapshot = await getDocs(userCol, {
      orderBy: "score", // order by score in descending order
      limit: 50 // limit to 50 documents
    });
    const userList = userSnapshot.docs.map((doc) => {
      const timestamp = doc.data().timestamp;
      const isoString = convertTimeFormat(timestamp);
      return {...doc.data(), timestamp: isoString };
    });
    
    // Filter results to show only records from a certain date
    const cutoffDate = new Date('2024-06-24T00:00:00.000Z'); // adjust this date as needed
    const filteredList = userList.filter((user) => {
      const userDate = new Date(user.timestamp);
      return userDate >= cutoffDate;
    });
    
    return filteredList;
  }; 

  const users_data = getUsers(db);
  users_data.then((users) => {
    const usrObj = {
      data: [],
    };
    usrObj.data = users.slice(0, 200); // limit the array to the first 50 elements
  
    const usrArr = [];
  
    usrObj.data.forEach((user) => {
      usrArr.push([user.name, user.score, user.time, user.timestamp]);
    });
    
    $(document).ready(function() {
      const table = $('#table').DataTable({
        data: usrArr,
        columns: [
          { title: "Name" },
          { title: "Score" },
          { title: "Time" },
          { title: "Created" }
        ],
        order: [[1, 'desc']] // sort by score in descending order
      }); 
    }); 
    
  });
    
});