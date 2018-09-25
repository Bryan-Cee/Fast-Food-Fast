button = document.querySelectorAll('#accept')

button.forEach(element => {
    element.addEventListener('click', accept)
});

function accept() {
    this.style.display = "none";
    this.nextElementSibling.style.display = "none";
    var parent = this.parentNode;
    parent.lastElementChild.style.display = "inline-block"
}