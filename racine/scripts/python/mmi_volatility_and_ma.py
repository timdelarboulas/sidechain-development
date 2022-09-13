# Calculation of the MMI's volatility and the 20-day, 30-day, and 50-day Moving Average

# import
import pandas as pd
import math
import csv

# files
mmi_global_data = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_data.csv"
export_volatility = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_volatility.csv"
export_ma = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_ma.csv"

# Volatility

# get the data from the file mmi_price.csv and create a list with it
mmi_variations_list = pd.read_csv(
    mmi_global_data, names=["Variations"], nrows=31).T.values.tolist()[0]
mmi_variations_list.pop(0)  # delete the title of the column

# convert string list into a number list
mmi_variation_datas = [float(x) for x in mmi_variations_list if x == x]

# Variance
n = len(mmi_variation_datas)
mean = sum(mmi_variation_datas) / n
deviations = [(x - mean) ** 2 for x in mmi_variation_datas]
variance = sum(deviations) / n

# Standard deviation
standard_deviation = round(math.sqrt(variance), 10)
standard_deviation_percentage = round((standard_deviation * 100), 2)
print(f"Volatilité de {standard_deviation_percentage}%")

lines = []

with open(export_volatility, 'r') as fp:
    lines = fp.readlines()

with open(export_volatility, 'w') as fp:
    for number, line in enumerate(lines):
        if number not in [0]:
            fp.write(line)
# read the csv file and delete the first raw

with open(export_volatility, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    data_csv = [line for line in r]
# put csv file datas in a variable

with open(export_volatility, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(["MMI volatility (30days)"])
    w.writerow([standard_deviation])
    w.writerows(data_csv)


# Moving Average
mmi_prices_list = pd.read_csv(
    mmi_global_data, usecols=["EOD price"], sep=",", dtype={'EOD price': float}).T.values.tolist()[0]

mmi_price_20 = mmi_prices_list[:20]  # list with the last 20 data
mmi_price_30 = mmi_prices_list[:30]  # same with the last 30 data
mmi_price_50 = mmi_prices_list[:50]  # same with the last 50 data

# last 20-day mouving average
ma20 = round((sum(mmi_price_20)/len(mmi_price_20)), 6)
# last 30-day mouving average
ma30 = round((sum(mmi_price_30)/len(mmi_price_30)), 6)
# last 50-day mouving average
ma50 = round((sum(mmi_price_50)/len(mmi_price_50)), 6)

# export data
with open(export_ma, 'r') as fp:
    lines = fp.readlines()

with open(export_ma, 'w') as fp:
    for number, line in enumerate(lines):
        if number not in [0]:
            fp.write(line)
# read the csv file and delete the first raw

with open(export_ma, newline="", encoding="utf-8") as f:
    r = csv.reader(f)
    data_mm_csv = [line for line in r]
# put csv file datas in a variable

with open(export_ma, 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(["MM 20", "MM 30", "MM 50"])
    w.writerow([ma20, ma30, ma50])
    w.writerows(data_mm_csv)
