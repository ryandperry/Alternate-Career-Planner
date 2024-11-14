#flask tutorial make basic flask app
# create flask API with /api/hello endpoint that 
#returns a JSON repsonse

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes so react can connect

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Emily!"})

if __name__ == '__main__':
    app.run(debug=True)
