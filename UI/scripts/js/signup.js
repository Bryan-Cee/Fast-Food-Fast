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

    // const request = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/auth/signup', reqInit);
    const request = new Request('http://localhost:5000/api/v2/auth/signup', reqInit);

    fetch(request)
        .then(res => res.json())
        .then(json => {
            if (json.status == 'success') {
                create_accnt.reset();
                alert(json.message)
                window.location.href = '../../../home.html'
                return false;
            }

            let name_msg = document.getElementById('name_msg');
            let name_err = "Enter only alphabetic characters for your username"
            let email_msg = document.getElementById('email_msg');
            let email_err = "Enter the correct format of the email e.g.johndoe@mail.com"
            let password_msg = document.getElementById('password_msg');
            let password_err = "Enter a password longer than 6 characters"
            let pwd = document.getElementById('password');

            if (json.message == name_err) {
                name_msg.innerHTML = name_err;
                name_msg.className = "red-alert"
                pwd.value = ''
            } else if (json.message == email_err) {
                email_msg.innerHTML = email_err;
                email_msg.className = "red-alert"
                pwd.value = ''
            } else if (json.message == password_err) {
                password_msg.innerHTML = password_err;
                password_msg.className = "red-alert"               
                pwd.value = ''
            } else {
                alert(json.message)
                create_accnt.reset();
                return false;
            }
        })
        .catch(err => console.log(err))    
}