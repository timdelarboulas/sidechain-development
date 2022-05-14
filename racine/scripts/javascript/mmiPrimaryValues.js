// Display the MMI Prmiary Values on the website

const csvPrimaryValue =
  "http://127.0.0.1:5500/development/racine/ressources/csv/mmi_primary_values.csv";

const openCSVPrimaryValues = async () => {
  const pvDatas = await fetch(csvPrimaryValue);
  try {
    const pvText = await pvDatas.text();
    console.log(pvText);
  } catch {}
};

openCSVPrimaryValues();
