from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import pandas as pd
import numpy as np
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

df = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vToZQX0aZwoLjyY3e-P78UXAq0oMhbnx4YMAWcxktqJzzB4ZI1peeB_807Dz71hXJnRSEJ4qhjZ66pq/pub?output=csv')
data = df.mean(axis=0)
sum = data.sum()
ans = data/sum
weight = ans.values
d = dict(enumerate(weight.flatten(), 1))
jsonString = json.dumps(d)


class weights(Resource):

    def get(self):
        
        return jsonString

api.add_resource(weights, '/')

if __name__ == '__main__':
    app.run(debug=True)
