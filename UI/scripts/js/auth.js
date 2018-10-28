let alertbox = document.getElementById("alert")
let alertmessage = document.getElementById("alertmessage")
let alertOk = document.getElementById('ok');

(function CheckAdmin() {

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
            if (json.status == 'failed') {
                console.log(json.message)
                alertbox.style.display = "block";
                alertbox.previousElementSibling.style.display = "block"
                alertmessage.innerHTML = json.message;
                alertOk.onclick = () => {
                    if (json.status == 'failed') {
                        window.location.href = '../user/menu.html';
                    } else {
                        window.location.reload();
                    }
                }
            }
        })
    .catch(err => console.log(err))
})();
