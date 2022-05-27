# import
from numpy import var
import pandas as pd
import math

# file
mmi_price_file = r"C:\Users\delar\Desktop\sidechain\development\racine\ressources\csv\mmi_price.csv"
mmi_global_data = r"C:\Users\delar\Desktop\sidechain\development\back\mmi\mmi_data.csv"

# get the data from the file mmi_price.csv and create a list with it
mmi_variations_list = pd.read_csv(
    mmi_global_data, names=["Variations"]).T.values.tolist()[0]

# convert string list into a number list
mmi_variation_datas = [int(x) for x in mmi_variations_list]

# Volatility calcul

# Variance
n = len(mmi_variation_datas)
mean = sum(mmi_variation_datas) / n
deviations = [(x - mean) ** 2 for x in mmi_variation_datas]
variance = sum(deviations) / n

# Standard deviation
standard_deviation = round(math.sqrt(variance), 10)
standard_deviation_percentage = standard_deviation * 100
print(standard_deviation_percentage)

# SUCCESS

# export volatilty datas
