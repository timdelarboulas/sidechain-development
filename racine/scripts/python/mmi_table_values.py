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


# Get the last informations of the secondary values
secondary_values_list = ["GOOGL", "SONY", "AAPL", "YNDX", "AMZN", "NTES"]
secondary_weighted = [0.922, 0.103, 0.087, 0.038, 0.068, 0.104]
secondary_close_pl = []
secondary_volume_pl = []
secondary_symbol_pl = []
secondary_exchange_pl = []
secondary_last_day_pl = []

for i in secondary_values_list:
    r = requests.get(url + access_key + url_symbol + i + url_limit + limit)
    if r.ok:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        secondary_close = [d.get("close")
                           for d in js["data"] if d.get("close")]
        secondary_close_pl += secondary_close
        secondary_volume = [d.get("volume")
                            for d in js["data"]]
        secondary_volume_pl += secondary_volume
        secondary_symbol = [d.get("symbol")
                            for d in js["data"] if d.get("symbol")]
        secondary_symbol_pl += secondary_symbol
        secondary_exchange = [d.get("exchange")
                              for d in js["data"] if d.get("exchange")]
        secondary_exchange_pl += secondary_exchange
        secondary_day_date = [d.get("date")
                              for d in js["data"] if d.get("date")]
        secondary_last_day_pl += secondary_day_date

# calculation of the weighted price
secondary_weighted_price = list(
    map(lambda x, y: round(x*y, 2), secondary_close_pl, secondary_weighted))

# API get no information about Yandex volume, so we have a None value in secondary_volume_pl variable. We must to replace None value by "None" value.
secondary_volume_pl_adjusted = [
    str(yndxV) if yndxV is None else yndxV for yndxV in secondary_volume_pl]

# export in a csv file
data = {"Share": ["Alphabet Inc. (Youtube Music / Play Store)", "Sony (Sony Music)", "Apple (Apple Music / Apple Store)", "Yandex N.V. (Yandex Music)", "Amazon (Amazon Music)", "NetEase (NetEase Cloud Music)"],
        "MNEMO": secondary_symbol_pl,
        "Price": secondary_close_pl,
        "Weighting": ["92.20%", "10.30%", "8.70%", "3.80%", "6.80%", "10.40%"],
        "WeightedPrice": secondary_weighted_price,
        "Volume": secondary_volume_pl_adjusted,
        "Currency": ["USD", "USD", "USD", "USD", "USD", "USD"],
        "Exchange": secondary_exchange_pl,
        "Date": secondary_last_day_pl}

df = pd.DataFrame(
    data, columns=["Share", "MNEMO", "Price", "Weighting", "WeightedPrice", "Currency", "Volume", "Exchange", "Date"])

# Export to a CSV file
df.to_csv(r'C:\Users\delar\Desktop\sidechain\development\racine\ressources\csv\mmi_secondary_values.csv',
          index=False, header=True)

# SUCCESS
