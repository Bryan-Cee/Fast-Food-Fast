import { process } from "./modules/getdetails.js";

let order_list = document.getElementById("food-list");

let reqInit = {
    method: "GET",
    headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
    })
};

// let req = new Request("https://immense-ocean-82555.herokuapp.com/api/v2/orders/", reqInit);
let req = new Request("http://localhost:5000/api/v2/orders/", reqInit);

let createNode = element => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);

fetch(req)
    .then(res => res.json())
    .then(json => {
        if (json.status == "failed") {
            window.location.href = "../user/menu.html";
        }
        if (json.Orders) {
            let orders = json.Orders;

            orders.map(meal => {
                // li
                let li = createNode("li");
                li.className = "l-group-item";

                // img
                let img = createNode("img");
                img.src = meal.pic;
                img.alt = `A pic of ${meal.meal_name}`;

                // first-div
                let first_div = createNode("div");
                first_div.className = "mr-1 mt-1";

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
        } else {
            console.log(json.message)
        }
    })
    .catch(err => console.log(err))
