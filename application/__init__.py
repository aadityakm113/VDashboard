from flask import Flask
from flask_pymongo import PyMongo
import pymongo
import json
from pymongo import MongoClient, InsertOne

app=Flask(__name__)
app.config["MONGO_URI"]="mongodb+srv://chalasanisiddarth:var1sid2@dashboard.vitz1t0.mongodb.net/?retryWrites=true&w=majority"


mongodb_client=PyMongo(app)
db=mongodb_client.db
collection=db.getCollection("COLLECTION");
requesting=[]

with open(r"jsondata.json") as f:
    for jsonObj in f:
        myDict = json.loads(jsonObj)
        requesting.append(InsertOne(myDict))

result = collection.bulk_write(requesting)


from application import routes