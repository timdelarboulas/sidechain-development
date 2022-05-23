# On cherche à obtenir le dernier taux de change disponible de l'euro (EUR) en dollar américain (USD)

# Bases
import requests
from bs4 import BeautifulSoup
import json

url = "http://api.currencylayer.com/live?access_key="
access_key = "24aa286b9d9263ec1481f50899ba9594"
currency = "&currencies="

currency_usd = "USD"  # currency bought
source = "&source="

# EUR/USD
eur_symbol = "EUR"
format = "&format=1"

r = requests.get(url + access_key + currency + currency_usd +
                 source + eur_symbol + format)
if r.ok:
    soup = BeautifulSoup(r.text, "html.parser")
    js = json.loads(soup.text)
    quotes = js.get("quotes")
    eurusd_change_rate = quotes.get("EURUSD")
    print(eurusd_change_rate)
    # latest change rate


# INR/USD
inr_symbol = "INR"

r = requests.get(url + access_key + currency + currency_usd +
                 source + inr_symbol + format)
if r.ok:
    soup = BeautifulSoup(r.text, "html.parser")
    js = json.loads(soup.text)
    quotes = js.get("quotes")
    inrusd_change_rate = quotes.get("INRUSD")
    print(inrusd_change_rate)
    # latest change rate


# BTC price
url = "https://rest.coinapi.io/v1/trades/latest?limit=10&filter_symbol_id=COINBASE_SPOT_BTC_USD"
headers = {"X-CoinAPI-Key": "100D5685-A43D-47E6-9293-DC72F831C71D"}
r = requests.get(url, headers=headers)
if r.ok:
    soup = BeautifulSoup(r.text, "html.parser")
    js = json.loads(soup.text)
    key = "price"
    for d in js:
        if key in d:
            btc_price = d[key]
    print(btc_price)
    # success => lastest BTC/USD price from COINBASE
