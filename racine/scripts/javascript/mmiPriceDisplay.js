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
const arrowDisplay2 = document.getElementById("arrow2");
const navbarPrice = document.getElementById("mmiPriceNavbar");
const shareDate = document.getElementById("shareDate");
const shareExValue = "OTC";
const btcPrice = document.getElementById("btcPrice");
const variationsHeader = document.getElementById("mmiVariationsHeader");
const dynamiqueV = document.querySelector(".dynVariation");

let mmiPriceArray = []; // array with MMI price
let mmiDateArray = []; // same with the date

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

    if (parseFloat(csvArrayPrice[0]) > parseFloat(csvArrayPrice[1])) {
      mmiDisplay.classList.add("PriceUp");
      navbarPrice.classList.add("HeaderPriceUp");
      arrowDisplay.style.transform = "rotate(180deg)";
      arrowDisplay2.style.transform = "rotate(180deg)";
    } else if (parseFloat(csvArrayPrice[0]) < parseFloat(csvArrayPrice[1])) {
      mmiDisplay.classList.add("PriceDown");
      navbarPrice.classList.add("HeaderPriceDown");
    }

    for (i = 0; i < csvArrayPrice.length; i++) {
      mmiPriceArray.push(csvArrayPrice[i]);
    } // add the lastest MMI price from the csv file

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

  for (i = 0; i < csvArrayDate.length; i++) {
    mmiDateArray.push(csvArrayDate[i]);
  } // add the lastest dates from the csv file
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

// ----------------------------------------------------------------------------
// MMI ABOUT PAGE

// Session Table
// using to get the MMI's data to display on the Session table on the About MMI page.
// this script is connected with the mmiPriceDisplay.js script, who is already used to format MMI's data from the CSV files

const csvMMIVolatility =
  "http://127.0.0.1:5500/development/back/mmi/mmi_volatility.csv";

const mmiPriceSessionTable = document.getElementById("mmiPriceSessionTable");
const mmiYesterdayPriceSessionTable = document.getElementById(
  "mmiYesterdayPriceSessionTable"
);
const mmiVariation5days = document.getElementById("mmiVariation5days");
const mmiVolatility30days = document.getElementById("mmiVolatility30days");
const mmiRiskText = document.getElementById("mmiRiskText");
const mmiMarkToMarket = document.getElementById("mmiMarkToMarket");

let mmiVolatilityArray = [];

const sessionTableDisplay = async () => {
  await openCSVPrice();

  // get the volatility data from the CSV and format
  const getVolatilityDataCSV = await fetch(csvMMIVolatility);
  const csvVolatilityData = await getVolatilityDataCSV.text();
  const csvVolatilityForm = String(
    csvVolatilityData.replace(/\r\n|\n|\r/gm, ",")
  );
  const csvVolatilityArray = csvVolatilityForm.split(",");
  // SUCESS

  // stock all the volatility data in an array
  for (i = 0; i < csvVolatilityArray.length; i++) {
    mmiVolatilityArray.push(csvVolatilityArray[i]);
  }

  mmiVolatilityArray.shift();
  // delete the header of the array.
  // SUCCESS

  try {
    // today price
    mmiPriceSessionTable.textContent = mmiPriceArray[0];

    // yesterday price
    mmiYesterdayPriceSessionTable.textContent = mmiPriceArray[1];

    // calculation of the variation at 5 days
    let mmiVariations5days = (
      (parseFloat(mmiPriceArray[0] - mmiPriceArray[4]) /
        parseFloat(mmiPriceArray[4])) *
      100
    ).toFixed(2);

    // conditional formatting
    if (mmiVariations5days > 0) {
      mmiVariation5days.textContent = "+" + mmiVariations5days + "%";
      mmiVariation5days.style.color = "#78B744"; // green
    } else {
      mmiVariation5days.textContent = mmiVariations5days + "%";
      mmiVariation5days.style.color = "#FF4500"; // red
    }

    // display Volatility at 30 days
    let volatilityPercentage = (csvVolatilityArray[1] * 100).toFixed(2);
    mmiVolatility30days.textContent = volatilityPercentage + "%";

    // display the risk in function of the volatility value
    if (volatilityPercentage > 0 && volatilityPercentage < 3) {
      mmiRiskText.textContent = "Très faible";
      mmiRiskText.style.color = "#78B744"; // green
    } else if (volatilityPercentage > 3 && volatilityPercentage < 8) {
      mmiRiskText.textContent = "Faible";
      mmiRiskText.style.color = "#78B744"; // green
    } else if (volatilityPercentage > 8 && volatilityPercentage < 15) {
      mmiRiskText.textContent = "Moyen";
      mmiRiskText.style.color = "#FF8300"; // orange
    } else if (volatilityPercentage > 15 && volatilityPercentage < 22) {
      mmiRiskText.textContent = "Elevé";
      mmiRiskText.style.color = "#FF4500"; // red
    } else {
      mmiRiskText.textContent = "Très élevé";
      mmiRiskText.style.color = "#FF4500"; // red
    }

    // calculation and display of the Mark-to-Market
    let m2mCalculation = (mmiPriceArray[0] - 43.4).toFixed(2);

    if (m2mCalculation > 0) {
      mmiMarkToMarket.textContent = m2mCalculation;
      mmiMarkToMarket.style.color = "#78B744"; // green
    } else {
      mmiMarkToMarket.textContent = m2mCalculation;
      mmiMarkToMarket.style.color = "#FF4500"; // red
    }
  } catch {
    console.error(error);
  }
};

sessionTableDisplay();

const csvMovingAverage =
  "http://127.0.0.1:5500/development/back/mmi/mmi_ma.csv";

let movingAverage20Array = [];
let movingAverage30Array = [];
let movingAverage50Array = [];

const csvMAfetch = async () => {
  const getMADataCSV = await fetch(csvMovingAverage);
  const csvMAData = await getMADataCSV.text();
  const csvMADataForm = String(csvMAData.replace(/\r\n|\n|\r/gm, ","));
  const movingAverageData = csvMADataForm.split(",");
  movingAverageData.splice(0, 3);

  // get an array with the MA 20 column
  for (i = 0; i < movingAverageData.length; i += 3) {
    movingAverage20Array.push(movingAverageData[i]);
  }

  // get an array with the MA 30 column
  for (i = 1; i < movingAverageData.length; i += 3) {
    movingAverage30Array.push(movingAverageData[i]);
  }

  // get an array with the MA 50 column
  for (i = 2; i < movingAverageData.length; i += 3) {
    movingAverage50Array.push(movingAverageData[i]);
  }
};

// -------------------------------

// display of VaR value according to the type of VaR chosen
const csvVaR = "http://127.0.0.1:5500/development/back/mmi/mmi_var.csv";
const varSelection = document.getElementById("varSelect");
const varHistorical = document.getElementById("varH");
const varDisplay = document.getElementById("varResult");

const csvVARfetch = async () => {
  try {
    const getVARdataCSV = await fetch(csvVaR);
    const csvVARdata = await getVARdataCSV.text();
    const csvVARdataForm = String(csvVARdata.replace(/\r\n|\n|\r/gm, ","));
    const varData = csvVARdataForm.split(",");
    varData.splice(0, 4); // delete header index

    // display VaR
    varDisplay.textContent =
      parseFloat(varData[0]) + "%, " + parseFloat(varData[1]) + "$.";

    varSelection.addEventListener("change", (e) => {
      if (e.target.value == "var1") {
        varDisplay.textContent =
          parseFloat(varData[0]) + "%, " + parseFloat(varData[1]) + "$.";
      } else if (e.target.value == "var2") {
        varDisplay.textContent = "en production";
      }
    });
  } catch {
    varDisplay.textContent = "N/A";
  }
};

csvVARfetch();
