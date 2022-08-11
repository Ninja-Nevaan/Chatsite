var firebaseConfig = {
      apiKey: "AIzaSyDyhkK1yXobDLMppQC4bKW2RZXnJNm5nXY",
  authDomain: "chatsite-d0c5e.firebaseapp.com",
  databaseURL: "https://chatsite-d0c5e-default-rtdb.firebaseio.com",
  projectId: "chatsite-d0c5e",
  storageBucket: "chatsite-d0c5e.appspot.com",
  messagingSenderId: "419049420681",
  appId: "1:419049420681:web:f9fba1a0d5e2ba707b1358"
    };
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("Username");
document.getElementById("userName").innerHTML = "Welcome, " + userName;

function addRoom() {
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "Adding Room Name"
      })
      localStorage.setItem("Room Name", roomName);
      window.location = "chat.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room Name: " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}

getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("Room Name", name);
      window.location="chat.html";
}

function logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("Room Name")
      window.location = "login.html";
}