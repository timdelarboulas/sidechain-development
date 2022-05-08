# Get the list with all the informations about the MMI's primary values and saved all on a csv

# import
import requests
from bs4 import BeautifulSoup
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

# Get the last informations of the primary values
primary_values_list = ["UMG.XAMS", "SPOT", "TME", "WMG",
                       "SIRI", "SONO", "LYV", "IHRT", "RADIOCITY.XNSE", "BLV"]
informations_primary_list = []

for i in primary_values_list:
    r = requests.get(url + access_key + url_symbol + i + url_limit + limit)
    if r.ok:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        close = [d.get("close")
                 for d in js["data"] if d.get("close")]
        informations_primary_list += close
        volume = [d.get("volume")
                  for d in js["data"] if d.get("volume")]
        informations_primary_list += volume
        symbol = [d.get("symbole")
                  for d in js["data"] if d.get("symbol")]
        informations_primary_list += symbol
        exchange = [d.get("exchange")
                    for d in js["data"] if d.get("exchange")]
        informations_primary_list += exchange
        day_date = [d.get("date")
                    for d in js["data"] if d.get("date")]
        informations_primary_list += day_date
        print(informations_primary_list)

# to contiue
