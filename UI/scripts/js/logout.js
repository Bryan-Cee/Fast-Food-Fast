var logout = document.getElementById("log-out");

logout.addEventListener('click', logmeout);

function logmeout() {
    //remove token
    localStorage.removeItem('token');
    window.location.href = "../../home.html";
}