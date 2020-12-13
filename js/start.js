// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAu2RaUIww5TWUnuwg1nBWTkuft1IVPn4Y",
    authDomain: "qms-f137a.firebaseapp.com",
    databaseURL: "https://qms-f137a.firebaseio.com",
    projectId: "qms-f137a",
    storageBucket: "qms-f137a.appspot.com",
    messagingSenderId: "1036646415502",
    appId: "1:1036646415502:web:64d51a6d915d68f2569ddf",
    measurementId: "G-F28BV22X15"
  };

  var department = sessionStorage.getItem("department"); 
  var category = sessionStorage.getItem("category");
  var email = sessionStorage.getItem("mail"); 
  var password = sessionStorage.getItem("password");

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db= firebase.firestore();
  
  
  firebase.auth.Auth.Persistence.LOCAL; 

  var result = firebase.auth().signInWithEmailAndPassword(email,password);

      result.catch(function(error){
   var errorCode = error.code; 
   var errorMessage = error.message; 

console.log(errorCode);
console.log(errorMessage);
});


console.log(department);
console.log(category);
document.getElementById("dep-title").textContent= department;
document.getElementById("cat-title").textContent= category;

var docRef = db.collection("queueNumber").doc(department).collection(category).doc("currentTicket");
var docRem = db.collection("services").doc(department).collection(category);
var docRefemp = db.collection("queueNumber").doc(department).collection(category).doc("currentTicket").collection("EmployeecurrentTicket").doc(email);
console.log("email",email);

docRef.onSnapshot(function(doc) {
  rem = (doc.data().totalTickets)-(doc.data().number);
   if ((doc.data().totalTickets) == (doc.data().number))
   {
    document.getElementById("numr").textContent=rem;
   }
   else {
      document.getElementById("numr").textContent=rem;
   }

 });


  docRef.get().then(function(docc) {
      num = docc.data().number;
      docRem.where("ticket_number", "==", num)
       .get()
       .then(function(querySnapshot) {
        querySnapshot.forEach(function(doccc) {
          document.getElementById("numt").textContent= num;
          console.log(doccc.id, " => ", doccc.data());
          
          document.getElementById("name").textContent= doccc.data().name;
          document.getElementById("id").textContent= doccc.data().user_id;
          document.getElementById("dep").textContent= doccc.data().department;
          document.getElementById("load").style.visibility = 'hidden' ;
          document.getElementById("card_con").style.visibility = 'visible' ;
      
               });
  
 });

 });
 



 document.getElementById("get-next").onclick=function(){
    document.getElementById("card_con").style.visibility = 'hidden' ;
  document.getElementById("load").style.visibility = 'visible' ;
 
  docRef.get().then(function(docc) {
      
      num = docc.data().number;
      console.log("num",num);
      if ((docc.data().number) < (docc.data().totalTickets)){
        next = num+1;
        console.log("next",next);
        docRef.update({
            number: next
        });
    
        num = next;
        console.log("num",num);
    }
   
  docRem.where("ticket_number", "==", num)
       .get()
       .then(function(querySnapshot) {
        querySnapshot.forEach(function(doccc) {
          document.getElementById("numt").textContent= num;
          console.log(doccc.id, " => ", doccc.data());
          
          document.getElementById("name").textContent= doccc.data().name;
          document.getElementById("id").textContent= doccc.data().user_id;
          document.getElementById("dep").textContent= doccc.data().department;
          document.getElementById("load").style.visibility = 'hidden' ;
          document.getElementById("card_con").style.visibility = 'visible' ;
          
               });
  
 });

 });
 

docRem.where("ticket_number", "==", num+3)
       .get()
       .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        
        var token= doc.data().user_token;
        var estimateWaitingTime =(parseInt(doc.data().service_time)*3);
        
var to = [token];
var n = doc.data().ticket_number;
var name = doc.data().name;
var f_name = name.split(' ')[0];
document.getElementById("name").textContent = estimateWaitingTime;	
var stringWait = estimateWaitingTime+"";
$.ajax({
type: 'POST',
url: 'https://fcm.googleapis.com/fcm/send', 
headers:{
Authorization: 'key=AAAA8Vzw_I4:APA91bE9CrQjbGj6BKaFXHPyxjwBSm7TtQRhRgQRfgJ6woJE24dAKK_SSpWdPSjvrrE1cezWd825SaUXplvphUPiF0jkM4rwcH3XF7bm9-l4DQVry3LHBBaaB9gohNH3vhxZjTikqF9Y'
},
contentType: 'application/json',
dataType: 'json',
data: JSON.stringify({
"registration_ids":to,
"notification":{
  "title": department+" Ticket",
  "body": (f_name+" Be there after "+stringWait+" mins"),
        "sound": "default"
}
}),
success: function(response){

},
error: function(error){

alert("Some error occurred");
}
});



});
})
.catch(function(error) {
console.log("Error getting documents: ", error);
});	
//location.reload();
};

/////////////////////


        
        



    $("#get-next").click(function(){


});
    

