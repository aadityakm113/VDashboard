from application import app,db
from flask import jsonify
from bson import json_util
import json


@app.route('/list')
def lists():
    data = db.data.find_one({"end_year": 2022})
    json_data = json_util.dumps(data)
    return json.loads(json_data)
    #return json.loads(json_util.dumps(db.data.find_one({"end_year": 2022})))
    
