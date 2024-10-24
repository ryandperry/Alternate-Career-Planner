# 340 Alternate Career Planner Database Population Script
# Takes in an excel with major, bucket, and course information
# Builds tables for each major
# Builds lists of course, major, and bucket information
# Prepares data for the algorithm to match students -> majors

# Pandas Data Frames 

# Bucket Table To-Dos: 
# Populate the course ID's, fill in the number of courses 

# for i in bucket ID 

# Prereq/Coreq 
# Populating the Course ID and the Prereq Bucket Name and number of courses/ hours 


# for i in Major Table 
# Course ID to Required Course & Required Course Name 
# Bucket ID to course name and number of hours 

# Class :
# course : ID, name description 
# Bucket: ID, Bucket Name, Bucket NUmber of Hours/Number of COurses, List of Courses
# Major: ID, Abbreviation, Name, Description  

# Write out the classes , then write out stump code 

import pandas as pd

filenames = {
  "Bucket Table": "bucket_table.csv",
  "Major Table": "database_design_MT.csv",
  "Course Table": "database_design_CT.csv",
  "PreReq/CoReq Table": "prereq_coreq.csv",
  "Major Requirements Folder Name": "major_requirement_csvs",
  "Major Requirements Prefix": "major_"
}

class Major:
  def __init__(self, major_id, abbr, name, description):
    self.major_id = major_id
    self.abbr = abbr
    self.name = name
    self.description = description

  course_ids = set()
  bucket_ids = set()

class Person:
  def __init__(self, major, classes_array, quiz_results):
    self.major = major
    self.classes_array = classes_array
    self.quiz_results = quiz_results

class Course:
  def __init__(self, course_id, name, description, hours):
    self.course_id = course_id
    self.name = name
    self.description = description
    self.hours = hours
  prereq_courseids = {1, 4, 6, 7}
  coreq_courseids = set()


class Bucket:
  def __init__(self, bucket_id, name, course_names, num_hours, num_courses):
    self.bucket_id = bucket_id
    self.name = name
    self.course_names = course_names
    self.num_hours = num_hours
    self.num_courses = num_courses
  course_ids = set()
  bucket_ids = set()

class Requisite:
  def __init__(self, p_or_c, course_names, course_id, bucket_id, num_courses):
    self.p_or_c = p_or_c
    self.course_names = course_names
    self.course_id = course_id
    self.bucket_id = bucket_id
    self.num_courses = num_courses 

#script to read in course table, major table, and bucket table
# print("Hello World")
def build_course_objects():
  try:
    df = pd.read_csv('database_design_CT.csv', dtype=str)
  except:
    df = pd.read_csv('data_collection/database_design_CT.csv', dtype=str)
  #print(df.shape[0])
  course_objects = {}
  for row in df.index:
      #course_id, name, description, hours
      course_id = df.loc[row, "Course ID"]
      course_object = Course(df.loc[row, 'Course ID'], df.loc[row, 'Course'], df.loc[row, 'Course Description'], df.loc[row, 'Course Hours'])
      #dict[i] = course_object
      course_objects[str(course_id)] = course_object
      # print(dict[str(row)].name)
      # print(course_object.name)
  print(course_objects)
  try:
    df4 = pd.read_csv('database_design_PC.csv', dtype=str)
  except:
    df4 = pd.read_csv('data_collection/database_design_PC.csv', dtype=str)
  prereq_objects = {}
  #for row in df4.index:
  # fill in if this is what they want 

#looping through major table rows
#build major class object for each row
#dict of majors
def build_major_objects():
  try:
    df2 = pd.read_csv('database_design_MT.csv', dtype=str)
  except:
    df2 = pd.read_csv('data_collection/database_design_MT.csv', dtype=str)
  #print(df.shape[0])
  major_objects = {}
  for row in df2.index:
      #course_id, name, description, hours
      major_id = df2.loc[row, 'Major ID']
      major_obj = Major(df2.loc[row, 'Major ID'], df2.loc[row, 'Major Abreviation'], df2.loc[row, 'Major Name'], df2.loc[row, 'Major Description'])
      #dict[i] = course_object
      major_objects[str(major_id)] = major_obj
      # print(major_objects[str(major_id)].name)
      # print(major_obj.name)
  print(major_objects)

#looping through bucket table rows
#build bucket class object for each row
#dict of buckets
def build_bucket_object():
  try:
    df3 = pd.read_csv('database_design_BT.csv', dtype=str)
  except:
    df3 = pd.read_csv('data_collection/database_design_BT.csv', dtype=str)
  bucket_objects = {}
  #print(df.shape[0])
  for row in df3.index:
      #course_id, name, description, hours
      bucket_id = df3.loc[row, "Bucket ID"]
      bucket_obj = Bucket(df3.loc[row, 'Bucket ID'], df3.loc[row, 'Bucket Name'], df3.loc[row, 'Course Names'], df3.loc[row, 'Bucket Number of Hours'], df3.loc[row, "Bucket Number of Courses"])
      #dict[i] = course_object
      bucket_objects[str(bucket_id)] =  bucket_obj
      # print(bucket_objects[str(bucket_id)].name)
      # print(major_obj.name)
  print(bucket_objects)

def build_bucket_objects(course_objects):
  try:
    bucket_table = pd.read_csv(filenames['Bucket Table'], dtype=str)
  except:
    bucket_table = pd.read_csv('data_collection/'+filenames['Bucket Table'], dtype=str)
  bucket_table= bucket_table.fillna("NULL")
  bucket_objects = {}
  for row in bucket_table.index:
      bucket_id = bucket_table.loc[row, "Bucket ID"]
      bucket_obj = Bucket(bucket_table.loc[row, 'Bucket ID'], bucket_table.loc[row, 'Bucket Name'], bucket_table.loc[row, 'Bucket Number of Hours'], bucket_table.loc[row, "Bucket Number of Courses"])

      #seperate out the course names in semi-colon seperated list
      bucket_obj.course_names = set(bucket_table['Course Names'][row].replace(" ", "").split(";"))

      # #TODO this doesnt work. need to add course IDs
      # for current_course_name in bucket_obj.course_names:
      #   # find this course ID
      #   for course_obj in course_objects.values():
      #     if(course_obj.name == current_course_name):
      #       bucket_obj = bucket_obj.course_ids.add(course_obj.course_id)

      #add other bucket IDs
      bucket_obj.bucket_ids.add(bucket_table['Sequence Bucket IDs'][row])
      # save this new bucket object
      bucket_objects[str(bucket_id)] =  bucket_obj


  return bucket_objects



#script to match all major's requirements to the associated
#course or bucket IDs

#there are csvs for each major requirements
#(from our "database")
#name them major_ID like major_1 (which is CS)
#place them in the major requirements csv folder

# loop through each csv with each major's requirements
# right now we only have 4 accessbile csvs but in the future, we 
# will have access to all 12
# for major_object_key in major_objects.keys():
# for major_object_key in ["1", "5","10", "11"]:

#   #read csv for this major using the ID number
#   major_object = major_objects[major_object_key]
#   print(major_object.name)
#   # print(major_object.bucket_ids)
  
#   relative_filename = 'major_requirement_csvs/major_' + str(int(major_object.major_id)) + '.csv'
#   outside_filename = 'data_collection/major_requirement_csvs/major_' + str(int(major_object.major_id)) + '.csv'
#   print(relative_filename)
#   try:
#     major_requirements = pd.read_csv(relative_filename, dtype=str)
#   except:
#     major_requirements = pd.read_csv(outside_filename, dtype=str)
#   #fill in everything thats null in the excel 
#   major_requirements = major_requirements.fillna("NULL")

#   #make the course and bucket objects using either the ID or the name
#   #example: if the row has a course (MATH 141), lookup in the dictionary
#     #of courses for that and add the course ID to major.course_ids set()
#   #example: if the row has course ID 5, then add that ID
#   for row in major_requirements.index:
#     # print(row)
#     #get the course ID or bucket ID for this major requirement
#     bucket_ID = major_requirements['Required Bucket ID'][row]
#     course_ID = major_requirements['Required Course ID'][row]
#     course = major_requirements['Required Course'][row]
  
#     #if this row has a bucket, use the bucket ID
#     if(bucket_ID != "NULL"):
#       # print("bucket ID is ", bucket_ID)
#       major_object.bucket_ids.add(str(bucket_ID))
#       # print("bucket ids list is ", major_object.bucket_ids)
    
#     elif(course_ID != "NULL"):
#       # print("course ID is ", course_ID)
#       major_object.course_ids.add(str(course_ID))
#       # print("course ids list is ", major_object.course_ids)
    
#     elif(course != "NULL"):
#       #get all values for the course objects
#       #search in the values for the course.name that matches
#       #get course ID
#       #add to the course_ids for this major
#       course_ID = [course_obj.course_id for course_obj in course_objects.values() if course_obj.name == course]
#       # print("found a course id from the name")
#       major_object.course_ids.add(str(course_ID))
    
#     # else:
#       #this isnt a valid requirement because theres nothing in this row
#       # print("empty row: major requirement has neither course nor bucket listed")
#   print(major_object.bucket_ids)
#   print(major_object.course_ids)

# emily to do
# test the civil engineering excel
# make sure ID's are matching as strings (no decimal issues)

#algorithm will depend on searching by ID so we're
# using dictionaries to be able to quickly search on ID

# todo: merge ryan's html parsing code with this set up
# todo: decide how algorithm code will use these classes
# todo: decide how to seperate algorithm functions
  #so we can each work on different aspects

def processing_course(course_objects):
  # list of strings
  # from ryan - list of strings
  history_names = []
  # goal - build set of ids (of classes that they took)
  history_ids = set()
  for history_name in history_names:
    for course in course_objects.values():
      if(course.name == history_name):
        history_ids.add(course.course_id)
  return history_ids

def compare_academic_history(person_object, major_objects, course_objects, bucket_objects):
  #major_objects is the dictionary of major objects 
  hour_counter = 0
  for i in major_objects:
    if(major_objects[i].major_id == person_object.major):
      continue
    else:
      for course_taken in person_object.classes_array:
        #somewhere in here we need to check if it is part of a bucket
        # if(course_taken[i] in bucket_objects)
        #if("person_object.classes_array[course_taken]" in bucket_objects.values()):
            #pseudo code : 
            # if this course name appears in the bucket objects' course names 
            #if()
            # then you need to see if this one class will fill the entire requirement via the course table hours !! 
            # if it does not fill the entire requirement, manually subtract the hours required for that bucket
            # if it does fill the whole requirement add that number to hour_counter
        if(major_objects[course_taken].course_id == course_taken[i]):
          hour_counter += course_objects["course_taken"].hours
        # look up the course id in the major dictionary at this i 

def main():
  course_objects = build_course_objects()
  bucket_objects = build_bucket_objects(course_objects)
  print(course_objects)
  print(bucket_objects)
  majorid = 1
  classes_array = ["EF 151", "EF 230", "MATH 141"]
  quiz_results = "ME"
  person_object = Person(major=majorid, classes_array=classes_array, quiz_results=quiz_results)
  major_objects = build_major_objects(course_objects=course_objects, bucket_objects=bucket_objects)
  print(major_objects)
  compare_academic_history(person_object=person_object, major_objects=major_objects, course_objects=course_objects, bucket_objects=bucket_objects)