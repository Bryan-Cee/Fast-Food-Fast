let alertbox = document.getElementById("alert")
let alertmessage = document.getElementById("alertmessage")

function CheckAdmin() {
    let reqInit = {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
        })
    };

    let req = new Request("https://immense-ocean-82555.herokuapp.com/api/v2/orders/", reqInit);

    fetch(req)
        .then(res => res.json())
        .then(json => {
            if (json.status == "failed") {
                alertbox.style.display = "block";
                alertbox.previousElementSibling.style.display = "block"
                alertmessage.innerHTML = json.message;
                console.log("this page loaded")
            }
        })
}



function ok() {
    alertbox.style.display = "none";
    alertbox.previousElementSibling.style.display = "none"
    window.location.href = "../user/menu.html"
}