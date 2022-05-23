# Calculation of the Music Market Index (MMI)

# Import

# calculation
import requests
from bs4 import BeautifulSoup
from currencies_change_rate import eurusd_change_rate
from currencies_change_rate import inrusd_change_rate
from currencies_change_rate import btc_price
import json
import csv
import pandas as pd

# email
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import message
import smtplib
import ssl

# -----------------------------------------------------------------------

# API settings
url = "http://api.marketstack.com/v1/eod?access_key="
access_key = "ead4e53f61b04a1c3696c50b0dbad8da"
url_symbol = "&symbols="
url_limit = "&limit="
limit = str(1)

# -----------------------------------------------------------------------


# retrieves the last "eod" date of quotation (used in the csv export)
r = requests.get(url + access_key + url_symbol +
                 "SPOT" + url_limit + limit)
if r.ok:
    soup = BeautifulSoup(r.text, "html.parser")
    js = json.loads(soup.text)
    eod_date = "".join([d.get("date")
                        for d in js['data'] if d.get("date")])
# success

# the foreign exchange conversion into dollars and the calculation of the sum of the primary values
primary_values_list = ["UMG.XAMS", "SPOT", "TME", "WMG",
                       "SIRI", "SONO", "LYV", "IHRT", "RADIOCITY.XNSE", "BLV"]

primary_values_data_eod = []
primary_sum_eod = 0  # total of all primary values

for i in primary_values_list:
    r = requests.get(url + access_key + url_symbol + i + url_limit + limit)
    if r.ok:
        soup = BeautifulSoup(r.text, "html.parser")
        js = json.loads(soup.text)
        if i == "UMG.XAMS":
            eurusd_exchange_rate = str(float("".join(map(str, [d.get("close")
                                                               for d in js['data'] if d.get("close")]))) * eurusd_change_rate)
            umg_close = [float(eurusd_exchange_rate)]
            primary_values_data_eod += umg_close
            # convert the UMG share in euros into dollars and add it to the array of global values

        elif i == "BLV":
            eurusd2_exchange_rate = str(float("".join(map(str, [d.get("close")
                                                                for d in js['data'] if d.get("close")]))) * eurusd_change_rate)
            blv_close = [float(eurusd2_exchange_rate)]
            primary_values_data_eod += blv_close
            # convert the BLV share in euros into dollars and add it to the array of global values

        elif i == "RADIOCITY.XNSE":
            inrusd_exchange_rate = str(float("".join(map(str, [d.get("close")
                                                               for d in js['data'] if d.get("close")]))) * inrusd_change_rate)

            radiocity_close = [float(inrusd_exchange_rate)]
            primary_values_data_eod += radiocity_close
            # convert the Music Broadcast Ltd (RADIOCITY) share in Indian rupee into dollars and add it to the array of global values

        else:
            close = [d.get("close")
                     for d in js['data'] if d.get("close")]
            primary_values_data_eod += close
        # add the other values, already in dollars, to the array of global values

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
    (float(primary_sum_eod) + float(secondary_sum_eod)) / average_length, 2)

print(mmi_price_eod)
# success

# change MMI USD price into BTC price
mmi_btc_price_eod = mmi_price_eod / btc_price
print(mmi_btc_price_eod)
# success

# -----------------------------------------------------------------------

# Export MMI's datas to several CSV files, used in the build and the display of the MMI's graph and them save in back-up file
mmi_data_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\back\\mmi\\mmi_data.csv"
mmi_price_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_price.csv"
mmi_btc_price_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_btc_price.csv"
mmi_date_csv = "C:\\Users\\delar\\Desktop\\sidechain\\development\\racine\\ressources\\csv\\mmi_date.csv"

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
    w.writerow(["EOD price", "EOD date"])
    w.writerow([mmi_price_eod, eod_date])
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

with open(mmi_btc_price_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    btc_price_csv = [line for line in r]

with open(mmi_btc_price_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow([mmi_btc_price_eod])
    w.writerows(btc_price_csv)
# stock the MMI eod BTC price in a csv file, used to display on the website

# SUCCESS

with open(mmi_date_csv, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    date_csv = [line for line in r]

with open(mmi_date_csv, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow([eod_date])
    w.writerows(date_csv)
# stock only the date of MMI in a csv file, used to build the MMI graph.

# SUCCESS

# -----------------------------------------------------------------------

# SENDING EMAIL
# Allows you to check if the instance of VM, using to run this script automatically, work correctly.

# supplier
smtp_address = 'smtp.gmail.com'
smtp_port = 465

# sender address
email_address = 'sidechainfinance@gmail.com'
email_password = 'iRZ@)9P89qh('

# receiver address
email_receiver = 'sidechainfinance@gmail.com'

# message
message = MIMEMultipart("alternative")
message["Subject"] = "MMI daily EOD Price"
message["From"] = email_address
message["To"] = email_receiver

texte = '''
{} USD
from mmi_price.py localized in VM eodmmi01 (10.132.0.2) - Compute Engine by Google Cloud Platform
'''.format(mmi_price_eod)

html = '''
<html>
<body>
<h1>{} USD</h1>
<p>from mmi_price.py localized in VM eodmmi01 (10.132.0.2) - Compute Engine by Google Cloud Platform</p>
</body>
</html>
'''.format(mmi_price_eod)

texte_mime = MIMEText(texte, 'plain')
html_mime = MIMEText(html, 'html')
message.attach(texte_mime)
message.attach(html_mime)

# connexion to supplier and sending email to sidechain address
context = ssl.create_default_context()
with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
    # connexion
    server.login(email_address, email_password)
    # send email
    server.sendmail(email_address, email_receiver, message.as_string())

# SUCCESS
