function accepted(e) {
    e.style.display = "none";
    e.nextElementSibling.style.display = "none";
    var parent = e.parentNode;
    parent.lastElementChild.style.display = "inline-block"
}