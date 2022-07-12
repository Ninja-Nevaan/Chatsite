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
roomName = localStorage.getItem("Room Name");

function send() {
    msg = document.getElementById("message").value;
    firebase.database().ref(roomName).push({
        Name: userName,
        Message: msg,
        Like: 0
    });
    document.getElementById("message").value = "";
}

function getData(){
    firebase.database().ref("/"+roomName).on('value', function(snapshot){
        document.getElementById("output").innerHTML="";
        snapshot.forEach(function(childSnapshot){
            childKey=childSnapshot.key;
            childData=childSnapshot.val()
            if(childKey!="purpose"){
                firebaseMessageId=childKey;
                messageData=childData;
                console.log(firebaseMessageId);
                console.log(messageData);
                name=messageData['Name'];
                message=messageData['Message'];
                like=messageData['Like'];
                nameTag="<h4>"+name+"<img class='user_tick' src='Checkmark.png'> </h4>";
                messageTag="<h4 class='message_h4'>"+message+"</h4>";
                likeButton="<button class='btn btn-success' id="+firebaseMessageId+" value="+like+" onclick='updateLikes(this.id)'>";
                spanTag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
                row=nameTag+messageTag+likeButton+spanTag;
                document.getElementById("output").innerHTML+=row;
            }
        })
    })
}

getData()o

function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Room Name");
    window.location = "login.html";
}
