const app = ()=>{
    document.querySelector('.toggle').addEventListener('click', menuToggle);
}

const menuToggle = ()=>{
    var x = document.getElementById("nav-wrapper");
    var y = document.getElementById("toggle");
    if (x.className === "nav-wrapper") {
        x.className += " responsive";
        y.className += " cross";
    } else {
        x.className = "nav-wrapper";
        y.className = "toggle";
    }
}

app();