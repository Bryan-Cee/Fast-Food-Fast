import { clearOrderDetails, clearUserDetails } from "./modules/getdetails.js";
var logout = document.getElementById("log-out");

logout.addEventListener('click', logmeout);

function logmeout() {
    //remove token
    clearOrderDetails();
    clearUserDetails();
    localStorage.removeItem('token');
    window.location.href = "../../home.html";
}