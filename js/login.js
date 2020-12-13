var email = sessionStorage.getItem("mail"); 
var password = sessionStorage.getItem("password");
if (email == null || email == "" ){
window.location.href= "login.html";
}