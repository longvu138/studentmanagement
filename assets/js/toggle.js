var sideBar = document.querySelector(".sidebar");
const x = sideBar.style.width;
document.getElementById("menu").addEventListener("mouseover", function () {
  var showText = document.querySelectorAll(".ms-2");
  for (let i = 0; i < showText.length; i++) {
    if (showText[i].style.display == "none") {
      showText[i].style.display = "inline";
    }
  }
  sideBar.style.width = "280px";
});
document.getElementById("menu").addEventListener("mouseout", function () {
  var showText = document.querySelectorAll(".ms-2");
  for (let i = 0; i < showText.length; i++) {
    if (showText[i].style.display == "inline") {
      showText[i].style.display = "none";
    }
  }
  sideBar.style.width = x;
});
document.getElementById("show").addEventListener("click", function () {
  var showText = document.querySelectorAll(".ms-2");
  for (let i = 0; i < showText.length; i++) {
    if (showText[i].style.display == "inline") {
      showText[i].style.display = "none";
      sideBar.style.width = x;
    } else {
      showText[i].style.display = "inline";
      sideBar.style.width = "280px";
    }
  }
});
