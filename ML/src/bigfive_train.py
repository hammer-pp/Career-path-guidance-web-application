import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix, ConfusionMatrixDisplay, f1_score, precision_score, recall_score
import pickle
import os 
import matplotlib.pyplot as plt


current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "..", "Data", "label_data_bigfive.csv")
csv_path = os.path.abspath(csv_path)

df_sample =pd.read_csv(csv_path)

def train_model(model,param,X_train, X_test, y_train, y_test,model_name):

    # Apply GridSearchCV
    grid_search = GridSearchCV(estimator=model, param_grid=param, cv=5, n_jobs=-1, verbose=2)

    # Fit the model to training data
    grid_search.fit(X_train, y_train)
    
    # Print best parameters from GridSearchCV
    print("Best parameters found: ", grid_search.best_params_)

    # Evaluate the model with best parameters
    best_model = grid_search.best_estimator_

    # Make predictions
    y_pred_test = best_model.predict(X_test)

    # Print classification report and accuracy
    accuracy = accuracy_score(y_test, y_pred_test)
    precision = precision_score(y_test, y_pred_test, average="weighted")
    recall = recall_score(y_test, y_pred_test, average="weighted")
    f1 = f1_score(y_test, y_pred_test, average="weighted")
    cm = confusion_matrix(y_test, y_pred_test)
    print("==============================")
    print(f"         {model_name}         ")
    print("==============================")
    print("Accuracy:  {:.2f}%".format(accuracy * 100))
    print("Precision:  {:.2f}%".format(precision * 100))
    print("Recall:  {:.2f}%".format(recall * 100))
    print("F1 Score:  {:.2f}%".format(f1 * 100))


    labels = sorted(y_test.unique())
    disp = ConfusionMatrixDisplay(confusion_matrix=cm)
    fig,ax = plt.subplots(figsize=(8, 6))
    disp.plot(cmap='viridis', ax=ax)
    ax.grid(False)
    plt.show()

    return best_model

X = df_sample.drop('Clusters', axis=1)
y = df_sample['Clusters'] 

import xgboost as xgb

# Create BGBoost model
xgb_model = xgb.XGBClassifier()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Define parameter grid for GridSearchCV
param_grid_xgb = {
    'n_estimators': [100],  # Number of trees to build
    'learning_rate': [ 0.1],  # Step size shrinkage used in updates
    'max_depth': [None],  # Maximum depth of a tree
    'min_child_weight': [1],  # Minimum sum of weights of all observations needed in a child
    'subsample': [1],  # Fraction of samples used for fitting each tree
    'colsample_bytree': [1.0],  # Fraction of features used for tree building
}

XGBoost = train_model(xgb_model,param_grid_xgb,X_train, X_test, y_train, y_test,'XGBoost')

train_accuracies_xgb = []
test_accuracies_xgb = []
n_estimators_list = range(1,21)

current_dir = os.path.dirname(os.path.abspath(__file__))
# Full path to save the model in ML/
root_dir = os.path.abspath(os.path.join(current_dir, "..","artifacts"))
# Full path to save the model in ML/artifacts
model_path = os.path.join(root_dir, "xgb_model_bigfive.pkl")


# Save the model
with open(model_path, 'wb') as xgboost_big5:
    pickle.dump(XGBoost, xgboost_big5)

print("Model saved to:", model_path)
