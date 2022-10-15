import yfinance as yf
import datetime as dt
import csv
import pandas as pd
from currencies_change_rate import eurusd_change_rate as eurusd, inrusd_change_rate as inrusd

# day of cotation
d = dt.date.today() - dt.timedelta(days=1)
date = str(d)

# get primary values data
umg_as = float(yf.Ticker("UMG.AS").info["currentPrice"]) * eurusd
spot = yf.Ticker("SPOT").info["currentPrice"]
tme = yf.Ticker("TME").info["currentPrice"]
wmg = yf.Ticker("WMG").info["currentPrice"]
siri = yf.Ticker("SIRI").info["currentPrice"]
sono = yf.Ticker("SONO").info["currentPrice"]
lyv = yf.Ticker("LYV").info["currentPrice"]
ihrt = yf.Ticker("IHRT").info["currentPrice"]
radiocity = float(
    yf.Ticker("RADIOCITY.NS").info["currentPrice"]) * inrusd
blv = float(yf.Ticker("BLV.PA").info["currentPrice"]) * eurusd

primary_values = [umg_as, spot, tme, wmg,
                  siri, sono, lyv, ihrt, radiocity, blv]
p_values_sum = float(sum(primary_values))

# get secondary values data
google = yf.Ticker("GOOGL").info["currentPrice"]
sony = yf.Ticker("SONY").info["currentPrice"]
apple = yf.Ticker("AAPL").info["currentPrice"]
yndx = yf.Ticker("YNDX").info["currentPrice"]
amzn = yf.Ticker("AMZN").info["currentPrice"]
ntes = yf.Ticker("NTES").info["currentPrice"]

secondary_values = [google, sony, apple, yndx, amzn, ntes]
weighted_array = [0.922, 0.103, 0.087, 0.038, 0.068, 0.104]
s_values_sum = 0  # sum of all secondary eod values

for i, y in zip(secondary_values, weighted_array):
    s_values_sum += i * y
    # sum of secondary eod weighted data

# calculation of the MMI
lenght = len(secondary_values) + len(primary_values)
mmi_price_eod = round(
    (((float(p_values_sum) + float(s_values_sum)) / lenght)), 2)

print(f"Le MMI cote {mmi_price_eod} USD")

# Export MMI's datas to several CSV files, used in the build and the display of the MMI's graph and them save in back-up file
mmi_data_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\back\\mmi\\mmi_data.csv"
mmi_price_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_price.csv"
mmi_date_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_date.csv"

# before export of the latest data, we gonna calcul the variation of the latest MMI price with our existing csv file.
mmi_price_list = pd.read_csv(mmi_price_csv, header=None).T.values.tolist()[0]
mmi_latest_prices = [float(x) for x in mmi_price_list]
mmi_last_price = mmi_latest_prices[0]
mmi_variations = round(
    (float((mmi_price_eod - mmi_last_price) / mmi_last_price)), 6)
print(f"variation de {mmi_variations}")
# we have now a variable with the variation between the new and the last price.
# SUCCESS

# export latest calculate data
lines = []

with open(mmi_data_csv, 'r') as fp:
    lines = fp.readlines()

with open(mmi_data_csv, 'w') as fp:
    for number, line in enumerate(lines):
        if number not in [0]:
            fp.write(line)
# read the csv file and delete the first raw

with open(mmi_data_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    data_csv = [line for line in r]
# put csv file datas in a variable

with open(mmi_data_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(["EOD price", "EOD date", "Variations"])
    w.writerow([mmi_price_eod, date, mmi_variations])
    w.writerows(data_csv)
# Stock the MMI's EOD date in back-up csv file, used to make stats, to parse and maybe build an API.

# SUCCESS

with open(mmi_price_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    price_csv = [line for line in r]

with open(mmi_price_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow([mmi_price_eod])
    w.writerows(price_csv)
# stock only the price of MMI in a csv file, used to build the MMI graph.

# SUCCESS

with open(mmi_date_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    date_csv = [line for line in r]

with open(mmi_date_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow([date])
    w.writerows(date_csv)
# stock only the date of MMI in a csv file, used to build the MMI graph.

print("SUCCESS : the data has been stored in the files mmi_data.csv, mmi_price.csv, mmi_date.csv")
# SUCCESS
