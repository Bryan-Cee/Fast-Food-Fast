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

    // let request = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/auth/login', reqInit);
    let request = new Request('http://localhost:5000/api/v2/auth/login', reqInit);


    fetch(request)
        .then(req => req.json())
        .then(res => {
            if (res.Token) {
                localStorage.setItem('token', res.Token);
                let myInit = {
                    'method': 'GET',
                    'headers': {
                        "x-access-token": localStorage.getItem('token')
                    }
                };

                // let reqdata = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/orders/', myInit);
                let reqdata = new Request('http://localhost:5000/api/v2/orders/', myInit);
                fetch(reqdata)
                    .then(res => res.json())
                    .then(json => {
                        if (json.status == 'failed') {
                            window.location.href = './UI/pages/user/menu.html'
                        } else {
                            window.location.href = './UI/pages/admin/orders.html'
                        }
                    })

            } else {
                let login_alert = document.getElementById('login-alert');
                login_alert.innerHTML = res.message;
                login_alert.className = 'red-alert';
            }
        })
        .catch(err => console.log(err));
}