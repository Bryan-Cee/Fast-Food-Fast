import { clearOrderDetails, clearUserDetails } from "./modules/getdetails.js";
var logout = document.getElementById("log-out");

logout.addEventListener('click', logmeout);

function logmeout() {
    //remove token
    clearOrderDetails();
    clearUserDetails();
    localStorage.removeItem('token');
    localStorage.removeItem("notadmin")
    window.location.href = "../../home.html";
}