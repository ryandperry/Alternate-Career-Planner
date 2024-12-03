# # they might have to be in the same folder

# # after data cleaning is over, you should move all the 
# # csvs and all the population.py into this folder so we can 
# # properly import them 
# from population.py import Major, Course, Bucket
# # only need one fetch if we only call from the javascript once 

# # linux computer??

# # sudo apt install python3-pip -y 

# # install flask: 
# # sudo pip3 install flask 

# #interacting with the api 
# #pip3 install requests 

# #nano flasktest.py

# from flask import Flask

# app = Flask(__name__)


# #  python decorator: add more functionality ?
# # route is the place to go 
# # when someone goes to the root of the website -->

# # when they go to the root of the website this function will print out 
# @app.route("/results")
# def index():
#     # ../../data_collection/population_sp4_be.py/
#     course_objects = build_course_objects()
#     bucket_objects = build_bucket_objects(course_objects)
#     print(course_objects)
#     print(bucket_objects)
#     majorid = 1
#     #classes_array = ["EF 151", "EF 230", "MATH 141"]
#     # fetch the json from ryan for classes_array 
#     # quiz_results = "ME"

#     # the JSON will have the quiz results, major and classes array of objects
#     #   grade received is in classes array 
#     person_object = Person(major=majorid, classes_array=classes_array, quiz_results=quiz_results)
#     major_objects = build_major_objects(course_objects=course_objects, bucket_objects=bucket_objects)
#     print(major_objects)
#     compare_academic_history(person_object=person_object, major_objects=major_objects, course_objects=course_objects, bucket_objects=bucket_objects)
#     return "string"


# app.run(host="0.0.0.0", port=80)
# # flask. run on our host 