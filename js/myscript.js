function myFunction() {
sessionStorage.setItem("department", "");
sessionStorage.setItem("category", "");
sessionStorage.setItem("name", "");
sessionStorage.setItem("mail", "");
            }
function enter(){
var input = document.getElementById("submit");
input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
event.preventDefault();
document.getElementById("submit").click();
              }
            });}
