# Get the list with all the informations about the MMI's primary values and saved all on a csv

# import
import requests
from bs4 import BeautifulSoup
import json
import pandas as pd

# -----------------------------------------------------------------------

# API settings
url = "http://api.marketstack.com/v1/eod?access_key="
access_key = "ead4e53f61b04a1c3696c50b0dbad8da"
url_symbol = "&symbols="
url_limit = "&limit="
limit = str(1)

# -----------------------------------------------------------------------

# Get the last informations of the primary values
primary_values_list = ["UMG.XAMS", "SPOT", "TME", "WMG",
                       "SIRI", "SONO", "LYV", "IHRT", "RADIOCITY.XNSE", "BLV.XPAR"]
informations_primary_list = []
close_pl = []
volume_pl = []
symbol_pl = []
exchange_pl = []
last_day_pl = []

for i in primary_values_list:
    r = requests.get(url + access_key + url_symbol + i + url_limit + limit)
    if r.ok:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        close = [d.get("close")
                 for d in js["data"] if d.get("close")]
        close_pl += close
        volume = [d.get("volume")
                  for d in js["data"] if d.get("volume")]
        volume_pl += volume
        symbol = [d.get("symbol")
                  for d in js["data"] if d.get("symbol")]
        symbol_pl += symbol
        exchange = [d.get("exchange")
                    for d in js["data"] if d.get("exchange")]
        exchange_pl += exchange
        day_date = [d.get("date")
                    for d in js["data"] if d.get("date")]
        last_day_pl += day_date

# export in a csv file

data = {"Share": ["Universal Music Group B.V", "Spotify", "Tencent Music Entertainment Group", "Warner Music Group Corp.", "Sirius XM Holdings", "Sonos Inc.", "Live Nation Entertainment", "iHeartMedia Inc", "Music Broadcast Ltd", "Believe Digital"],
        "MNEMO": symbol_pl,
        "Price": close_pl,
        "Volume": volume_pl,
        "Currency": ["EUR", "USD", "USD", "USD", "USD", "USD", "USD", "USD", "INR", "EUR"],
        "Exchange": exchange_pl,
        "Date": last_day_pl}

df = pd.DataFrame(
    data, columns=["Share", "MNEMO", "Price", "Currency", "Volume", "Exchange", "Date"])

# Export to a CSV file
df.to_csv(r'C:\Users\delar\Desktop\sidechain\development\racine\ressources\csv\mmi_primary_values.csv',
          index=False, header=True)

# SUCCESS
