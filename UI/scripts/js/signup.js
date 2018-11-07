let alertbox = document.getElementById("alert")
let alertmessage = document.getElementById("alertmessage")
let alertOk = document.getElementById('ok')

function Success(message) {
    alertbox.style.display = "block";
    alertbox.previousElementSibling.style.display = "block"
    alertmessage.innerHTML = message;
    alertOk.onclick = (e) => {
        e.target.parentNode.parentNode.style.display = 'none';
        window.location.href = "../../../home.html";
    }
}
const create_accnt = document.getElementById('create_account_form')

create_accnt.addEventListener('submit', create_account);

function create_account(e) {
    e.preventDefault();

    reqInit = {
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify({
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    }

    const request = new Request('http://localhost:5000/api/v2/auth/signup', reqInit);

    fetch(request)
        .then(res => res.json())
        .then(json => {
            if (json.status == 'success') {
                create_accnt.reset();
                Success(json.message)
                return false;
            }

            let name_msg = document.getElementById('name_msg');
            let name_err = "Enter only alphabetic characters for your username";

            let email_msg = document.getElementById('email_msg');
            let email_err = "Enter the correct format of the email e.g.johndoe@mail.com";
            let email_conflict_err = "The email has already been registered, use another";

            let password_msg = document.getElementById('password_msg');
            let password_err = "Enter a password longer than 6 characters";
            let password_len_err = "Password must have atleast one lowercase one upper case and one digit";
                
            let pwd = document.getElementById('password');

            if (json.message == name_err) {
                name_msg.innerHTML = name_err;
                name_msg.className = "red-alert"
                pwd.value = ''
            } else if (json.message == email_err || json.message == email_conflict_err) {
                email_msg.innerHTML = json.message;
                email_msg.className = "red-alert"
                pwd.value = ''
            } else if (json.message == password_err || json.message == password_len_err) {
                password_msg.innerHTML = json.message;
                password_msg.className = "red-alert"
                pwd.value = ''
            } else {
                alert(json.message)
                pwd.value = '';
                return false;
            }
        })
        .catch(err => console.log(err))
}