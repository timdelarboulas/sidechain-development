import csv

file = open(
    r"C:\Users\delar\Desktop\sidechain\development\racine\ressources\csv\mmi_price.csv")

reader = csv.reader(file)
data = list(reader)


def variance(data):
    # Number of observations
    n = len(data)
    # Mean of the data
    mean = sum(data) / n
    # Square deviations
    deviations = [(x - mean) ** 2 for x in data]
    # Variance
    variance = sum(deviations) / n
    return variance


# variance(data)
