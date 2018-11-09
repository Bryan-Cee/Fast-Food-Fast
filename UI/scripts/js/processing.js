import {
    process
} from "./modules/getdetails.js";

let order_list = document.getElementById("food-list");
let page = document.getElementById("pagination");

let reqInit = {
    method: "GET",
    headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
    })
};

let req = new Request("https://immense-ocean-82555.herokuapp.com/api/v2/orders/", reqInit);

let createNode = element => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);
let items = 7;
fetch(req)
    .then(res => res.json())
    .then(json => {
        if (json.Orders) {
            let orders = json.Orders;
            let pages = orders.length / items;
            showpage(orders, 1)
            for (let index = 0; index < pages; index++) {
                let page_num = createNode('li')
                let active = 'btn btn-green';
                let button ='btn btn-red'
                page_num.innerHTML = index + 1;
                page_num.onclick = function (e) {
                    showpage(orders, e.target.innerHTML)
                    for(let l = 1; l <= Math.ceil(pages); l++){
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
            // order_list.append()
        } else {
            let messageAlert = createNode('div');
            messageAlert.className = "message";
            messageAlert.innerHTML = json.message;
            append(order_list, messageAlert)
        }
    })
    .catch(err => console.log(err))


function showpage(list, number) {
    let min = (number * items) - items;
    let max = (number * items) - 1;

    let the_list = list.slice(min, max)
    order_list.innerHTML = "";
    render(the_list)
}

function render(list) {
    list.map(meal => {
        // order_list.innerHTML = "";
        // li
        let li = createNode("li");
        li.className = "l-group-item";

        // img
        let img = createNode("img");
        img.src = meal.pic;
        img.alt = `A pic of ${meal.meal_name}`;

        // first-div
        let first_div = createNode("div");
        first_div.className = "mr-1 mt-1 menu-item";

        // mealname-p
        let mealnamep = createNode("p");
        mealnamep.className = "li-text";
        mealnamep.innerHTML = meal.meal_name;

        // quantity div
        let mealquantityp = createNode("p");
        mealquantityp.className = "li-text";
        mealquantityp.innerHTML = `Quantity: ${meal.quantity}`;

        // meal-total
        let mealtotalp = createNode("p");
        mealtotalp.className = "li-text";
        mealtotalp.innerHTML = `Total: ${meal.total}`;

        // timeof oder
        let mealtimep = createNode("p");
        mealtimep.className = "li-text";
        mealtimep.innerHTML = meal.time_of_order;

        // second-div
        let second_div = createNode("div");
        second_div.className = "mt-1";

        //meal status label
        let labelmealstatus = createNode("label");
        labelmealstatus.innerHTML = "Order status: ";

        // meal status
        let mealstatusp = createNode("input");
        mealstatusp.className = "li-text";
        mealstatusp.value = `${meal.order_status}`;
        mealstatusp.style.fontSize = "large";
        mealstatusp.style.border = "none";
        mealstatusp.style.padding = "0px";
        mealstatusp.readOnly = "True";
        mealstatusp.style.backgroundColor = "rgba(255, 255, 255, 0)";

        //user id
        let useridp = createNode("p");
        useridp.className = "li-text";
        useridp.innerHTML = `User ID: ${meal.user_id}`;

        //order id label
        let labelorderid = createNode("label");
        labelorderid.innerHTML = "Order Id: ";

        //order id
        let orderidp = createNode("input");
        orderidp.className = "li-text";
        orderidp.value = `${meal.order_id}`;
        orderidp.style.border = "none";
        orderidp.style.backgroundColor = "rgba(255, 255, 255, 0)";
        orderidp.readOnly = "True";

        //third div
        let third_div = createNode("div");
        third_div.id = "button-input"

        //accept button
        let acceptbtn = createNode("button");
        acceptbtn.className = "btn btn-green mr-1";
        acceptbtn.onclick = function () {
            process(this, "processing", meal.order_id);
        };
        acceptbtn.innerHTML = "Accept &checkmark;";

        //reject button
        let rejectbtn = createNode("button");
        rejectbtn.className = "btn btn-red";
        rejectbtn.innerHTML = "Cancel &Chi;";
        rejectbtn.onclick = function () {
            process(this, "cancelled", meal.order_id);
        };

        //complete button
        let completebtn = createNode("button");
        completebtn.className = "btn btn-green";
        completebtn.innerHTML = "Complete";
        completebtn.onclick = function () {
            process(this, "complete", meal.order_id);
        };

        let newline = createNode("br");
        append(order_list, li);
        append(li, img);
        append(li, first_div);
        append(first_div, mealnamep);
        append(first_div, mealquantityp);
        append(first_div, mealtotalp);
        append(first_div, mealtimep);
        append(li, second_div);
        append(second_div, useridp);
        append(second_div, labelorderid);
        append(second_div, orderidp);
        append(second_div, newline);
        append(second_div, labelmealstatus);
        append(second_div, mealstatusp);
        append(second_div, third_div);

        if (meal.order_status == "new") {
            append(third_div, acceptbtn);
            append(third_div, rejectbtn);
        } else if (meal.order_status == "processing") {
            mealstatusp.style.color = "blue";
            append(third_div, completebtn);
        } else if (meal.order_status == "complete") {
            mealstatusp.style.color = "green";
        } else {
            mealstatusp.style.color = "red";
        }
    });
}