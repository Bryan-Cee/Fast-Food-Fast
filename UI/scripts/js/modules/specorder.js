import { clearOrderDetails, clearUserDetails } from "./getdetails.js";

function getSpecOrder(e) {
    e.preventDefault();
    let specInit = {
        method: "GET",
        headers: new Headers({
            "x-access-token": localStorage.getItem("token")
        })
    };

    let orderId = document.getElementById("order_id").value;

    const userReq = new Request(`https://immense-ocean-82555.herokuapp.com/api/v2/orders/${orderId}`, specInit);

    fetch(userReq)
        .then(res => res.json())
        .then(json => {
            if (json.Order) {
                clearUserDetails();
                console.log(json.Order);
                localStorage.setItem('order', 'true')
                let meal = json.Order;
                let mealname = meal.meal_name;
                let mealprice = meal.meal_price;
                let orderstatus = meal.order_status;
                let time = meal.time_of_order;
                let userid = meal.user_id;
                let orderid = meal.order_id;
                let pic = meal.pic;
                let total = meal.total;
                let quantity = meal.quantity;

                localStorage.setItem("userid", userid);
                localStorage.setItem("mealname", mealname);
                localStorage.setItem("mealprice", mealprice);
                localStorage.setItem("time", time);
                localStorage.setItem("orderid", orderid);
                localStorage.setItem("orderstatus", orderstatus);
                localStorage.setItem("pic", pic);
                localStorage.setItem("total", total);
                localStorage.setItem("quantity", quantity);
                localStorage.removeItem("message");
                window.location.reload();
            } else {
                console.log(json.message);
                localStorage.setItem("message", json.message);
                clearOrderDetails();
                clearUserDetails();
                window.location.reload();
            }
        })
        .catch(err => console.log(err));
}

export { getSpecOrder }