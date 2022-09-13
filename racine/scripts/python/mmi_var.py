# the purpose is to calculate two form ot the Value at Risk (historical VaR and parametric VaR) of the MMI.
# https://meritis.fr/vous-saurez-tout-sur-la-var/
# https://www.interviewqs.com/blog/value-at-risk
# https://www.educba.com/holding-period-return-formula/
# https://www.smartinvest.pro/fr/article/value-at-risk#:~:text=Exemple%20de%20calcul%20de%20VaR%20historique%20avec%20100%20PnL%20%3A&text=La%20VaR%20%C3%A0%205%25%20correspondra,000%20000%20%3D%20180%200000).

# import
import pandas as pd
import math
import csv

# files
mmi_price_data = r"C:\Users\delar\Desktop\sidechain\development\racine\ressources\csv\mmi_price.csv"
export_var = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_var.csv"

# historical VaR (95%, 10 days)
# step 1 : calculate PnL of 1-month daily trade
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
print(mean_price_for_100_days)

# sort PnL in ascending order
one_month_pnl.sort()
# get the first 5 PnL values
var_historical_5_worst_results = one_month_pnl[0:5]
# get the historical VaR 95% over 10 days
var_historical_percentage = round(((
    (var_historical_5_worst_results[4] / mean_price_for_100_days)*100)*-1), 2)
# get the maximum 1-day loss percentage, based on an average of the last 100 trading days, with a confidence index of 95%.
var_historical_n = 10  # days
var_historical_95_10 = round(
    ((var_historical_5_worst_results[4] * math.sqrt(var_historical_n)) * -1), 2)
print(
    f"perte maximale sur 1 jours: {var_historical_percentage}% ; Perte maximale théorique sur 10 jours: {var_historical_95_10}$")

# SUCCESS
# -------

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
    data_varh_csv = [line for line in r]
# put csv file datas in a variable

with open(export_var, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(["VaR-H (95%, 1 jour(%))", "VaR-H (95%, 10 jours($))"])
    w.writerow([var_historical_percentage, var_historical_95_10])
    w.writerows(data_varh_csv)

# SUCCESS
