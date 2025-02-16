import os
from pymongo import MongoClient
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user = os.getenv('MONGODB_USER')
pwd = os.getenv('MONGODB_PASS')
name = os.getenv('CLUST_NAME')

client = MongoClient(f'mongodb+srv://{user}:{pwd}@cluster0.kl2j8.mongodb.net/?retryWrites=true&w=majority&appName={name}')
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




