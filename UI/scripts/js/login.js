const login = document.getElementById('login-form');

login.addEventListener('submit', loginfunc);

function loginfunc(e) {
    e.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let auth = btoa(`${username}:${password}`);
    let reqInit = {
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json",
            "Authorization": `Basic ${auth}`
        }
    };

    let request = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/auth/login', reqInit);


    fetch(request)
        .then(req => req.json())
        .then(res => {
            if (res.Token) {
                localStorage.setItem('token', res.Token);
                window.location.href = './UI/pages/user/menu.html'
            } else {
                let login_alert = document.getElementById('login-alert');
                login_alert.innerHTML = res.message;
                login_alert.className = 'red-alert';
            }
        })
        .catch(err => console.log(err));
}