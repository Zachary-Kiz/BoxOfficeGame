import os
from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

url = os.getenv('MONGO_URL')
client = MongoClient(f'{url}')
collection = client['movieDatabase']['movies']

@app.route("/", methods=['GET'])
def get_movie():
    movies = collection.aggregate([{'$sample': {'size' : 10}}])
    movies = list(movies)
    
    if movies:
        # Convert ObjectId to string
        for doc in movies:
            doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        return jsonify(movies), 200
    
    return jsonify({"error": "No movie found"}), 404




