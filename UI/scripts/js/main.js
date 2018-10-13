function accepted(e) {
    e.style.display = "none";
    e.nextElementSibling.style.display = "none";
    var parent = e.parentNode;
    parent.lastElementChild.style.display = "inline-block"
}


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