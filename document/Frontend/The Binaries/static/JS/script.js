// sticky navbar
let header = document.querySelector(".header");
const home = document.querySelector(".home")
window.onscroll = function() {
    if (document.documentElement.scrollTop > 40) {
        header.classList.add("sticky");
        home.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
        home.classList.remove("sticky");
    }
}

// making menu links active
const menus = document.querySelectorAll(".header-right a")
for(var i = 0; i< menus.length; i++){
    menus[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
      });
}

// mobile screen menu
const responsiveMenu = document.querySelector(".responsive-menu");
const menuBar = document.querySelector(".menu-bar");

menuBar.addEventListener("click", ()=>{
    responsiveMenu.classList.toggle("active");
});
let responsiveMenuIcons = document.querySelectorAll(".container .menu-icons .menu-icon");
for (var i = 0; i < responsiveMenuIcons.length; i++) {
    responsiveMenuIcons[i].addEventListener("click", function() {
        responsiveMenu.classList.remove("active");
    });
}
// popup
const popup = document.querySelector(".popup")
const closeBtn = document.querySelector(".close-button")
const openbtn = document.querySelector(".open-btn")
const overlay = document.querySelector("#overlay")
openbtn.addEventListener("click", ()=>{
    popup.classList.add("active")
})
closeBtn.addEventListener("click", ()=>{
    popup.classList.remove("active")
})
overlay.addEventListener("click", ()=>{
  popup.classList.remove("active")
})
