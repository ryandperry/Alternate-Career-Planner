# only need one fetch if we only call from the javascript once 

# linux computer??

# sudo apt install python3-pip -y 

# install flask: 
# sudo pip3 install flask 

#interacting with the api 
#pip3 install requests 

#nano flasktest.py

from flask import Flask

app = Flask(__name__)


#  python decorator: add more functionality ?
# route is the place to go 
# when someone goes to the root of the website -->

# when they go to the root of the website this function will print out 
@app.route("/results")
def index():
    
    return "string"


app.run(host="0.0.0.0", port=80)
# flask. run on our host 