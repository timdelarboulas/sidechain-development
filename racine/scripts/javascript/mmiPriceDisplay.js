// récupérer les données du MMI depuis les fichiers CSV et les afficher sur le site.

const csvMMIPrice =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_price.csv";
const csvMMIDate =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_date.csv";

const csvBTCprice =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_btc_price.csv";

const csvMMIvariations =
  "http://127.0.0.1:5500/development/back/mmi/mmi_data.csv";

const mmiDisplay = document.querySelector(".mmiPrice");
const mmiDisplayDate = document.getElementById("mmiDate");
const arrowDisplay = document.getElementById("arrow");
const navbarPrice = document.getElementById("mmiPriceNavbar");
const shareDate = document.getElementById("shareDate");
const shareExValue = "OTC";
const btcPrice = document.getElementById("btcPrice");
const variationsHeader = document.getElementById("mmiVariationsHeader");
const dynamiqueV = document.querySelector(".dynVariation");

let mmiPriceArray = []; // sert à créer un array avec les cours du MMI, récupérer dans le CSV
let mmiDateArray = []; // idem avec la date

const openCSVPrice = async () => {
  const csvResPrice = await fetch(csvMMIPrice);
  const csvResData = await fetch(csvMMIvariations);
  try {
    const csvTextPrice = await csvResPrice.text();
    const csvFormPrice = String(csvTextPrice.replace(/\r\n|\n|\r/gm, ","));
    const csvArrayPrice = csvFormPrice.split(",");

    // mmiPriceoftheDay = csvArrayPrice[0].replace(".", ",");

    mmiDisplay.textContent = csvArrayPrice[0];
    navbarPrice.textContent = csvArrayPrice[0] + " $";

    if (parseInt(csvArrayPrice[0]) > parseInt(csvArrayPrice[1])) {
      mmiDisplay.classList.add("PriceUp");
      navbarPrice.classList.add("HeaderPriceUp");
      arrowDisplay.style.transform = "rotate(180deg)";
    } else if (csvArrayPrice[0] < csvArrayPrice[1]) {
      mmiDisplay.classList.add("PriceDown");
      navbarPrice.classList.add("HeaderPriceDown");
    }

    for (i = 0; i < 29; i++) {
      mmiPriceArray.push(csvArrayPrice[i]);
    } // ajoute les  derniers cours du MMI depuis le CSV

    // variation display

    const csvTextData = await csvResData.text();
    const csvFormData = String(csvTextData.replace(/\r\n|\n|\r/gm, ","));
    const csvArrayData = csvFormData.split(",");
    // the last MMI variation is always in the 5th position in the Array
    const variationDecimal = parseFloat(csvArrayData[5]).toFixed(5);
    const variationPercentage = (variationDecimal * 100).toFixed(2);

    variationPercentageDisplay = variationPercentage.replace(".", ",");

    dynamiqueV.textContent = variationPercentageDisplay + " %";

    if (variationPercentage < 0) {
      dynamiqueV.style.backgroundColor = "#DF362D";
    } else {
      dynamiqueV.style.backgroundColor = "#78B74477";
    }

    // formatting of the variations to display
    const variationDecimalPositiveForm = String(
      variationDecimal.replace(".", ",")
    );
    const variationDecimalNegativeForm = String(
      variationDecimalPositiveForm.replace("-", "- ")
    );

    if (variationDecimal >= 0) {
      variationsHeader.textContent = "+ " + variationDecimalPositiveForm;
    } else {
      variationsHeader.textContent = variationDecimalNegativeForm;
    }
    // -------------------
  } catch {
    mmiDisplay.textContent = displayErrorText;
    navbarPrice.textContent = "ERROR";
    variationsHeader.textContent = "N/A";
  }
};

const openCSVDate = async () => {
  const csvResDate = await fetch(csvMMIDate);
  const csvTextDate = await csvResDate.text();
  const csvTextForm = csvTextDate.replaceAll("T00:00:00+0000", "");
  const csvFormDate = csvTextForm.replace(/\r\n|\n|\r/gm, ",");
  const csvArrayDate = csvFormDate.split(",");

  mmiDisplayDate.textContent = csvArrayDate[0] + " (#" + shareExValue + ")";

  for (i = 0; i < 29; i++) {
    mmiDateArray.push(csvArrayDate[i]);
  } // ajoute les 14 dernières dates EOD du MMI depuis le CSV
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
