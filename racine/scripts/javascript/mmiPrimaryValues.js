// Display the MMI Prmiary Values on the website

const csvPrimaryValue =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_primary_values.csv";
const primaryValuesInfo = document.querySelector(".primaryValuesInfo");

const openCSVPrimaryValues = async () => {
  const pvDatas = await fetch(csvPrimaryValue);
  try {
    const pvText = await pvDatas.text();

    const lines = pvText.split("\n");

    let result = [];
    const headers = lines[0].split(",");

    for (i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    console.log(result[0]);

    primaryValuesInfo.innerHTML = result
      .map(
        (info) => `
    <h4 id="col1">${info.Share}</h4>
    <h4 id="col2">${info.MNEMO}</h4>
    <h4 id="col3">${info.Price}</h4>
    <h4 id="col4">${info.Currency}</h4>
    <h4 id="col5">${info.Volume}</h4>
    <h4 id="col6">${info.Exchange}</h4>
    <h4 id="col7">${info.Date}</h4>
    `
      )
      .join("");
  } catch {
    console.error("error");
  }
};

openCSVPrimaryValues();
