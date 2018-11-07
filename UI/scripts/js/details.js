import { getSpecOrder } from "./modules/specorder.js";
import { getSpecUser } from "./modules/specuser.js";
import { process, makeAdmin } from "./modules/getdetails.js";

const spec_list = document.getElementById("spec-list");
const getUser = document.getElementById("userForm");
const getOrder = document.getElementById("orderForm");
getOrder.addEventListener("submit", getSpecOrder);
getUser.addEventListener("submit", getSpecUser);

let createNode = element => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);

(function list() {

    if (localStorage.getItem("user") == "true") {
        let li = createNode("li");
        li.className = "l-group-item mt-1";

        let img = createNode("img");
        img.src = "../../img/burger.jpg";

        let first_div = createNode("div");
        first_div.className = "text-black";

        let usernamep = createNode("p");
        usernamep.className = "text-large";
        usernamep.innerHTML = localStorage.getItem("username");

        let emailp = createNode("p");
        emailp.className = "li-text";
        emailp.innerHTML = localStorage.getItem("email");

        let useridp = createNode("p");
        useridp.className = "li-text";
        useridp.innerHTML = `User ID: ${localStorage.getItem("userid")}`;

        let isAdmin = createNode("p");
        isAdmin.className = "li-text";
        isAdmin.innerHTML = `Is Admin: ${localStorage.getItem("admin")}`;

        let second_div = createNode("p");
        second_div.className = "ml-5p mid-position";
        second_div.id = "button-input"

        let form = createNode("form");

        let makeAdminbtn = createNode("button");

        append(spec_list, li);
        append(li, img);
        append(li, first_div);
        append(first_div, usernamep);
        append(first_div, emailp);
        append(first_div, useridp);
        append(first_div, isAdmin);
        append(li, second_div);
        append(second_div, form);

        if (localStorage.getItem("admin") == "true") {
            makeAdminbtn.className = "btn btn-red";
            makeAdminbtn.innerHTML = "Demote";
            makeAdminbtn.onclick = () => {
                makeAdmin("False", localStorage.getItem("userid"));
            };
            append(second_div, makeAdminbtn);
        } else {
            makeAdminbtn.className = "btn btn-green";
            makeAdminbtn.innerHTML = "Make Admin";
            console.log(localStorage.getItem("userid"));
            makeAdminbtn.onclick = () => {
                makeAdmin("True", localStorage.getItem("userid"));
            };
            append(second_div, makeAdminbtn);
        }
    } else if (localStorage.getItem('order') == 'true') {

        console.log("console.log");
        let li = createNode("li");
        li.className = "mt-1 l-group-item text-dark";

        // img
        let img = createNode("img");
        img.src = localStorage.getItem("pic");
        img.alt = `A pic of ${localStorage.getItem("pic")}`;

        // first-div
        let first_div = createNode("div");
        first_div.className = "mr-1 mt-1";

        // mealname-p
        let mealnamep = createNode("p");
        mealnamep.className = "li-text";
        mealnamep.innerHTML = localStorage.getItem("mealname");

        // quantity div
        let mealquantityp = createNode("p");
        mealquantityp.className = "li-text";
        mealquantityp.innerHTML = `Quantity: ${localStorage.getItem("quantity")}`;

        // meal-total
        let mealtotalp = createNode("p");
        mealtotalp.className = "li-text";
        mealtotalp.innerHTML = `Total: ${localStorage.getItem("total")}`;

        // timeof oder
        let mealtimep = createNode("p");
        mealtimep.className = "li-text";
        mealtimep.innerHTML = localStorage.getItem("time");

        // second-div
        let second_div = createNode("div");
        second_div.className = "mt-1";

        //meal status label
        let labelmealstatus = createNode("label");
        labelmealstatus.innerHTML = "Order status: ";

        // meal status
        let mealstatusp = createNode("input");
        mealstatusp.className = "li-text";
        mealstatusp.value = `${localStorage.getItem("orderstatus")}`;
        mealstatusp.style.fontSize = "large";
        mealstatusp.style.border = "none";
        mealstatusp.style.padding = "0px";
        mealstatusp.readOnly = "True";
        mealstatusp.style.backgroundColor = "rgba(255, 255, 255, 0)";

        //user id
        let useridp = createNode("p");
        useridp.className = "li-text";
        useridp.innerHTML = `User ID: ${localStorage.getItem("userid")}`;

        //order id label
        let labelorderid = createNode("label");
        labelorderid.innerHTML = "Order Id: ";

        //order id
        let orderidp = createNode("input");
        orderidp.className = "li-text";
        orderidp.value = `${localStorage.getItem("orderid")}`;
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
            process(this, "processing", localStorage.getItem("orderid"));
        };
        acceptbtn.innerHTML = "Accept &checkmark;";

        //reject button
        let rejectbtn = createNode("button");
        rejectbtn.className = "btn btn-red";
        rejectbtn.innerHTML = "Cancel &Chi;";
        rejectbtn.onclick = function () {
            process(this, "cancelled", localStorage.getItem("orderid"));
        };

        //complete button
        let completebtn = createNode("button");
        completebtn.className = "btn btn-green";
        completebtn.innerHTML = "Complete";
        completebtn.onclick = function () {
            process(this, "complete", localStorage.getItem("orderid"));
        };

        let newline = createNode("br");
        append(spec_list, li);
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

        if (localStorage.getItem("orderstatus") == "new") {
            append(third_div, acceptbtn);
            append(third_div, rejectbtn);
        } else if (localStorage.getItem("orderstatus") == "processing") {
            mealstatusp.style.color = "blue";
            append(third_div, completebtn);
        } else if (localStorage.getItem("orderstatus") == "complete") {
            mealstatusp.style.color = "green";
        } else {
            mealstatusp.style.color = "red";
        }
    } else {
        let message = createNode("p");
        message.className = "message text-black";
        message.innerHTML = localStorage.getItem("message");
        append(spec_list, message);
    }
})();