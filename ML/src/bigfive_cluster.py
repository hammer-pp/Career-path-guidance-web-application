import numpy as np 
import pandas as pd 
from matplotlib import pyplot as plt
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "..", "Data", "bigfive_data.csv")
csv_path = os.path.abspath(csv_path)

data_raw=pd.read_csv(csv_path,delimiter='\t')

data = data_raw.copy()
pd.options.display.max_columns = 150
data.drop(data.columns[50:107], axis=1, inplace=True)
data.drop(data.columns[51:], axis=1, inplace=True)
print('Number of participants: ', len(data))

############ Preprocessing ############
# Remove the columns that are not needed for clustering
data = data.drop(columns = ['EXT6','EXT9','EXT10','EST5','EST8','EST9','EST10','AGR5','AGR7','AGR9','CSN3','CSN5','OPN4','OPN5','OPN6','OPN8','OPN9'])
data[['EXT2','EXT4','EXT8','EST2','EST4','AGR1','AGR3','CSN2','CSN4','CSN6','CSN8']] = -data[['EXT2','EXT4','EXT8','EST2','EST4','AGR1','AGR3','CSN2','CSN4','CSN6','CSN8']]
df = data.drop('country', axis=1)

from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
import joblib

columns = list(df.columns)

# Standardize the data
scaler = MinMaxScaler()
df = scaler.fit_transform(df)
df = pd.DataFrame(df, columns=columns)
df = df.dropna(axis=0)
df_sample = df

# Save the scaler for later use
root_dir = os.path.abspath(os.path.join(current_dir, "..","artifacts"))
joblib.dump(scaler, os.path.join(root_dir, 'bigfive_scaler.pkl'))

############ Clustering ############
from sklearn.cluster import KMeans

n_label = 8
result = []
n_runs = 100

traits = {
    'Extroversion': ['EXT1', 'EXT2', 'EXT3', 'EXT4', 'EXT5',  'EXT7', 'EXT8'],
    'Agreeableness': ['AGR1', 'AGR2', 'AGR3', 'AGR4',  'AGR6',  'AGR8',  'AGR10'],
    'Conscientiousness': ['CSN1', 'CSN2',  'CSN4',  'CSN6', 'CSN7', 'CSN8', 'CSN9', 'CSN10'],
    'Neuroticism': ['EST1', 'EST2', 'EST3', 'EST4',  'EST6', 'EST7'],
    'Openness': ['OPN1', 'OPN2', 'OPN3',  'OPN7',  'OPN10']
}

for run in range(n_runs):
    # I define 5 clusters and fit my model
    kmeans = KMeans(n_clusters=n_label)
    k_fit = kmeans.fit(df_sample)

    # Predicting the Clusters
    pd.options.display.max_columns = 10

    #labels_ is used to identify Labels of each point
    predictions = k_fit.labels_
    df_sample['Clusters'] = predictions
    # df_sample.head(10)

# Save the preprocess with label data to a CSV file
current_dir = os.path.dirname(os.path.abspath(__file__))
csv_dir = os.path.abspath(os.path.join(current_dir, "..", "Data"))  # Path to folder
csv_path = os.path.join(csv_dir, "label_data_bigfive.csv")          # Full path with filename
df_sample.to_csv(csv_path, index=False)
print("Saved CSV to:", csv_path)