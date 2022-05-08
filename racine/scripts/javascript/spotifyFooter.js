// close and open the Spotify Footer

const spotifyFooter = document.querySelector(".spotifyFooter");
const closeSpotifyFooter = document.getElementById("close");

// defaut display a cross to close the footer
closeSpotifyFooter.innerHTML = `
    <img src="./img/icon_close.png" class="closeCross">
    `;

closeSpotifyFooter.addEventListener("mousedown", (e) => {
  if (spotifyFooter.style.top != "700px") {
    // click to close and display an arrow to open again
    closeSpotifyFooter.innerHTML = `
    <img src="./img/white_arrow-top.png" class="closeArray">
    `;
    spotifyFooter.style.top = "700px";
  } else {
    // display a cross to close
    spotifyFooter.style.top = "auto";
    closeSpotifyFooter.innerHTML = `
    <img src="./img/icon_close.png" class="closeCross">
    `;
  }
});
