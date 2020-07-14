from flask import Flask, render_template, request, jsonify
import os
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson.json_util import dumps
import json 
# from bson.objectid import ObjectId

app = Flask(__name__)

# # Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/moviesDB2")
client = MongoClient('mongodb://localhost:27017/')
mydb = client['moviesDB2']
mytable = mydb['movies']

@app.route('/')

def home():
    movie_data = mytable.find({"startYear": 1929}, {'_id':0})

    l = list(movie_data)
    return dumps(l)
    # movie_list = []
    # movie_dict = {}
    # for document in movie_data:
    #    movie_list.append(document)
    # movie_dict = dict(movie_list)
    # return movie_dict


# def home():
#      # Find one record of data from the mongo database
# #    return jsonify(mongo)
#    documents = collection.find()
#    response = []
#    for document in documents:
#        document['_id'] = str(document['_id'])
#        response.append(document)
#        return json.dumps(response)
    # Return template and data
    # return render_template("index.html", film=film_data)
    
    #d3 .json, api endpoints (hawaii assnment)
# @app.route('/scrape')
# def scrape():

#      # Run the scrape function
#     mars_scraped = mars_scrape.scrapeinfo()

#     # Update the Mongo database using update and upsert=True
#     mongo.db.collection.update({}, mars_scraped, upsert=True)

#     # Redirect back to home page
#     return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
