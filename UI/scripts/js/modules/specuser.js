import { clearOrderDetails, clearUserDetails } from "./getdetails.js";
function getSpecUser(e) {
    e.preventDefault();

    let specInit = {
        method: "GET",
        headers: new Headers({
            "x-access-token": localStorage.getItem("token")
        })
    };

    let userId = document.getElementById("user_id").value;

    const userReq = new Request(`https://immense-ocean-82555.herokuapp.com/api/v2/users/${userId}`, specInit);

    fetch(userReq)
        .then(res => res.json())
        .then(json => {
            if (json.user) {
                clearOrderDetails();
                localStorage.setItem("user", "true");
                console.log(json.user);
                let user = json.user;
                let usernameId = user.user_id;
                let username = user.username;
                let email = user.email;
                let admin = user.admin;

                localStorage.setItem("userid", usernameId);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                localStorage.setItem("admin", admin);
                localStorage.removeItem("message");
                window.location.reload();
            } else {
                localStorage.setItem("user", "false");
                console.log(json.message);
                localStorage.setItem("message", json.message);
                clearUserDetails();
                clearOrderDetails();
                window.location.reload();
            }
        })
        .catch(err => console.log(err));
}

export { getSpecUser }