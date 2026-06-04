from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_store = []

@app.route('/api', methods=['GET'])
def get_data():
    return jsonify(data_store)

@app.route('/api', methods=['POST'])
def add_data():
    data = request.json
    data_store.append(data)
    return jsonify({"message": "Data added successfully"})

@app.route('/')
def home():
    return "Backend is running"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)