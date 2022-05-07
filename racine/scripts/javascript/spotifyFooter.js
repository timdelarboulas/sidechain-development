// close the Spotify Footer

const spotifyFooter = document.querySelector(".spotifyFooter");
const closeSpotifyFooter = document.getElementById("close");

closeSpotifyFooter.addEventListener("mousedown", (e) => {
  spotifyFooter.style.visibility = "hidden";
});
