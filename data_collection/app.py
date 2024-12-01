# Database Population Script
# Takes in an excel with major, bucket, and course information
# Builds tables for each major
# Builds lists of course, major, and bucket information
# Prepares data for the algorithm to match students -> majors

# TO RUN:
# select all (cntl+a)
# shift+enter to use interactive window
# highlight the contents of main
# shift+enter to run whatever is in main

import pandas as pd
import json
import os

from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes so react can connect


# update filenames here instead of in the code
filenames = {
  "Bucket Table": "bucket_table.csv",
  "Major Table": "major_table.csv",
  "Course Table": "course_table.csv",
  "PreReq/CoReq Table": "prereq_coreq.csv",
  "Major Requirements Folder Name": "major_requirement_csvs",
  "Major Requirements Prefix": "major_",
  "Results_JSON": "comparison_json.json"
}

#global sets that everyone needs access to?

class Major:
  def __init__(self, major_id, abbr, name, description):
    self.major_id = major_id
    self.abbr = abbr
    self.name = name
    self.description = description
    self.course_ids = set()
    self.bucket_ids = set()



class Course:
  def __init__(self, course_id, description, hours):
    self.course_id = course_id
    self.names = set()
    self.description = description
    self.hours = hours
    self.prereq_courseids = set()
    self.coreq_courseids = set()


class Bucket:
  def __init__(self, bucket_id, name, num_hours, num_courses):
    self.bucket_id = bucket_id
    self.name = name
    self.num_hours = num_hours
    self.num_courses = num_courses
    self.course_names = set()
    self.course_ids = set()
    self.other_bucket_ids = set()

# class Person:
#   def __init__(self, major, classes_array, quiz_results):
#     self.classes_array = classes_array


# from the course table, build a course object with 
# ID, description, name, credit hours, prereqs, and coreqs
def build_course_objects():
  try:
    course_table = pd.read_csv(filenames['Course Table'], dtype=str)
  except:
    course_table = pd.read_csv('data_collection/'+filenames['Course Table'], dtype=str)
  course_table = course_table.fillna("NULL")
  
  course_objects = {}
  for row in course_table.index:
      course_id = course_table.loc[row, "Course ID"]
      #if this course ID already exists, add this current name to the list of names
      if course_id in course_objects.keys():
        # print(row, " key already made, adding ", course_table['Course'][row])
        course_objects[course_id].names.add(course_table['Course'][row].replace(" ",""))
      else:
        #make a new course object for this entry
        # print(row," making new key, adding ", course_table.loc[row, 'Course ID'], " with names ",course_table['Course'][row] )
        course_object = Course(course_table.loc[row, 'Course ID'], course_table.loc[row, 'Course Description'], course_table.loc[row, 'Course Hours'])
        course_object.names.add(course_table['Course'][row].replace(" ",""))
        course_objects[str(course_id)] = course_object

  # PREREQs and COREQs
  try:
    prereqs = pd.read_csv(filenames['PreReq/CoReq Table'], dtype=str)
  except:
    prereqs = pd.read_csv('data_collection/'+filenames['PreReq/CoReq Table'], dtype=str)

  prereqs = prereqs.fillna("NULL")
  #for each row (each course and P/C pairing)
  for row in prereqs.index:
    #get this current row's course name and course ID
    current_course_name = prereqs['Course'][row].replace(" ","")
    current_course_ID = prereqs['Course ID'][row]

    #get this current row's req class name or req course ID
    current_req_name = prereqs['PreReq/CoReq Course'][row].replace(" ","")
    current_req_ID = prereqs['Pre-Req Course ID'][row]

    #this whole row is empty
    if((current_course_name == 'NULL' and current_course_ID == "NULL") or 
       (current_req_name == "NULL" and current_req_ID == "NULL")):
      continue

    #handle the case where the course ID is null
    if(current_course_name != "NULL" and current_course_ID == "NULL"):
      #need to get the ID to be able to match course IDs
      for course_obj in course_objects.values():
        # print(course_obj.names)
        if current_course_name in course_obj.names:
          # print("found")
          current_course_ID = course_obj.course_id
    
    #if it doesnt have an ID, find it and save it
    if(current_req_ID == "NULL"):
      for course in course_objects.values():
        if(current_req_name in course.names):
          current_req_ID = course.course_id

    if(current_course_ID == "NULL" or current_req_ID == "NULL"):
      continue
    
    # for this row's requirement,
    # save it to the course object's prereq or coreq list
    if(prereqs['Co-req or Pre-req'][row] == 'P'):
      course_objects[current_course_ID].prereq_courseids.add(current_req_ID)
    if(prereqs['Co-req or Pre-req'][row] == 'C'):
      course_objects[current_course_ID].coreq_courseids.add(current_req_ID)
              
  return course_objects

def build_bucket_objects(course_objects):
  try:
    bucket_table = pd.read_csv(filenames['Bucket Table'], dtype=str)
  except:
    bucket_table = pd.read_csv('data_collection/'+filenames['Bucket Table'], dtype=str)
  bucket_table= bucket_table.fillna("NULL")

  bucket_objects = {}
  for row in bucket_table.index:
      bucket_id = bucket_table['Bucket ID'][row]
      #make sure number of hours and number of courses are integers not strings
      # do we want to do this in the algorithm or the data processing?
      num_hours = bucket_table.loc[row, 'Bucket Number of Hours']
      if (num_hours != "NULL"): num_hours = int(num_hours);
      else: num_hours = -1
      num_courses = bucket_table.loc[row, "Bucket Number of Courses"]
      if (num_courses != "NULL"): num_courses = int(num_courses);
      else: num_courses = -1

      bucket_obj = Bucket(bucket_id=bucket_table.loc[row, 'Bucket ID'], name =bucket_table.loc[row, 'Bucket Name'],num_hours=num_hours, num_courses=num_courses)

      #seperate out the course names in semi-colon seperated list
      if(bucket_table['Course Names'][row] != "NULL"):
        bucket_obj.course_names = set(bucket_table['Course Names'][row].replace(" ", "").split(";"))

      for current_course_name in bucket_obj.course_names:
        # find this course ID in the course objects list
        for course_obj in course_objects.values():
          if(current_course_name in course_obj.names):
            # print("found a matching name")
            bucket_obj.course_ids.add(course_obj.course_id)

      #add the sequence IDs (other bucket ids.. we can think of a better name)
      if( bucket_table['Sequence Bucket IDs'][row] != "NULL"):
        bucket_obj.other_bucket_ids = set(bucket_table['Sequence Bucket IDs'][row].replace(" ", "").split(";"))

      # save this new bucket object
      bucket_objects[str(bucket_id)] =  bucket_obj

  return bucket_objects

#there are csvs for each major requirements
#(from our "database")
#name them major_ID like major_1 (which is CS)
#place them in the major requirements csv folder

def build_major_objects(course_objects, bucket_objects):
  try:
    major_table = pd.read_csv(filenames['Major Table'], dtype=str)
  except:
    major_table = pd.read_csv('data_collection/'+filenames['Major Table'], dtype=str)
  major_table = major_table.fillna("NULL")
  major_objects = {}
  for row in major_table.index:
      major_id = major_table.loc[row, 'Major ID']
      major_obj = Major(major_table.loc[row, 'Major ID'], major_table.loc[row, 'Major Abreviation'], major_table.loc[row, 'Major Name'], major_table.loc[row, 'Major Description'])
      major_objects[str(major_id)] = major_obj

  for major_id in major_objects.keys():
    major_object = major_objects[major_id]
    
    if( major_object.major_id == "NULL"):
      continue

    relative_filename = filenames['Major Requirements Folder Name']+'/' + filenames['Major Requirements Prefix'] + str(int(major_object.major_id)) + '.csv'
    outside_filename = 'data_collection/' + filenames['Major Requirements Folder Name']+'/' + filenames['Major Requirements Prefix'] + str(int(major_object.major_id)) + '.csv'
    try:
      try:
        major_requirements = pd.read_csv(relative_filename, dtype=str)
      except:
        major_requirements = pd.read_csv(outside_filename, dtype=str)
    except:
      #if this csv isnt in the folder yet, just skip it
      continue
    #fill in everything that's null in the excel 
    major_requirements = major_requirements.fillna("NULL")

    #make the course and bucket objects using either the ID or the name
    #example: if the row has a course (MATH 141), lookup in the dictionary
      #of courses for that and add the course ID to major.course_ids set()
    #example: if the row has course ID 5, then add that ID
    for row in major_requirements.index:
      #get the course ID or bucket ID for this major requirement
      bucket_ID = major_requirements['Required Bucket ID'][row]
      course_ID = major_requirements['Required Course ID'][row]
      course = major_requirements['Required Course'][row]
    
      #if this row has a bucket, use the bucket ID
      if(bucket_ID != "NULL"):
        major_object.bucket_ids.add(str(bucket_ID))
      
      elif(course_ID != "NULL"):
        major_object.course_ids.add(str(course_ID))
      
      elif(course != "NULL"):
        course_ID = [course_obj.course_id for course_obj in course_objects.values() if course in course_obj.names]
        major_object.course_ids.add(str(course_ID))
  
  return major_objects

# def adding_person(personCourseObjects, major_objects):
#   # personCourseObjects is the array of course objects from Ryans parsing code 
#   # major will hopefully also be from ryan's code
#   # and then what they scored on the quiz is the quiz_major string 
#   # from the output from ryan's code , we will do the following 
#   # Ryan's code will create an array of course obects 

#   # major object is from our own stuff 

#   # changing both of the names into IDs so we can store those ids in our one person 
#   for majors in major_objects:
    
#     func_classes_array = []
#     for i in personCourseObjects:
#       # TODO check if grade works
#       if personCourseObjects[i].grade in ["A", "A-", "B+", "B", "B-", "C+", "C", "S"]:
#         # if they got higher than a C, add it to the person object
#         func_classes_array.append(personCourseObjects[i].course_name)

#     OnlyOnePerson = func_classes_array
#   return OnlyOnePerson

def processing_course(course_objects, ryan_data):
  # list of strings
  # from ryan - list of strings

  #take ryan course objects and pull out the valid course codes
  person_classes = []
  for class_info in ryan_data:
    # TODO check with some TA or W's 
    if class_info['grade'] in ["A", "A-", "B+", "B", "B-", "C+", "C", "S"]:
      person_classes.append(class_info['courseCode'])
  
  # goal - build set of ids (of classes that they took)
  history_ids = set()
  for history_name in person_classes:
    for course in course_objects.values():
      # TODO if history name in course.names
      if(history_name.replace(" ", "") in course.names):
      # if(course.name == history_name):  
        history_ids.add(course.course_id)
  return history_ids


def compare_academic_history(ryan_data, major_objects, course_objects, bucket_objects):
  #major_objects is the dictionary of major objects 
  hour_counter = 0
  max_number_of_hours = 0
  # check in every major 
  # copy_major_objects = major_objects
  history_ids = processing_course(course_objects=course_objects, ryan_data=ryan_data)
  for i in major_objects.keys():
    copy_major_objects = major_objects
    hour_counter = 0

    #TODO IF this is the industrial engineering major, use this elective function
    # OR just make a bucket with all these classes in it for IE electives/tech electives
    #run the execptions code on their history id's
    if(major_objects[str(i)].abbr == "IE"):
      #this is the industrial major, so you need to account for their electives and tech electives
      copy_major_objects, hour_counter = ie_electives(course_objects, 
                                                      history_ids, 
                                                      copy_major_objects, 
                                                      hour_counter)

    # check their courses 
    for course_taken in history_ids:
      # see if it is in the course_ids set for this major 
      if course_taken in major_objects[i].course_ids:
        course_taken_id = int(course_taken)
        if course_taken_id in course_objects:
          hour_counter += int(course_objects[course_taken_id].hours)
        #  delete major_objects[i].course_ids
          del copy_major_objects[course_taken_id]
          continue
      # see if this course is in their bucket objects 
      for bucket_id in bucket_objects.values():
        if course_taken in bucket_id.course_ids:
          hour_counter += int(course_objects[course_taken].hours)
          if(bucket_id.num_hours > 0):
            bucket_id.num_hours -= int(course_objects[course_taken].hours)
          # delete the bucket?
        #somewhere in here we need to check if it is part of a bucket
      # if(course_taken in bucket_objects)
      #if("person_object.classes_array[course_taken]" in bucket_objects.values()):
          #pseudo code : 
          # if this course name appears in the bucket objects' course names 
          #if()
          # then you need to see if this one class will fill the entire requirement via the course table hours !! 
          # if it does not fill the entire requirement, manually subtract the hours required for that bucket
          # if it does fill the whole requirement add that number to hour_counter
      # look up the course id in the major dictionary at this i 
      if hour_counter > max_number_of_hours:
        max_number_of_hours = hour_counter
        major = i
        array_of_highest = major_objects[i].course_ids
  print(max_number_of_hours)
  print(copy_major_objects[i])
  return max_number_of_hours, copy_major_objects

#search student's history id's for speicifc classes to meet tech elective requirements
def ie_electives(course_objects, history_ids, copy_major_objects, hour_counter):
  
  ie_electives_ids = set()
  ie_electives_ids = {'191', '192', '193', '185', '187', '194', '186', '188', '189', '190'}
  # KEEP - last calculated 11/30
  # ie_electives = set()
  # ie_electives = ("IE423", "IE430", "IE452", "IE457", "IE465", "IE483", "IE484", "IE493", "IE494", "IE495")
  # for course_name in ie_electives:
  #   for course_id in course_objects.keys():
  #     if course_name in course_objects[course_id].names:
  #       ie_electives_id.add(course_id)

  # tech electives can choose from some specific classes
  ie_singular_option_ids = set()
  ie_singular_option_ids = {'201', '203', '78', '199', '108', '194', '186', '198', '204', '189', '200', '166', '192', '196', '209', '205', '190', '197', '208', '210', '185', '187', '212', '211', '188', '207', '191', '161', '217', '163', '193', '100', '162', '145', '106', '195', '206'}
  # KEEP - last calculated 11/30
  # ie_singular_options = set()
  # ie_singular_options = ("DATA 301", "DSGN 430", "ECE 255", "ECE 463", "ECON 311", "ECON 313", "ECON 322", "ECON 331", 
  #                        "ECON 333", "ECON 351", "ENT 350", "ENT 415", "ENT 425", "ENT 451", "ENT 460", "ENT 492", "FINC 300", 
  #                        "IE 423", "IE 430", "IE 452", "IE 457", "IE 465", "IE 483", "IE 484", "IE 493", "IE 494", "IE 495",
  #                          "MARK 300", "MGT 300", "MSE 405", "ME 321", "ME 365", "ME 366", "ME 367", "MSE 302",
  #                          "MSE 340", "MSE 360", "MSE 390", "NE 342")
  # for course_name in ie_singular_options:
  #   for course_id in course_objects.keys():
  #     if course_name.replace(" ", "") in course_objects[course_id].names:
  #       ie_singular_option_ids.add(course_id)

  #and theyre also allowed to have up to 3 hours of these three classes (basically just one class)
  ie_three_hours_of_ids = set()
  ie_three_hours_of_ids = {'213', '214', '202'}
  # KEEP - last calculated: 11/30
  # ie_three_hours_of = set()
  # ie_three_hours_of = ("EF 333", "IE 350", "IE 450" )
  # for course_name in ie_three_hours_of:
  #   for course_id in course_objects.keys():
  #     if course_name.replace(" ", "") in course_objects[course_id].names:
  #       ie_three_hours_of_ids.add(course_id)

  #CHECK if their history ids has any electives done 
  elective_hours = 0
  for history_id in history_ids:
    if history_id in ie_electives_ids:
      # this means they've taken a class that counts for an IE elective
      # update beatrice's main tracking: hours and major objects
      elective_hours += int(course_objects[history_id].hours)
      #needs 9 hours total of IE electives (3 classes)
      if(elective_hours > 9):
        break

      hour_counter += int(course_objects[history_id].hours)
      try:
        del copy_major_objects[history_id]
        try:
          ie_singular_option_ids.remove(history_id)
        except:
          continue
      except:
        continue
      # remove this as a valid tech elective (per exceptions rules)
      ie_singular_option_ids.remove(history_id)
  
  #after checking for ie electives, check if they've taken one of the 3 hour tech elective courses
  tech_hours = 0
  for history_id in history_ids:
    if history_id in ie_three_hours_of_ids:
      tech_hours += int(course_objects[history_id].hours)
      if(tech_hours > 3):
        break

      hour_counter += int(course_objects[history_id].hours)
      try:
        del copy_major_objects[history_id]
      except:
        break
      break

  # after checking those 3 hours, check for tech electives from the main options
  for history_id in history_ids:
    if history_id in ie_singular_option_ids:
      # they've taken a class that counts for an IE TECH elective
      tech_hours += int(course_objects[history_id].hours)
      #needs 6 hours total of a tech elective (2 classes)
      if(tech_hours > 6):
        break

      hour_counter += int(course_objects[history_id].hours)
      try:
        del copy_major_objects[history_id]
      except:      
        continue

  return copy_major_objects, hour_counter


def print_course_obj(course_object):
  course_name = course_object.names
  course_hrs = course_object.hours
  course_prereq_id = course_object.prereq_courseids
  course_data = {
    "course_name": [],
    "course_description": [],
    "course_hrs": course_hrs
  }
  print_statement = "\nCourses: "
  print_statement += course_object.course_id + " "
  for y in course_name:
    print_statement += y + " "
    course_data["course_name"].append(y)

  if course_object.description == "NULL":
    print_statement += "\nDescription: N/A" + "\nRequires " + course_hrs + " hours"
    course_data["course_description"].append("Description: N/A")
  else:
    print_statement += "\nDescription: " + course_object.description + "\nRequires " + course_hrs + " hours"
    course_data["course_description"].append("Description: " + course_object.description)
  
  if len(course_prereq_id) != 0:
    print_statement += ", these prereqs "
    for x in course_prereq_id:
      print_statement += x
      
  print_statement += "\n"
  return course_data
  return print_statement

def print_bucket_obj(bucket_object):
  bucket_name = bucket_object.name
  num_hrs = bucket_object.num_hours
  num_courses = bucket_object.num_courses

  courses = bucket_object.course_names

  bucket_data = {
    "bucket_name": bucket_name,
    "bucket_hours": num_hrs,
    "bucket_num_courses": num_courses,
    "bucket_sentence": [],
    "course_name": []
  }

  #print_statement = "\nBucket: " + bucket_name + " has these courses "
  if bucket_object.bucket_id == "45":
    #bucket_data["course_name"].append("5 Technical Electives")
    bucket_data["bucket_sentence"].append("Choose 5 Biomedical Technical Electives")
    return bucket_data
  elif bucket_object.bucket_id == "41":
    bucket_data["bucket_sentence"].append("Choose 4 Nuclear Engineering Technical Electives")
    return bucket_data
  elif bucket_object.bucket_id == "80":
    bucket_data["bucket_sentence"].append("Choose 3 Computer Engineering Senior Electives")
    return bucket_data
  for x in courses:
    #print_statement += x + " "
    bucket_data["course_name"].append(x)
  if num_hrs == -1:
    #print_statement += "\n"
    bucket_data["bucket_sentence"].append("Choose " + str(num_courses) + " courses from the list of courses below")
  else:
    bucket_data["bucket_sentence"].append("Choose " + str(num_hrs) + " hours from the courses listed below")
    #print_statement += "\nFor a total of " + str(num_hrs) + " hours"
  #print_statement += "\n"

  return bucket_data
  #return print_statement
def print_major_obj(major_object, course_object, bucket_object): 
  maj_cour_ids = major_object.course_ids
  maj_buck_ids = major_object.bucket_ids
  name = major_object.name
  print_statement = name
  output_file = filenames["Results_JSON"]
  existing_data = []

  major_data = {
    "major_name": name,
    "courses": [],
    "buckets": [],
  }
  for x in maj_cour_ids:
    if x in course_object:
      #print_statement += print_course_obj(course_object=course_object[x])
      major_data["courses"].append(print_course_obj(course_object=course_object[x]))
  for y in maj_buck_ids:
    if y in bucket_object:
      #in here is where we can add the hard coded exceptions for the odd buckets that we already found
      #print_statement += print_bucket_obj(bucket_object=bucket_object[y])
      major_data["buckets"].append(print_bucket_obj(bucket_object=bucket_object[y]))

  if os.path.exists(output_file):
    with open(output_file, "r") as json_file:
      try:
        existing_data = json.load(json_file)
        if isinstance(existing_data, dict):
          existing_data = [existing_data]
      except json.JSONDecodeError:
        existing_data = []

  existing_data.append(major_data)
  
  with open(output_file, "w") as json_file:
    json.dump(existing_data, json_file, indent=4)
  return print(print_statement)

def dev_main(ryan_data):
  course_objects = build_course_objects()
  """
  for course_obj in course_objects.values():
    print("Course Names: ", course_obj.names)
    print("Course ID: ", course_obj.course_id)
    print("Prereq IDs: ", course_obj.prereq_courseids)
    print("Coreq IDs: ", course_obj.coreq_courseids)
  """

  bucket_objects = build_bucket_objects(course_objects)
  """
  for bucket_obj in bucket_objects.values():
    print("Name: ", bucket_obj.name)
    print("Course Names: ", bucket_obj.course_names)
    print("Course IDs: ", bucket_obj.course_ids)
    if bucket_obj.other_bucket_ids != set():
      print("Other Bucket IDs: ", bucket_obj.other_bucket_ids)
  """


  major_objects = build_major_objects(course_objects=course_objects, bucket_objects=bucket_objects)
  """
  for major_obj in major_objects.values():
    print("Name: ", major_obj.name)
    print("Course IDs: ", major_obj.course_ids)
    if major_obj.bucket_ids != set():
      print("Bucket IDs: ", major_obj.bucket_ids)
  """


  #for i in course_objects:
    #print_course_obj(course_object=course_objects[i])
  #for i in bucket_objects:
    #print_bucket_obj(bucket_object=bucket_objects[i])
  #for i in major_objects:
    #print_major_obj(major_object=major_objects[i], course_object=course_objects, bucket_object=bucket_objects)
  #print(print_course_obj(course_object=course_objects["136"]))
  #print_major_obj(major_object=major_objects["10"], course_object=course_objects, bucket_object=bucket_objects)

  #parse ryan's data to get the person's classes: code, credit hour, title, grade
  # run "flask run" and upload file to get terminal output of ryan data
  print(ryan_data)
  # TODO remove this hardcoding when ready to test through react upload
  ryan_data = [{'courseCode': 'ME 391', 'creditHours': 3, 'grade': 'IP', 'title': 'ENGINEERING ANALYSIS'}, {'courseCode': 'ME 363', 'creditHours': 3, 'grade': 'IP', 'title': 'SYSTEM DYNAMICS'}, {'courseCode': 'ECON 201', 'creditHours': 4, 'grade': 'IP', 'title': 'INTRO ECONOMICS: SURVEY COURS'}, {'courseCode': 'AE 377', 'creditHours': 4, 'grade': 'IP', 'title': 'HONORS: AIRPLANE PERFORMANCE'}, {'courseCode': 'AE 347', 'creditHours': 3, 'grade': 'IP', 'title': 'HONORS: FLUID MECHANICS'}, {'courseCode': 'PHIL 244', 'creditHours': 3, 'grade': 'A', 'title': 'PROFESSIONAL RESPONSIBILITY'}, {'courseCode': 'ME 331', 'creditHours': 3, 'grade': 'B+', 'title': 'THERMODYNAMICS'}, {'courseCode': 'ME 321', 'creditHours': 3, 'grade': 'A-', 'title': 'MECHANICS OF MATERIALS'}, {'courseCode': 'MATH 241', 'creditHours': 4, 'grade': 'A', 'title': 'CALCULUS III'}, {'courseCode': 'ECE 301', 'creditHours': 3, 'grade': 'A', 'title': 'CIRCUITS/ELECTRO MECH COMPON'}, {'courseCode': 'PHYS 231', 'creditHours': 3, 'grade': 'A', 'title': 'FUND PHYS: ELECTRIC/MAGNETISM'}, {'courseCode': 'ME 231', 'creditHours': 3, 'grade': 'B-', 'title': 'DYNAMICS'}, {'courseCode': 'MATH 231', 'creditHours': 3, 'grade': 'A', 'title': 'DIFFERENTIAL EQUATIONS I'}, {'courseCode': 'MATH 200', 'creditHours': 2, 'grade': 'A', 'title': 'MATRIX COMPUTATIONS'}, {'courseCode': 'EF 302', 'creditHours': 1, 'grade': 'A', 'title': 'ENGINEERING LEADERSHIP SEMINA'}, {'courseCode': 'AE 210', 'creditHours': 2, 'grade': 'A', 'title': 'PROFESSIONAL TOPICS'}, {'courseCode': 'AE 201', 'creditHours': 1, 'grade': 'S', 'title': 'AEROSPACE SEMINAR'}, {'courseCode': 'ME 202', 'creditHours': 2, 'grade': 'A', 'title': 'ENGINEERING MECHANICS'}, {'courseCode': 'MATH 148', 'creditHours': 4, 'grade': 'A', 'title': 'HONORS: CALCULUS II'}, {'courseCode': 'ENGL 298', 'creditHours': 3, 'grade': 'A', 'title': "CHANCELLOR'S HONORS WRITING I"}, {'courseCode': 'EF 230', 'creditHours': 2, 'grade': 'A', 'title': 'COMP SOLUTION/ENGR PROBLEMS'}, {'courseCode': 'EF 158', 'creditHours': 4, 'grade': 'A-', 'title': 'HONORS: PHYSICS/ENGINEERS II'}, {'courseCode': 'MATH 147', 'creditHours': 4, 'grade': 'A', 'title': 'HONORS: CALCULUS I'}, {'courseCode': 'ENGL 198', 'creditHours': 3, 'grade': 'A', 'title': "CHANCELLOR'S HONORS WRITING I"}, {'courseCode': 'EF 157', 'creditHours': 4, 'grade': 'A', 'title': 'HONORS: PHYSICS/ENGINEERS I'}, {'courseCode': 'EF 105', 'creditHours': 1, 'grade': 'A', 'title': 'COMPUT METH/ENGR PROB SOLVING'}, {'courseCode': 'EF 102', 'creditHours': 1, 'grade': 'A', 'title': 'INTRO TO TCE'}, {'courseCode': 'HIUS 222', 'creditHours': 3, 'grade': 'S', 'title': 'HISTORY OF THE UNITED STATES'}, {'courseCode': 'HIUS 221', 'creditHours': 3, 'grade': 'S', 'title': 'HISTORY OF THE UNITED STATES'}, {'courseCode': 'ECON 211', 'creditHours': 3, 'grade': 'S', 'title': 'PRINCIPLES OF MICROECONOMICS'}, {'courseCode': 'CHEM 133', 'creditHours': 1, 'grade': 'S', 'title': 'GENERAL CHEMISTRY II LAB'}, {'courseCode': 'CHEM 132', 'creditHours': 3, 'grade': 'S', 'title': 'GENERAL CHEMISTRY II'}, {'courseCode': 'CHEM 123', 'creditHours': 1, 'grade': 'S', 'title': 'GENERAL CHEMISTRY I LAB'}, {'courseCode': 'CHEM 122', 'creditHours': 3, 'grade': 'S', 'title': 'GENERAL CHEMISTRY I'}]
  max_hour, majors_returned = compare_academic_history(ryan_data=ryan_data, major_objects=major_objects, course_objects=course_objects, bucket_objects=bucket_objects)
  for index in majors_returned:
    print_major_obj(majors_returned[index], course_objects, bucket_objects)
    # print(f"Max hour: {max_hour}")

  # max_hour, major_ret = compare_academic_history(person_object=person_object, major_objects=major_objects, course_objects=course_objects, bucket_objects=bucket_objects)
  # print(f"Max hour: {max_hour}")
  # print_major_obj(major_ret, course_objects, bucket_objects) 

  # print_major_obj(major_object=major_objects["5"], course_object=course_objects, bucket_object=bucket_objects)
  # print_major_obj(major_object=major_objects["2"], course_object=course_objects, bucket_object=bucket_objects)
  # print_major_obj(major_object=major_objects["10"], course_object=course_objects, bucket_object=bucket_objects)

  return [    
          {
              "major_name": "Materials Science and Engineering",
              "courses": [
                  {
                      "course_name": [
                          "PHYS231"
                      ],
                      "course_description": [
                          "Description: For engineers and majors in mathematics and the physical sciences. Electric and magnetic phenomena including DC and AC circuits and electromagnetic waves.\n"
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE367",
                          "MSE360"
                      ],
                      "course_description": [
                          "Description: Description of the atomic structure of ceramic materials and glasses. Description of defects in ceramic materials and correlations to physical properties."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "MSE480"
                      ],
                      "course_description": [
                          "Description: Systematic materials selection in design."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE489"
                      ],
                      "course_description": [
                          "Description: Design projects involving materials selection and performance."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE302"
                      ],
                      "course_description": [
                          "Description: Fundamentals of deformation and fracture in solids, including metals, ceramics, polymers, and composites."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "CHEM128",
                          "CHEM123",
                          "CHEM122"
                      ],
                      "course_description": [
                          "Description: A general course in theoretical and descriptive chemistry. Modern atomic theory, chemical bonding, molecular structures and geometries, stoichiometry, and quantitative aspects of solution chemistry, gas laws, and chemical energy."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "EF158",
                          "EF152"
                      ],
                      "course_description": [
                          "Description: Calculus-based study of basic physics concepts, including rotational dynamics, statics, oscillations, waves, fluids, heat and temperature, first and second law of thermodynamics and electricity and magnetism. Introduction to team work. Introduction to the engineering disciplines, examination of engineering principles and design issues. Oral and written presentation skills."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "MSE117",
                          "MSE110"
                      ],
                      "course_description": [
                          "Description: Fundamental principles of the chemistry of condensed states of matter including ceramics, metals, and polymers."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE201",
                          "MSE207"
                      ],
                      "course_description": [
                          "Description: Correlation of atomic structure, crystal structure, and microstructure of solids with mechanical, physical, and chemical properties of engineering significance."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE357",
                          "MSE350"
                      ],
                      "course_description": [
                          "Description: Fundamental electronic, optical, and magnetic properties of solid state materials."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE300"
                      ],
                      "course_description": [
                          "Description: Laboratory assignments demonstrating the structure-property-processing relationships in metals, ceramics, and polymers."
                      ],
                      "course_hrs": "2"
                  },
                  {
                      "course_name": [
                          "EF230",
                          "EF237"
                      ],
                      "course_description": [
                          "Description: Primary focus is on development of computer programs in a modern programming language to solve engineering problems."
                      ],
                      "course_hrs": "2"
                  },
                  {
                      "course_name": [
                          "EF105"
                      ],
                      "course_description": [
                          "Description: Introduction to computer applications used in engineering problem solving and communications. Introduction to programming concepts, including conditional statements and looping, and the development and implementation of logic flow diagrams."
                      ],
                      "course_hrs": "1"
                  },
                  {
                      "course_name": [
                          "MSE390",
                          "MSE397"
                      ],
                      "course_description": [
                          "Description: Review of the heat treatment of steels, hardenability, quenching of steels, tempering of steels, austenitzation of steels, annealing, normalizing, martempering and austempering, surface treatments of steels, tool steels, stainless steels, structural steels, review of diffusion, ternary phase diagrams, physical metallurgy and heat treatment of aluminum and cu alloys, design of heat treatments."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "MSE260"
                      ],
                      "course_description": [
                          "Description: Thermodynamic laws, entropy, internal energy, and state functions."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "MSE340",
                          "MSE347"
                      ],
                      "course_description": [
                          "Description: Synthesis and molecular structure of polymers and polymerization kinetics. Molecular characterization, crystalline and glass transitions, crystallization kinetics, mechanical properties, rheology, and processing."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "MSE127",
                          "MSE120"
                      ],
                      "course_description": [
                          "Description: Explores the connections between the discovery of new materials such as ceramics, glass, concrete, metals, plastics, semiconductors etc. and the development of technologies and social structures worldwide"
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE301"
                      ],
                      "course_description": [
                          "Description: Statistical methods for probabilities, expectations, sampling, and estimation; numerical methods for regression, integration, solution for systems of linear/nonlinear algebraic and differential equations."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MATH231",
                          "MATH237"
                      ],
                      "course_description": [
                          "Description: First course emphasizing solution techniques. Includes first-order equations and applications, theory of linear equations, equations with constant coefficients, Laplace transforms, and series solutions."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MATH200"
                      ],
                      "course_description": [
                          "Description: Introduction to matrix calculations, including determinants, eigenvalues, and eigenvectors."
                      ],
                      "course_hrs": "2"
                  },
                  {
                      "course_name": [
                          "MATH247",
                          "MATH241"
                      ],
                      "course_description": [
                          "Description: Calculus of functions in two or more dimensions. Includes solid analytic geometry, partial differentiation, multiple integration, and selected topics in vector calculus."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "MSE304"
                      ],
                      "course_description": [
                          "Description: Laboratory assignments demonstrating advanced concepts in materials science and engineering."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MATH141",
                          "MATH147"
                      ],
                      "course_description": [
                          "Description: Single variable calculus especially for students of science, engineering, mathematics, and computer science. Differential calculus with applications."
                      ],
                      "course_hrs": "4"
                  },
                  {
                      "course_name": [
                          "ENGL101"
                      ],
                      "course_description": [
                          "Description: Intensive instruction in writing, focusing on analysis and argument. Strategies for reading critically, analyzing texts from diverse perspectives, developing substantive arguments through systematic revision, addressing specific audiences, integrating sources, and expressing ideas with clarity and correctness."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "ENGL102"
                      ],
                      "course_description": [
                          "Description: Advancing concepts introduced in ENGL 101*. Intensive writing instruction focused on inquiry and research. Strategies for formulating and investigating questions, locating and evaluating information, using varied sources and research methods, developing positions on intercultural and interdisciplinary issues from diverse texts (print, digital, and multimedia), and presenting research using appropriate rhetorical conventions."
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE210"
                      ],
                      "course_description": [
                          "Description: Laboratory assignments demonstrating introductory concepts in materials science and engineering such as crystallography, 3D-printing, strengthening mechanisms in metals, mechanical testing, ceramic processing, and microscopy"
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE220"
                      ],
                      "course_description": [
                          "Description: Covers aspects of technical report organization, literature reviews, preparing graphics, using databases and standards, reading journal articles, and attending technical meetings and seminars. "
                      ],
                      "course_hrs": "3"
                  },
                  {
                      "course_name": [
                          "MSE250"
                      ],
                      "course_description": [
                          "Description: Mass and energy balances and reaction kinetics. Steady state and transient heat transfer. Viscous flow of gases and liquids."
                      ],
                      "course_hrs": "4"
                  }
              ],
              "buckets": [
                  {
                      "bucket_name": "MSE Tech Elective",
                      "bucket_hours": -1,
                      "bucket_num_courses": "NULL",
                      "bucket_sentence": "Choose NULL from the list of courses below/above",
                      "course_name": [
                          "",
                          "BME409",
                          "BIOL168",
                          "MSE484",
                          "BIOL158",
                          "BIOL160",
                          "BCMB230",
                          "ENGL360",
                          "MSE486",
                          "BIOL150",
                          "PHYS232",
                          "MSE457",
                          "BIOL159",
                          "ECE301",
                          "MATH475",
                          "CHEM260",
                          "MSE485",
                          "EF333",
                          "GEOL310",
                          "CHEM360",
                          "CBE475",
                          "MSE483"
                      ]
                  },
                  {
                      "bucket_name": "CVE Term 5 Options",
                      "bucket_hours": -1,
                      "bucket_num_courses": -1,
                      "bucket_sentence": "Choose -1 from the list of courses below/above",
                      "course_name": [
                          "COSC101",
                          "COSC102",
                          "ME202",
                          "MSE201",
                          "COSC111",
                          "CBE201"
                      ]
                  },
                  {
                      "bucket_name": "MSE Elective UD",
                      "bucket_hours": -1,
                      "bucket_num_courses": "NULL",
                      "bucket_sentence": "Choose NULL from the list of courses below/above",
                      "course_name": [
                          "MSE405",
                          "MSE474",
                          "MSE421",
                          "MSE475",
                          "MSE496",
                          "MSE415",
                          "MSE494",
                          "MSE466",
                          "MSE460",
                          "MSE410",
                          "MSE451",
                          "MSE432",
                          "MSE450",
                          "MSE443",
                          "MSE404",
                          "MSE455",
                          "MSE425",
                          "MSE495",
                          "MSE408"
                      ]
                  },
                  {
                      "bucket_name": "EF options",
                      "bucket_hours": -1,
                      "bucket_num_courses": -1,
                      "bucket_sentence": "Choose -1 from the list of courses below/above",
                      "course_name": [
                          "EF142",
                          "EF151",
                          "EF157"
                      ]
                  }
              ]
          }
        ]


#optional - this runs everything but the variables aren't accessible for testing
# main()

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "This is a test of a passed course!"})

@app.post("/RyanData")
def get_ryan_data():
    if request.is_json:
      ryan_data = request.get_json()
      print(ryan_data)

      #make a new JSON and return it to Ryan 
      results = dev_main(ryan_data)
      # results_data = {"Computer Science": "PHYS341"}
      results_json = json.dumps(results)
      return results_json
    return {"Error": "Request must be JSON"}, 415

#make route for each page/request that's needed
#post and get requests
#put this app request at the bottom of our current code,
#and overwrite the main with this


if __name__ == '__main__':
    app.run(debug=True)