let header = document.getElementById('snap')
let snap_position = header.offsetTop;
window.onscroll = function () {
    snap()
}

function snap() {
    if (window.pageYOffset > snap_position + 20) {
        header.classList.add("fixed-header");
    } else {
        header.classList.remove("fixed-header");
    }
}
function closepopup(e) {
    var parent = e.parentNode;
    parent.parentNode.style.display = 'none';
    overlayer.style.display = "none";
}

var order_popup = document.getElementById('order-popup');
let overlayer = document.getElementById('overlayer')

function ordermeal(e) {
    order_popup.style.display = 'block';
    let mealname = e.parentNode.previousElementSibling.firstElementChild.innerHTML
    let mealid = e.previousElementSibling.value
    document.getElementById('meal_id').value = mealid;
    document.getElementById('meal_name').value = mealname;
}

var meal_item = document.getElementById('addmealpopup');

function add_menu() {
    meal_item.style.display = 'block';
    overlayer.style.display = "block";
}

const getUser = document.getElementById("userForm");

function getUserForm() {
    getUser.style.display = "block";
    overlayer.style.display = "block";
}

const getOrder = document.getElementById("orderForm");

function getOrderForm() {
    getOrder.style.display = "block";
    overlayer.style.display = "block";
}
