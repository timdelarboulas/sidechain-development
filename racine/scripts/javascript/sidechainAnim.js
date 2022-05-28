// Text "Sidechain" animation
// creat a text typing style in the website's name, in the header.

const target = document.querySelector(".titlewebsite");

let array = ["Sidechain", "Musique", "Finance"];
let wordIndex = 0;
let letterIndex = 0;

function addLetter() {
  const letter = document.createElement("span");
  target.appendChild(letter);
  letter.textContent = array[wordIndex][letterIndex];

  setTimeout(() => {
    letter.remove();
  }, 2500);
}

function textAnimationLoop() {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      //loop
      wordIndex = 0;
      letterIndex = 0;
      textAnimationLoop();
    } else if (letterIndex < array[wordIndex].length) {
      //add one additional letter
      addLetter();
      letterIndex++;
      textAnimationLoop();
    } else {
      //pass to the next array index
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        textAnimationLoop();
      }, 2800);
    }
  }, 70);
}

textAnimationLoop();

// change color of the header links

const headerLink = document.getElementById("MMIheader");
const headerLink2 = document.getElementById("mnftHeader");
const headerLink3 = document.getElementById("newsLink");

// mousemove

headerLink.addEventListener("mouseover", (e) => {
  e.target.style.color = "#FF8300";
  e.target.style.transform = "scale(1.1)";
});

headerLink2.addEventListener("mouseover", (e) => {
  e.target.style.color = "#FF8300";
  e.target.style.transform = "scale(1.1)";
});

headerLink3.addEventListener("mouseover", (e) => {
  e.target.style.color = "#FF8300";
  e.target.style.transform = "scale(1.1)";
});

// mouseleave

headerLink.addEventListener("mouseleave", (e) => {
  e.target.style.color = "#ffffff";
  e.target.style.transform = "scale(1)";
});

headerLink2.addEventListener("mouseleave", (e) => {
  e.target.style.color = "#ffffff";
  e.target.style.transform = "scale(1)";
});

headerLink3.addEventListener("mouseleave", (e) => {
  e.target.style.color = "#ffffff";
  e.target.style.transform = "scale(1)";
});
