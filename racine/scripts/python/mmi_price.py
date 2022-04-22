# Calcul du Music Market Index (MMI)

# Import
import requests
from bs4 import BeautifulSoup
from currencies_change_rate import change_rate
import json
import csv

# -----------------------------------------------------------------------

# Paramètre de l'API
url = "http://api.marketstack.com/v1/eod?access_key="
access_key = "ead4e53f61b04a1c3696c50b0dbad8da"
url_symbol = "&symbols="
url_limit = "&limit="
limit = str(1)

# -----------------------------------------------------------------------

# récupère la dernière date "eod" de cotation (utiliser dans l'export JSON)
r = requests.get(url + access_key + url_symbol + "SPOT" + url_limit + limit)
if r.ok:
    soup = BeautifulSoup(r.text, "html.parser")
    js = json.loads(soup.text)
    eod_date = "".join([d.get("date")
                        for d in js['data'] if d.get("date")])
# success

# calcul de la sommes des valeurs primaires
primary_values_list = ["UMG.XAMS", "SPOT", "TME", "WMG",
                       "SIRI", "SONO", "LYV", "IHRT", "RADIOCITY.XNSE", "BLV"]

primary_values_data_eod = []
primary_sum_eod = 0  # total de toutes les valeurs eod primaires

for i in primary_values_list:
    r = requests.get(url + access_key + url_symbol + i + url_limit + limit)
    if r.ok:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        if i == "UMG.XAMS":
            changing_exchange_rate = str(float("".join(map(str, [d.get("close")
                                                                 for d in js['data'] if d.get("close")]))) * change_rate)
            close = [float(changing_exchange_rate)]
            primary_values_data_eod += close
            # permet de convertir la valeur de l'action UMG, cotée en euro (EUR), en dollar américain (USD) grâce à l'import du taux de change (change_rate) recupérer depuis le fichier py "currencies_change_rate"
        else:
            close = [d.get("close")
                     for d in js['data'] if d.get("close")]
        primary_values_data_eod += close
        primary_sum_eod = sum(primary_values_data_eod)
    # failure => les valeurs primaires sont bien additionnées mais la valeur "UMG.XAMS" est ajouté deux fois !

# calcul de la sommes des valeurs secondaires
secondary_values_list = ["GOOGL", "SNE", "AAPL", "YNDX", "AMZN", "NTES"]
secondary_weighted = [0.922, 0.103, 0.087, 0.038, 0.068, 0.104]

secondary_values_data_eod = []
secondary_sum_eod = 0  # total de toutes les valeurs eod primaires

for i in secondary_values_list:
    r = requests.get(url + access_key + url_symbol + i + url_limit + limit)
    if r.ok:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        close = (d.get("close")
                 for d in js['data'] if d.get("close"))
        secondary_values_data_eod += close
        # liste avec toutes les valeurs secondaires => chaque valeur doit être pondérée par secondary_weighted

for i, y in zip(secondary_values_data_eod, secondary_weighted):
    secondary_sum_eod += i * y
    # somme des valeurs eod secondaires pondérées

average_length = len(primary_values_list) + \
    len(secondary_values_list)  # nombre total de valeurs
mmi_price_eod = round(
    (float(primary_sum_eod - float(changing_exchange_rate)) + float(secondary_sum_eod)) / average_length, 2)
# on soustrait la valeur "UMG.XAMS" de la somme des valeurs primaires afin de résoudre l'erreur constatée ligne 39

print(mmi_price_eod)
# success

# -----------------------------------------------------------------------

# exporter le pricing du MMI dans un fichier CSV
mmi_data_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\back\\mmi\\mmi_data.csv"
mmi_price_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_price.csv"
mmi_date_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_date.csv"

lines = []

with open(mmi_data_csv, 'r') as fp:
    lines = fp.readlines()

with open(mmi_data_csv, 'w') as fp:
    for number, line in enumerate(lines):
        if number not in [0]:
            fp.write(line)
# lis le csv et supprimer la première ligne

with open(mmi_data_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    data_csv = [line for line in r]
# stock les données du csv dans une variable

with open(mmi_data_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(["EOD price", "EOD date"])
    w.writerow([mmi_price_eod, eod_date])
    w.writerows(data_csv)
# stock les data total du MMI dans un CSV dans le dossier back

# SUCCESS

with open(mmi_price_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    price_csv = [line for line in r]

with open(mmi_price_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow([mmi_price_eod])
    w.writerows(price_csv)
# stock le cours du MMI dans un csv

# SUCCESS

with open(mmi_date_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    date_csv = [line for line in r]

with open(mmi_date_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow([eod_date])
    w.writerows(date_csv)

# stock la EOD date du MMI dans un autre csv

# SUCCESS