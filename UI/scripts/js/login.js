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

    let request = new Request('http://localhost:5000/api/v2/auth/login', reqInit);

    fetch(request)
        .then(req => req.json())
        .then(res => {
            if (res.Token) {
                localStorage.setItem('token', res.Token);
                window.location.href = './UI/pages/user/order.html'
            } else {
                let login_alert = document.getElementById('login-alert');
                login_alert.innerHTML = res.message;
                login_alert.className = 'red-alert';
            }
        });
}