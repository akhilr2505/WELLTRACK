from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import pandas as pd
import json
import re
import csv 

import array as a
import json

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM
import numpy 
from numpy import array

app = Flask(__name__)
CORS(app)
api = Api(app)

def find_pred(employee):

    cols = ['Date', 'ID', 'Name','Score'] 

    pdObj = pd.read_json('https://timeseries-emp.herokuapp.com/readdata')

    data = pdObj.Data

    cvsfile=""
    data_file = open('./file.csv', 'w')
    csv_writer = csv.writer(data_file)
    count = 0
    for d in data:
        if count == 0:
    
            # Writing headers of CSV file
            header = d.keys()
            csv_writer.writerow(header)
            count += 1
    
        # Writing data of CSV file
        csv_writer.writerow(d.values())
    
    data_file.close()

    df = pd.read_csv('./file.csv')


    booleans = []



    for result in df.id:
        if re.search(employee, result):
            booleans.append(True)
        else:
            booleans.append(False)

    filter = pd.Series(booleans)

    df = df[filter]


    df1=df.reset_index()["score"]

    from sklearn.preprocessing import MinMaxScaler
    scaler=MinMaxScaler(feature_range=(0,1))
    df1=scaler.fit_transform(numpy.array(df1).reshape(-1,1))



    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset)-time_step-1):
            a = dataset[i:(i+time_step), 0]
            dataX.append(a)
            dataY.append(dataset[i + time_step, 0])
        return numpy.array(dataX), numpy.array(dataY)

    time_step = 7
    X_train, y_train = create_dataset(df1, time_step)

    X_train =X_train.reshape(X_train.shape[0],X_train.shape[1] , 1)

    model=Sequential()
    model.add(LSTM(50,return_sequences=True,input_shape=(7,1)))
    model.add(LSTM(50,return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss="mean_squared_error", optimizer="adam")

    model.fit(X_train, y_train, validation_data=(X_train,y_train), epochs=5, batch_size=64, verbose=1)

    to_predict=df1[len(df1)-7:len(df1)]
    to_predict=to_predict.reshape(1,7,1)

    train_predict=model.predict(to_predict)

    train_predict = scaler.inverse_transform(train_predict)


    train_predict=train_predict.reshape(1)

    # d = dict(enumerate(train_predict.flatten(), 1))
    jsonString=json.dumps(str(train_predict))+employee

    return jsonString





class lstm(Resource):

    def get(self):
        query = request.args.get('query')

        pred_value= find_pred(query)

        return pred_value

api.add_resource(lstm, '/')

if __name__ == '__main__':
    app.run(debug=True)
