function closepopup(e) {
    var parent = e.parentNode;
    parent.parentNode.style.display = 'none';
}

var order_popup = document.getElementById('order-popup');

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
}