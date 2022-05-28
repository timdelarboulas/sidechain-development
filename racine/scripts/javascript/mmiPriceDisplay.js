// récupérer les données du MMI depuis les fichiers CSV et les afficher sur le site.

const csvMMIPrice =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_price.csv";
const csvMMIDate =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_date.csv";

const csvBTCprice =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_btc_price.csv";

const mmiDisplay = document.querySelector(".mmiPrice");
const mmiDisplayDate = document.getElementById("mmiDate");
const arrowDisplay = document.getElementById("arrow");
// const shareHeader = document.getElementById("shareMnemo");
const shareDate = document.getElementById("shareDate");
const shareExValue = "OTC";
const btcPrice = document.getElementById("btcPrice");

let mmiPriceArray = []; // sert à créer un array avec les cours du MMI, récupérer dans le CSV
let mmiDateArray = []; // idem avec la date

const openCSVPrice = async () => {
  const csvResPrice = await fetch(csvMMIPrice);
  try {
    const csvTextPrice = await csvResPrice.text();
    const csvFormPrice = String(csvTextPrice.replace(/\r\n|\n|\r/gm, ","));
    const csvArrayPrice = csvFormPrice.split(",");

    mmiDisplay.textContent = csvArrayPrice[0];
    // shareHeader.textContent = "MMI : " + csvArrayPrice[0] + " $";

    if (parseInt(csvArrayPrice[0]) > parseInt(csvArrayPrice[1])) {
      mmiDisplay.classList.add("PriceUp");
      // shareHeader.classList.add("HeaderPriceUp");
      arrowDisplay.style.transform = "rotate(180deg)";
    } else if (csvArrayPrice[0] < csvArrayPrice[1]) {
      mmiDisplay.classList.add("PriceDown");
      // shareHeader.classList.add("HeaderPriceDown");
    }

    for (i = 0; i < 10; i++) {
      mmiPriceArray.push(csvArrayPrice[i]);
    } // ajoute les 5 derniers cours du MMI depuis le CSV
  } catch {
    mmiDisplay.textContent = displayErrorText;
    // shareHeader.textContent = "ERR";
  }
};

const openCSVDate = async () => {
  const csvResDate = await fetch(csvMMIDate);
  const csvTextDate = await csvResDate.text();
  const csvTextForm = csvTextDate.replaceAll("T00:00:00+0000", "");
  const csvFormDate = csvTextForm.replace(/\r\n|\n|\r/gm, ",");
  const csvArrayDate = csvFormDate.split(",");

  mmiDisplayDate.textContent = csvArrayDate[0] + " (#" + shareExValue + ")";

  for (i = 0; i < 10; i++) {
    mmiDateArray.push(csvArrayDate[i]);
  } // ajoute les 5 dernières dates EOD du MMI depuis le CSV
};

const openBTCPrice = async () => {
  const csvResBTCPrice = await fetch(csvBTCprice);
  try {
    const csvTextBTCPrice = await csvResBTCPrice.text();
    csvBTCpriceMath = parseFloat(csvTextBTCPrice).toFixed(6);
    btcPrice.textContent = csvBTCpriceMath;
  } catch {}
};

async function openFiles() {
  await openCSVPrice();
  await openCSVDate();
  await openBTCPrice();
}
// SUCCESS
