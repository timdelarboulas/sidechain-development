// get the MMI data from the csv files and display on the website

// const csvMMIPrice =
//   "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_price.csv";
// const csvMMIDate =
//   "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_date.csv";

// const csvBTCprice =
//   "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_btc_price.csv";

// const csvMMIvariations =
//   "http://127.0.0.1:5500/development/back/mmi/mmi_data.csv";

// const mmiDisplay = document.querySelector(".mmiPrice");
// const mmiDisplayDate = document.getElementById("mmiDate");
const arrowDisplayAbout = document.getElementById("arrow");
const arrowDisplayAbout2 = document.getElementById("arrow2");
// const navbarPrice = document.getElementById("mmiPriceNavbar");
// const shareDate = document.getElementById("shareDate");
// const shareExValue = "OTC";
// const btcPrice = document.getElementById("btcPrice");
// const variationsHeader = document.getElementById("mmiVariationsHeader");
const dynamiqueVAbout = document.querySelector(".dynVariation2");

let mmiPriceArray = []; // array with MMI price
let mmiDateArray = []; // same with the date

const priceDisplay = async () => {
  await openCSVPrice();
  try {
    // mmiPriceoftheDay = csvArrayPrice[0].replace(".", ",");
    mmiDisplay.textContent = csvArrayPrice[0];
    navbarPrice.textContent = csvArrayPrice[0] + " $";

    if (parseFloat(csvArrayPrice[0]) > parseFloat(csvArrayPrice[1])) {
      mmiDisplay.classList.add("PriceUp");
      navbarPrice.classList.add("HeaderPriceUp");
      arrowDisplayAbout.style.transform = "rotate(180deg)";
      arrowDisplayAbout2.style.transform = "rotate(180deg)";
    } else if (parseFloat(csvArrayPrice[0]) < parseFloat(csvArrayPrice[1])) {
      mmiDisplay.classList.add("PriceDown");
      navbarPrice.classList.add("HeaderPriceDown");
    }

    // for (i = 0; i < 29; i++) {
    //   mmiPriceArray.push(csvArrayPrice[i]);
    // } // add the lastest MMI price from the csv file

    // variation display

    const csvTextData = await csvResData.text();
    const csvFormData = String(csvTextData.replace(/\r\n|\n|\r/gm, ","));
    const csvArrayData = csvFormData.split(",");
    // the last MMI variation is always in the 5th position in the Array
    const variationDecimal = parseFloat(csvArrayData[5]).toFixed(5);
    const variationPercentage = (variationDecimal * 100).toFixed(2);

    // variationPercentageDisplay = variationPercentage.replace(".", ",");

    dynamiqueVAbout.textContent = variationPercentageDisplay + " %";

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

    arrowDisplayAbout.style.visibility = "hidden";
    arrowDisplayAbout2.style.visibility = "hidden";
  }
};

const openCSVDate = async () => {
  const csvResDate = await fetch(csvMMIDate);
  const csvTextDate = await csvResDate.text();
  const csvTextForm = csvTextDate.replaceAll("T00:00:00+0000", "");
  const csvFormDate = csvTextForm.replace(/\r\n|\n|\r/gm, ",");
  const csvArrayDate = csvFormDate.split(",");

  mmiDisplayDate.textContent = csvArrayDate[0] + " (#" + shareExValue + ")";
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
