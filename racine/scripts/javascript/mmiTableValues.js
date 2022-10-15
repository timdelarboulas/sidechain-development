// Display the MMI values on the MMI's About webpage

const csvPrimaryValue =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_primary_values.csv";
const csvSecondaryValue =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_secondary_values.csv";

const primaryValuesInfo = document.querySelector(".primaryValuesInfo");
const secondaryValuesInfo = document.querySelector(".secondaryValuesInfo");

let result = [];

const openCSVPrimaryValues = async () => {
  const pvDatas = await fetch(csvPrimaryValue);
  try {
    // transform csv into JSON object
    const pvText = await pvDatas.text();
    const lines = pvText.split("\n");
    const headers = lines[0].split(",");

    for (i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
      // SUCCESS, JSON object done

      delete result[10];
      // deleted the last empty object
    }

    primaryValuesInfo.innerHTML =
      `
    <tr><th>Nom</th><th>Mnémo</th><th style="text-align:center;">Prix&#185;</th><th style="text-align:center;">Devise</th><th style="text-align:center;">Volume</th><th style="text-align:center;">Place</th></tr>
    ` +
      result
        .map(
          (info) => `
    <tr><td>${info.Share}</td><td>${
            info.MNEMO
          }</td><td style="text-align: right; padding-right: 10px; font-weight: bold;">${parseFloat(
            info.Price
          )
            .toFixed(2)
            .replace(
              ".",
              ","
            )}</td><td style="text-align: right; padding-right: 10px;">${
            info.Currency
          }</td><td style="text-align: right; padding-right: 10px;">${parseInt(
            info.Volume
          ).toLocaleString()}</td><td style="text-align: right; padding-right: 10px;">${
            info.Exchange
          }</td></tr>
    `
        )
        .join("");
  } catch {
    console.error("error");
  }
};

const openCSVSecondaryValues = async () => {
  const pvSecondaryDatas = await fetch(csvSecondaryValue);
  try {
    let sResult = [];

    // transform csv into JSON object
    const pvSecondaryText = await pvSecondaryDatas.text();
    const sLines = pvSecondaryText.split("\n");
    const sHeaders = sLines[0].split(",");

    for (i = 1; i < sLines.length; i++) {
      let sObj = {};
      let sCurrentline = sLines[i].split(",");

      for (var j = 0; j < sHeaders.length; j++) {
        sObj[sHeaders[j]] = sCurrentline[j];
      }

      sResult.push(sObj);
      // SUCCESS, JSON object done

      delete sResult[6];
      // deleted the last empty object
    }

    secondaryValuesInfo.innerHTML =
      `
  <tr><th>Nom (activité concernée)</th><th>Mnémo</th><th style="text-align:center;">Prix</th><th style="text-align:center;">Coefficient&#178;</th><th style="text-align:center;">Prix pondéré</th><th style="text-align:center;">Devise</th><th style="text-align:center;">Volume</th><th style="text-align:center;">Place</th></tr>
  ` +
      sResult
        .map(
          (info) => `
  <tr><td>${info.Share}</td><td>${
            info.MNEMO
          }</td><td style="text-align: right; padding-right: 10px;">${parseFloat(
            info.Price
          )
            .toFixed(2)
            .replace(
              ".",
              ","
            )}</td><td style="text-align: right; padding-right: 10px;">${
            info.Weighting
          }</td><td style="text-align: right; padding-right: 10px; font-weight: bold;">${info.WeightedPrice.replace(
            ".",
            ","
          )}</td><td style="text-align: right; padding-right: 10px;">${
            info.Currency
          }</td><td style="text-align: right; padding-right: 10px;">${parseInt(
            info.Volume
          )
            .toLocaleString()
            .replace(
              NaN,
              "Non communiqué"
            )}</td><td style="text-align: right; padding-right: 10px;">${
            info.Exchange
          }</td></tr>
  `
        )
        .join("");
  } catch {
    console.error("error");
  }
};

async function openMMITables() {
  await openCSVPrimaryValues();
  await openCSVSecondaryValues();
}
