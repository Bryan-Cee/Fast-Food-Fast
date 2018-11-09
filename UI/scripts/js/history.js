import {
    Alert
} from "./modules/getdetails.js";
const history_list = document.getElementById('food-list');
let page = document.getElementById("pagination");
let reqInit = {
    method: 'GET',
    headers: {
        "x-access-token": localStorage.getItem("token")
    }
};

let request = new Request("https://immense-ocean-82555.herokuapp.com/api/v2/users/orders", reqInit);

let createNode = (element) => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);
let items = 7;

fetch(request)
    .then(res => res.json())
    .then(json => {
        if (json.history) {
            console.log(json.history);

            let order_history = json.history
            let pages = order_history.length / items;
            showpage(order_history, 1)
            for (let index = 0; index < pages; index++) {
                let page_num = createNode('li')
                let active = 'btn btn-green';
                let button = 'btn btn-red'
                page_num.innerHTML = index + 1;
                page_num.onclick = function (e) {
                    showpage(order_history, e.target.innerHTML)
                    for (let l = 1; l <= Math.ceil(pages); l++) {
                        document.getElementById(l).classList.remove('btn-green')
                        document.getElementById(l).className = button
                    }
                    page_num.className = active
                }
                page_num.style.display = 'inline';
                if (page_num.innerHTML == 1) {
                    page_num.className = active
                } else {
                    page_num.className = button;
                }
                page_num.id = index + 1;
                page_num.style.marginRight = "4px";
                append(page, page_num)
            }
        } else {
            if (json.message == "Please login") {
                Alert(json.message)
                window.location.href = '../../../home.html'
            }
            let messageAlert = createNode('div');
            messageAlert.className = "message";
            messageAlert.innerHTML = json.message;
            append(history_list, messageAlert)
        }
    })
    .catch(err => console.log(err))

function showpage(list, number) {
    let min = (number * items) - items;
    let max = (number * items) - 1;

    let the_list = list.slice(min, max)
    history_list.innerHTML = "";
    render(the_list)
}

function render(list) {
    list.map((meal) => {
        // li
        let li = createNode('li');
        li.className = "l-group-item";

        // img
        let img = createNode('img');
        img.src = meal.pic;
        img.alt = `A pic of ${meal.meal_name}`

        // first-div
        let first_div = createNode('div');
        first_div.className = "l-item-text mt-1 menu-item";

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
}