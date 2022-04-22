// affichage des erreur API

const errorText = [
  "Aie, fausse note !",
  "Désaccordé...",
  "Le casque est débranché",
];

let textErrorRandom = Math.floor(Math.random() * errorText.length);

let displayErrorText = errorText[textErrorRandom];
