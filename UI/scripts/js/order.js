const order_meal = document.getElementById('order-popup')

order_meal.addEventListener('submit', order);

function order(e) {
    e.preventDefault();
    
    let reqHeader = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    })
    
    let reqInit = {
        'method': 'POST',
        'headers': reqHeader,
        'body': JSON.stringify({
            meal_id: document.getElementById('meal_id').value,
            quantity: document.getElementById('quantity').value
        })
    }
    
    let request = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/users/orders', reqInit)
    
    fetch(request)
    .then(res => res.json())
    .then(json => {
        if (json.status == 'success') {
            alert(json.message);
            document.getElementById('order-popup').style.display = 'none';
            return false;
        } else if (json.message == 'Token has expired Please login again') {
            alert(json.message);
            window.location.href = '../../../home.html';
        } else {
            alert(json.message);
        }
    })
    
}
