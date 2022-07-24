# Calculation of the MMI's volatility

# import
import pandas as pd
import math
import csv

# file
mmi_global_data = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_data.csv"
export_volatility = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_volatility.csv"

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

# SUCCESS

# export volatilty datas
