var sideBar = document.querySelector(".sidebar");
const x = sideBar.style.width;
document.getElementById("show").onclick = function () {
  var showText = document.querySelectorAll(".ms-2");
  for (let i = 0; i < showText.length; i++) {
    if (showText[i].style.display == "inline") {
      showText[i].style.display = "none";
      sideBar.style.width = "80px";
    } else {
      showText[i].style.display = "inline";
      sideBar.style.width = x;
    }
  }
};
