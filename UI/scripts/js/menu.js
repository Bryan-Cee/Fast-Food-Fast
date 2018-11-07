const meal_list = document.getElementById('food-list');

let reqHeader = new Headers({
    'x-access-token': localStorage.getItem('token')
});

let reqInit = {
    'method': 'GET',
    'headers': reqHeader
};

let request = new Request('http://localhost:5000/api/v2/menu', reqInit);


let createNode = (element) => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);

fetch(request)
    .then(res => res.json())
    .then(json => {
        if (json.menu) {
            meals = json.menu

            meals.map((meal) => {
                // li
                let li = createNode('li');
                li.className = 'l-group-item'

                // img
                let img = createNode('img');
                img.src = meal.pic;
                img.alt = `A picture of ${meal.meal_name}`

                // div-main
                let first_div = createNode('div');
                first_div.className = "w-50 menu-item";

                // P's
                let mname = createNode('p');
                mname.className = 'li-text';
                mname.innerHTML = meal.meal_name;

                let mdesc = createNode('p');
                mdesc.innerHTML = meal.meal_desc;

                let mprice = createNode('p');
                mprice.className = 'li-text';
                mprice.innerHTML = meal.meal_price;

                // second_div
                let second_div = createNode('div');
                second_div.classList.add('mid-position', 'ml-5p');
                second_div.id = "button-input"

                // input
                let mid = createNode('input');
                mid.value = meal.meal_id;
                mid.hidden = 'True';

                // button
                let order_now = createNode('button');
                order_now.className = 'btn btn-red';
                order_now.innerHTML = 'Order now';
                order_now.onclick = function () {
                    ordermeal(this);
                };

                append(meal_list, li);
                append(li, img);
                append(li, first_div);
                append(first_div, mname);
                append(first_div, mdesc);
                append(first_div, mprice);
                append(li, second_div);
                append(second_div, mid);
                append(second_div, order_now);


            });
        } else {
            if (json.message == "Please login") {
                window.location.href = "../../../home.html";
            }
            
            append(meal_list, response);
        }

    })
    .catch(err => console.log(err));