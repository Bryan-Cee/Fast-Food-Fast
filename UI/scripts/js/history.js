const history_list = document.getElementById('food-list');

let reqInit = {
    method: 'GET',
    headers: {
        "x-access-token": localStorage.getItem("token")
    }
};

let request = new Request("https://immense-ocean-82555.herokuapp.com/api/v2/users/orders", reqInit);

let createNode = (element) => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);

fetch(request)
    .then(res => res.json())
    .then(json => {
        console.log(json.history)
        if (json.history) {
            let order_history = json.history

            order_history.map((meal) => {
                // li
                let li = createNode('li');
                li.className = "l-group-item mt-1";

                // img
                let img = createNode('img');
                img.src = meal.pic;
                img.alt = `A pic of ${meal.meal_name}`

                // first-div
                let first_div = createNode('div');
                first_div.className = "l-item-text mt-1";

                // mealname-p
                let mealnamep = createNode('p');
                mealnamep.className = "li-text";
                mealnamep.innerHTML = meal.meal_name;

                // mealdesc-p
                let mealdescp = createNode('p');
                mealdescp.className = "li-text";
                mealdescp.innerHTML = meal.meal_desc;

                // timeof oder
                let mealtimep = createNode('p');
                mealtimep.className = "li-text";
                mealtimep.innerHTML = meal.time_of_order;

                // second-div
                let second_div = createNode('div');
                second_div.className = "mt-1";

                // quantity div
                let mealquantityp = createNode('p');
                mealquantityp.className = "li-text";
                mealquantityp.innerHTML = `Quantity: ${meal.quantity}`;

                // meal-total
                let mealtotalp = createNode('p');
                mealtotalp.className = "li-text";
                mealtotalp.innerHTML = `Total: ${meal.total}`;

                // meal status
                let mealstatusp = createNode('p');
                mealstatusp.className = "li-text";
                mealstatusp.innerHTML = `Order status: ${meal.order_status}`;

                append(history_list, li);
                append(li, img);
                append(li, first_div);
                append(first_div, mealnamep);
                append(first_div, mealdescp);
                append(first_div, mealtimep);
                append(li, second_div);
                append(second_div, mealquantityp);
                append(second_div, mealtotalp);
                append(second_div, mealstatusp);
            })
        } else {
            console.log(json.message);
            let response = createNode('div');
            response.className = 'message';
            response.innerHTML = json.message;

            append(history_list, response);
        }
    })
    .catch(err => console.log(err))