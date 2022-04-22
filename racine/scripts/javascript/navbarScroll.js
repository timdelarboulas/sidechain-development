const bar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  let positionNavBar = window.scrollY;
  if (positionNavBar > 200) {
    bar.style.top = "0px";
    bar.style.boxShadow = "0px 0.5px 5px #000000";
  } else {
    bar.style.top = "-70px";
    bar.style.boxShadow = "none";
  }
});
