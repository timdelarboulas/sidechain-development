# pip install pandas-datareader --upgrade
# pip install yfinance --upgrade

# import
import pandas as pd
import math
import csv
from currencies_change_rate import eurusd_change_rate as eurusd, inrusd_change_rate as inrusd
import pandas as pd
from pandas_datareader import data as pdr
import yfinance
import numpy as np
import datetime as dt
from scipy.stats import norm

# files
mmi_price_data = r"C:\Users\delar\Desktop\sidechain\development\racine\ressources\csv\mmi_price.csv"
export_var = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_var.csv"

# historical VaR (95%, 10 days)
# calculate PnL of 1-month daily trade
# get the last 30 prices
mmi_1month_price_list = pd.read_csv(
    mmi_price_data, nrows=101).T.values.tolist()[0]

# convert list into an array of number
one_month_price_data = [float(x) for x in mmi_1month_price_list if x == x]

# calculate PnL
one_month_pnl = [round(one_month_price_data[i] - one_month_price_data[i + 1], 2)
                 for i in range(len(one_month_price_data) - 1)]

# calculation the mean price
n = len(one_month_price_data)
mean_price_for_100_days = sum(one_month_price_data)/n

# sort PnL in ascending order
one_month_pnl.sort()

# get the first 5 PnL values
var_historical_5_worst_results = one_month_pnl[0:5]

# get the maximum 1-day loss percentage, based on an average of the last 100 trading days, with a confidence index of 95%.
var_historical_percentage = (
    var_historical_5_worst_results[4] / mean_price_for_100_days)*-1

# initial investment in MMI Index
initial_ivmt = 1000

# get Var (95% 1 day)
var_h_1d = round((initial_ivmt * var_historical_percentage), 2)

# get the historical VaR 95% over 10 days
var_historical_n = 10  # days
var_h_10d = round(
    ((var_h_1d * math.sqrt(var_historical_n))), 2)

print(
    f"historic VaR (95%, 1 day) = {var_h_1d} USD ; historic VaR (95%, 10 days) = {var_h_10d} USD")

# SUCCESS
# -------

# parametric VaR (95%, 10 days)
# get the day of starting data (100 open days)
d = dt.date.today() - dt.timedelta(days=140)
start_day = str(d)

# mmi equities
# get primary-values data from yahoo to creat an array with one-month stock data
primary_trickers = ["UMG.AS", "SPOT", "TME", "WMG", "SIRI",
                    "SONO", "LYV", "IHRT", "RADIOCITY.NS", "BLV.PA"]

primary_values_data = pdr.get_data_yahoo(
    primary_trickers, start=start_day, end=dt.date.today())["Close"]

# change stock in EUR or INR into USD
df = pd.DataFrame(primary_values_data)
df["UMG.AS USD"] = df["UMG.AS"] * eurusd
df["RADIOCITY.NS USD"] = df["RADIOCITY.NS"] * inrusd
df["BLV.PA USD"] = df["BLV.PA"] * eurusd

# delete useful columns
df.drop("UMG.AS", axis=1, inplace=True)
df.drop("RADIOCITY.NS", axis=1, inplace=True)
df.drop("BLV.PA", axis=1, inplace=True)

# get secondary values data from yahoo to creat an array with one-month stock data
secondary_tickers = ["GOOGL", "SONY", "AAPL", "YNDX", "AMZN", "NTES"]
secondary_values_data = pdr.get_data_yahoo(
    secondary_tickers, start=start_day, end=dt.date.today())['Close']

# creat new columns with weighted price
df_2 = pd.DataFrame(secondary_values_data)
df_2["GOOGL W"] = df_2["GOOGL"] * 0.9220
df_2["SONY W"] = df_2["SONY"] * 0.1030
df_2["AAPL W"] = df_2["AAPL"] * 0.0870
df_2["YNDX W"] = df_2["YNDX"] * 0.0380
df_2["AMZN W"] = df_2["AMZN"] * 0.0680
df_2["NTES W"] = df_2["NTES"] * 0.1040

# delete useful columns
df_2.drop("GOOGL", axis=1, inplace=True)
df_2.drop("SONY", axis=1, inplace=True)
df_2.drop("AAPL", axis=1, inplace=True)
df_2.drop("YNDX", axis=1, inplace=True)
df_2.drop("AMZN", axis=1, inplace=True)
df_2.drop("NTES", axis=1, inplace=True)

# merge the two tables primary_values with secondary_values
frames = [df, df_2]
df_3 = pd.concat(frames, axis=1)
mmi_values = pd.DataFrame(df_3)

# Set the investment weights
weights_investment = np.array(
    [.0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625, .0625])

# Set an initial investment level
initial_investment = 1000

# calculate periodic returns for each stock
returns = mmi_values.pct_change(axis="rows", periods=1)

# Generate Var-Cov matrix
cov_matrix = returns.cov()

# Calculate mean returns for each stock
avg_rets = returns.mean()

# Calculate mean returns for portfolio overall
port_mean = avg_rets.dot(weights_investment)

# Calculate portfolio standard deviation
port_stdev = np.sqrt(weights_investment.T.dot(
    cov_matrix).dot(weights_investment))

# Calculate mean of investment
mean_investment = (1+port_mean) * initial_investment

# Calculate standard deviation of investmnet
stdev_investment = initial_investment * port_stdev

# Select our confidence interval
conf_level1 = 0.05
cutoff1 = norm.ppf(conf_level1, mean_investment, stdev_investment)

# calculate parametric VaR for One Day
var_1d = round((initial_investment - cutoff1), 2)

# for 10 days
var_10d = round((var_1d * math.sqrt(10)), 2)

print(
    f"parametric VaR (95%, 1 day) = {var_1d} USD ; parametric VaR (95%, 1O days) = {var_10d} USD.")

# SUCCESS
# SUCCESS
# -------------

# export data in a csv file
lines = []

with open(export_var, 'r') as fp:
    lines = fp.readlines()

with open(export_var, 'w') as fp:
    for number, line in enumerate(lines):
        if number not in [0]:
            fp.write(line)
# read the csv file and delete the first raw

with open(export_var, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    data_var_csv = [line for line in r]
# put csv file datas in a variable

with open(export_var, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(["VaR-H (95_1)", "VaR-H (95_10)",
               "VaR-Pa (95_1)", "Var-Pa (95_10)"])
    w.writerow([var_h_1d, var_h_10d, var_1d, var_10d])
    w.writerows(data_var_csv)

# SUCCESS

print("SUCCESS : the data has been stored in the file mmi_var.csv")
