// Display the MMI Prmiary Values on the website

const csvPrimaryValue =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_primary_values.csv";
const primaryValuesInfo = document.querySelector(".primaryValuesInfo");

const openCSVPrimaryValues = async () => {
  const pvDatas = await fetch(csvPrimaryValue);
  try {
    let result = [];
    let priceForm = [];

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
    <tr><th>Nom</th><th>Mnémo</th><th style="text-align:center;">Prix</th><th style="text-align:center;">Devise</th><th style="text-align:center;">Volume</th><th style="text-align:center;">Place</th></tr>
    ` +
      result
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

openCSVPrimaryValues();
