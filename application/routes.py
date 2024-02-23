from application import app,db
from flask import jsonify
from bson import json_util
import json
import os

@app.route('/list')
def lists():
    data = db.data.find_one({"end_year": 2022})
    json_data = json_util.dumps(data)
    return json.loads(json_data)
    #return json.loads(json_util.dumps(db.data.find_one({"end_year": 2022})))

@app.route('/countries/<flag>')
def countries(flag):
    pipeline = [
        {
            "$group": {
                "_id": "$country" if flag=="country" else "$region",
                "frequency": {"$sum": 1}
            }
        },
        {
            "$project": {
                "_id": 0,
                "country" if flag=="country" else "region": "$_id",
                "frequency": 1
            }
        }
    ]

    result = list(db.data.aggregate(pipeline))
    return jsonify(result)

@app.route('/world')
def world():
    file_path = os.path.join(os.path.dirname(__file__), 'world.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/no_of_articles/<flag1>/<flag2>')
def no_of_articles(flag1,flag2):
    
    pipeline = [
    {   
        "$match": {
            "country" if flag1=="country" else "region": flag2
        } 
    },
    {
        '$group': {
            '_id': "$country" if flag1=="country" else "$region",
            'num_articles': {'$sum': 1}
        }
    },
    {
        "$project": {
            "_id": 0,
            "country" if flag1=="country" else "region": '$_id',
            "num_articles": 1
        }
    }
    ]
    result = list(db.data.aggregate(pipeline))
    return jsonify(result)
