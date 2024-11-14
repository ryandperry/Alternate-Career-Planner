#flask tutorial make basic flask app
# create flask API with /api/hello endpoint that 
#returns a JSON repsonse

from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes so react can connect

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "This is a test of a passed course!"})

@app.post("/RyanData")
def get_ryan_data():
    if request.is_json:
      ryan_data = request.get_json()
      print(ryan_data)

      #make a new JSON and return it to Ryan 
      results_data = {"Computer Science": "PHYS341"}
      results_json = json.dumps(results_data)
      return results_json
    return {"Error": "Request must be JSON"}, 415

#make route for each page/request that's needed
#post and get requests
#put this app request at the bottom of our current code,
#and overwrite the main with this

#

if __name__ == '__main__':
    app.run(debug=True)
