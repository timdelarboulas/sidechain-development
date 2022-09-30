# We are looking to obtain the last exchange rates in order to build the MMI in a single currency : dollar. We also recover the last USD/BTC rate to have the MMI in BTC.

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
    print(f"EUR/USD = {eurusd_change_rate}")
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
    print(f"INR/USD = {inrusd_change_rate}")
    # latest change rate


# BTC price
# The BTC_Price variable comes from a free API called Coinapi and its API calls do not work very well.
# So, to avoid errors, we put an exception on the API call
url = "https://rest.coinapi.io/v1/trades/latest?limit=10&filter_symbol_id=COINBASE_SPOT_BTC_USD"
headers = {"X-CoinAPI-Key": "100D5685-A43D-47E6-9293-DC72F831C71D"}
r = requests.get(url, headers=headers)
if r.ok:
    try:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        key = "price"
        for d in js:
            if key in d:
                btc_price = d[key]
        print(f"BTC/USD = {btc_price}")
    except Exception:
        pass
    # success => lastest BTC/USD price from COINBASE
