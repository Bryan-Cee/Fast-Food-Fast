function checkadmin() {
    console.log("page loaded");
}

const food_list = document.getElementById("food-list");

let reqHeader = new Headers({
    "x-access-token": localStorage.getItem("token")
});

let reqInit = {
    method: "GET",
    headers: reqHeader
};

let request = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/menu', reqInit);

let createNode = element => document.createElement(element);
let append = (parent, child) => parent.appendChild(child);

fetch(request)
    .then(res => res.json())
    .then(json => {
        meals = json.menu;

        meals.map(meal => {
            // li
            let li = createNode("li");
            li.className = "l-group-item";

            // img
            let img = createNode("img");
            img.src = meal.pic;
            img.alt = `A picture of ${meal.meal_name}`;

            // div-main
            let first_div = createNode("div");
            first_div.className = "w-50";

            // P's
            let mname = createNode("p");
            mname.className = "li-text";
            mname.innerHTML = meal.meal_name;

            let mdesc = createNode("p");
            mdesc.innerHTML = meal.meal_desc;

            let mprice = createNode("p");
            mprice.className = "li-text";
            mprice.innerHTML = meal.meal_price;

            // second_div
            let second_div = createNode("div");
            second_div.classList.add("mid-position", "ml-5p");
            second_div.id = "button-input"

            // input
            let mid = createNode("input");
            mid.value = meal.meal_id;
            mid.hidden = "True";

            // button
            let order_now = createNode("button");
            order_now.className = "btn btn-red";
            order_now.innerHTML = "Remove";
            order_now.onclick = function () {
                deletemeal(this, meal.meal_id);
            };

            append(food_list, li);
            append(li, img);
            append(li, first_div);
            append(first_div, mname);
            append(first_div, mdesc);
            append(first_div, mprice);
            append(li, second_div);
            append(second_div, mid);
            append(second_div, order_now);
        });
        if (json.message == "Please login") {
            window.location.href = "../../../home.html";
        }
    })
    .catch(err => console.log(err));

var addmeal = document.getElementById("addmealpopup");

addmeal.addEventListener("submit", addToMenu);

function addToMenu(e) {
    e.preventDefault();

    let reqInit = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
        }),
        body: JSON.stringify({
            meal_name: document.getElementById("meal_name").value,
            meal_desc: document.getElementById("meal_desc").value,
            meal_price: document.getElementById("meal_price").value,
            pic: document.getElementById("meal_pic").value
        })
    };

    const req = new Request('https://immense-ocean-82555.herokuapp.com/api/v2/menu', reqInit);
    fetch(req)
        .then(res => res.json())
        .then(json => {
            alert(json.message);
            window.location.reload();
        })
        .catch(err => console.log(err));
}

function deletemeal(e, meal_id) {
    // Delete the meal item from the menu
    var warning = confirm("Are you sure!");
    if (warning == true) {
        let reqInit = {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            })
        };
        const req = new Request(`https://immense-ocean-82555.herokuapp.com/api/v2/menu/${meal_id}`, reqInit);
        
        fetch(req)
            .then(res => res.json())
            .then(json => {
                alert(json.message);
                window.location.reload();
            })
            .catch(err => console.log(err));
        e.parentNode.parentNode.style.display = "none";
    } else {
        window.location.reload();
    }
}
