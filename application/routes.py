from application import app,db
from flask import jsonify
from bson import json_util
import json


@app.route('/')
def lists():
    data = db.data.find_one({"end_year": 2022})
    
    # Convert BSON document to JSON
    json_data = json_util.dumps(data)
    
    # Return JSON response
    return json.loads(json_data)
    #return json.loads(json_util.dumps(db.data.find_one({"end_year": 2022})))

