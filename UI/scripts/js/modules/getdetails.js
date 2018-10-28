function makeAdmin(admin, userid) {
    console.log(admin);
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

    const adminReq = new Request(`https://immense-ocean-82555.herokuapp.com/api/v2/users/${userid}`, adminInit);

    fetch(adminReq)
        .then(res => res.json())
        .then(json => {
            alert(json.message);
            clearUserDetails();
            window.location.reload();
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

    let acceptReq = new Request(`https://immense-ocean-82555.herokuapp.com/api/v2/orders/${order_id}`, acceptInit);
    fetch(acceptReq)
        .then(res => res.json())
        .then(json => {
            alert(json.message);
            clearOrderDetails();
            window.location.reload();
        })
        .catch(err => console.log(err));
}

export { process, makeAdmin, clearOrderDetails, clearUserDetails }