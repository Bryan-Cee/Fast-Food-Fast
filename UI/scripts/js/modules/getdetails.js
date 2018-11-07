function makeAdmin(admin, userid) {
    let adminInit = {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
        }),
        body: JSON.stringify({
            admin
        })
    };

    const adminReq = new Request(`http://localhost:5000/api/v2/users/${userid}`, adminInit);

    fetch(adminReq)
        .then(res => res.json())
        .then(json => {
            Alert(json.message);
            clearUserDetails();
        })
        .catch(err => console.log(err));
}


function clearOrderDetails() {
    let titles = [
        "mealname",
        "mealdesc",
        "mealprice",
        "orderstatus",
        "time",
        "userid",
        "orderid",
        "pic",
        "total",
        "quantity",
        "order"
    ];
    titles.map(title => {
        localStorage.removeItem(title);
    });
}

function clearUserDetails() {
    let titles = ["admin", "email", "username", "userid", "user"];
    titles.map(title => {
        localStorage.removeItem(title);
    });
}

function process(e, status, id) {
    let order_id = id;
    let acceptInit = {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
        }),
        body: JSON.stringify({
            status: status
        })
    };

    let acceptReq = new Request(`http://localhost:5000/api/v2/orders/${order_id}`, acceptInit);
    fetch(acceptReq)
        .then(res => res.json())
        .then(json => {
            Alert(json.message)
            clearOrderDetails();
        })
        .catch(err => console.log(err));
}

let alertbox = document.getElementById("alert")
let alertmessage = document.getElementById("alertmessage")
let alertOk = document.getElementById('ok')

function Alert(message) {
    alertbox.style.display = "block";
    alertbox.previousElementSibling.style.display = "block"
    alertmessage.innerHTML = message;
    alertOk.onclick = (e) => {
        e.target.parentNode.parentNode.style.display = 'none';
        window.location.reload();
    }
}

export {
    process,
    makeAdmin,
    clearOrderDetails,
    clearUserDetails,
    Alert
}