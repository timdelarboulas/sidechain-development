# On cherche à obtenir le dernier taux de change disponible de l'euro (EUR) en dollar américain (USD)

# Bases
import requests
from bs4 import BeautifulSoup
import json

url = "http://api.currencylayer.com/live?access_key="
access_key = "24aa286b9d9263ec1481f50899ba9594"
currency = "&currencies="

currency_id = "USD"  # choix de la devise achetée
source = "&source="

source_symbol = "EUR"  # choix de la devise vendue
format = "&format=1"

r = requests.get(url + access_key + currency + currency_id +
                 source + source_symbol + format)
if r.ok:
    soup = BeautifulSoup(r.text, "html.parser")
    js = json.loads(soup.text)
    quotes = js.get("quotes")
    change_rate = quotes.get("EURUSD")
    print(change_rate)
    # obtention du dernier tuax de change
