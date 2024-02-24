from application import app,db
from flask import jsonify
from bson import json_util
import json
import os
import csv

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

    file_path = os.path.join(os.path.dirname(__file__), 'countries.csv')
    with open(file_path, newline='') as csvfile:
        countries_reader = csv.DictReader(csvfile)
        countries = {row['name']: row for row in countries_reader}

    filtered_result = []
    for r in result:
        if(r['country']!=""):
            r['longitude'] = countries[r['country']]['longitude']
            r['latitude'] = countries[r['country']]['latitude']
            filtered_result.append(r)

    return jsonify(filtered_result)

@app.route('/world')
def world():
    file_path = os.path.join(os.path.dirname(__file__), 'test.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/no_of_articles/<flag1>/<flag2>')
def no_of_articles(flag1,flag2):
    # match_field = 'country' if flag1 == "country" else 'region' if flag1 == "region" else 'source'
    match_field = 'country' if flag1 == "country" else 'region' if flag1 == "region" else 'source' if flag1 == "source" else 'source'
    # Define the pipeline
    pipeline = [
        {
            '$match': {
                match_field: flag2
            }
        },
        {
            '$group': {
                '_id': f'${match_field}',
                'num_articles': {'$sum': 1}
            }
        },
        {
            '$project': {
                '_id': 0,
                match_field: '$_id',
                'num_articles': 1
            }
        }
    ]
    result = list(db.data.aggregate(pipeline))
    return jsonify(result)

    # pipeline = [
    # {   
    #     "$match": {
    #         "country" if flag1=="country" else "region": flag2
    #     } 
    # },
    # {
    #     '$group': {
    #         '_id': "$country" if flag1=="country" else "$region",
    #         'num_articles': {'$sum': 1}
    #     }
    # },
    # {
    #     "$project": {
    #         "_id": 0,
    #         "country" if flag1=="country" else "region": '$_id',
    #         "num_articles": 1
    #     }
    # }
    # ]
    # result = list(db.data.aggregate(pipeline))
    # return jsonify(result)
