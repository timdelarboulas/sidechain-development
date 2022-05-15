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
    # obtention du dernier tuax de change


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
    # obtention du dernier tuax de change
